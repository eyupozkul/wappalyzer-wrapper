import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Socket } from "socket.io-client";
import { AnalysedListItem, Details } from "../components";

interface HomeState {
  requestedUrls: Array<string>;
  requestedUrlsStatus: { [key: string]: boolean };
  url: string;
  buttonState: "enabled" | "disabled";
  isDetailsOpen: boolean;
  selectedUrl: string;
  pageNumber: number;
  pageCount: number;
  backendStatus: boolean;
}

interface HomeProps {
  socket: Socket;
}

export function Home({ socket }: HomeProps) {
  const [state, setState] = useState<HomeState>({
    requestedUrls: [],
    requestedUrlsStatus: {},
    url: "",
    buttonState: "disabled",
    isDetailsOpen: false,
    selectedUrl: "",
    pageNumber: 0,
    pageCount: 0,
    backendStatus: false,
  });

  const buttonCss = {
    enabled:
      "w-full rounded-md mt-6 p-2.5  font-bold bg-analyse-button-color text-white",
    disabled: "w-full rounded-md mt-6 p-2.5 font-bold text-white bg-gray-300",
  };

  useEffect(() => {
    console.log(import.meta.env.PROD);
    socket.on("connect", () => {
      setState({
        ...state,
        backendStatus: true,
      });
    });

    socket.on("disconnect", () => {
      setState({
        ...state,
        backendStatus: false,
      });
    });

    socket.on("analysisCompleted", (url: string) => {
      const requestedUrlsStatus = state.requestedUrlsStatus;
      requestedUrlsStatus[url] = true;
      setState({
        ...state,
        requestedUrlsStatus,
      });
    });
  });

  function openDetailsPage(url: string) {
    setState({
      ...state,
      isDetailsOpen: true,
      selectedUrl: url,
    });
  }

  function requestUrlAnalysis(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const { requestedUrls } = state;
    // Do not show the same url twice
    if (!requestedUrls.includes(state.url)) {
      requestedUrls.push(state.url);
    }

    socket.emit("analysisRequest", state.url);
    const pageCount = Math.ceil(requestedUrls.length / 3);
    const requestedUrlsStatus = state.requestedUrlsStatus;
    requestedUrlsStatus[state.url] = false;

    setState({
      ...state,
      requestedUrls,
      requestedUrlsStatus,
      url: "",
      buttonState: "disabled",
      pageCount,
    });
  }

  function handleUrlChange(e: React.FormEvent<EventTarget>) {
    const target = e.target as HTMLInputElement;
    let { url, buttonState } = state;
    url = target.value;

    // check if the url is valid
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (urlRegex.test(url)) {
      buttonState = "enabled";
    } else {
      buttonState = "disabled";
    }

    setState({
      ...state,
      url,
      buttonState,
    });
  }

  function closeDetailsPage() {
    setState({
      ...state,
      isDetailsOpen: false,
      selectedUrl: "",
    });
  }

  function renderAnalysedUrls(sliceStart: number): React.ReactNode {
    let { requestedUrls } = state;
    requestedUrls = requestedUrls.slice(sliceStart, sliceStart + 3);
    const urls = [];

    for (let i = 0; i < requestedUrls.length; i++) {
      urls.push(
        <AnalysedListItem
          key={sliceStart + i}
          url={requestedUrls[i]}
          analysisComplete={state.requestedUrlsStatus[requestedUrls[i]]}
          openDetailsPage={openDetailsPage}
        />
      );
    }

    return urls;
  }

  return (
    <div className="min-h-screen bg-custom-bg relative grid place-items-center">
      <div className="w-4/5 lg:w-2/3 2xl:w-1/2 h-4/5 rounded bg-white shadow-sm">
        {state.isDetailsOpen ? (
          // Details Page
          <Details
            socket={socket}
            closeDetailsPage={closeDetailsPage}
            url={state.selectedUrl}
          />
        ) : (
          // Search Page
          <div className="px-6 py-4 mx-6 h-full flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="font-bold text-4xl mb-2 mt-8">Silverlight</div>
              <div className="text-sm font-bold">
                Server status: {state.backendStatus ? "✅" : "❌"}
              </div>
            </div>
            <form action="" onSubmit={requestUrlAnalysis}>
              <div className="pt-5">
                <input
                  type="text"
                  id="url"
                  className="bg-white border-2 border-url-input-border  text-xl rounded-md  block w-full p-2.5 outline-none"
                  placeholder="URL want to be checked"
                  value={state.url}
                  onChange={handleUrlChange}
                />
              </div>
              <button
                disabled={
                  state.buttonState === "disabled" || !state.backendStatus
                }
                type="submit"
                className={
                  state.buttonState === "enabled" && state.backendStatus
                    ? buttonCss.enabled
                    : buttonCss.disabled
                }
              >
                Analyse
              </button>
            </form>

            <div className="flex flex-col grow justify-between">
              {state.requestedUrls.length > 0 ? (
                <div className="pb-4">
                  <div className="mt-8 text-xl font-bold">
                    Analysing Targets
                  </div>
                  {renderAnalysedUrls(state.pageNumber * 3)}
                </div>
              ) : null}
              {state.requestedUrls.length > 3 ? (
                <ReactPaginate
                  breakLabel={"..."}
                  pageCount={state.pageCount}
                  activeClassName={
                    "font-bold bg-custom-bg w-fit px-2.5 py-1 mx-2"
                  }
                  pageClassName={"bg-custom-bg w-fit px-2.5 py-1 mx-2"}
                  breakClassName={"bg-custom-bg w-fit px-2.5 py-1"}
                  containerClassName={"flex justify-center mt-4"}
                  previousLabel={""}
                  nextLabel={""}
                  pageRangeDisplayed={3}
                  renderOnZeroPageCount={() => null}
                  onPageChange={(event) => {
                    setState({ ...state, pageNumber: event.selected });
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
