import React, { useState } from "react";
import { AnalysedListItem, Details } from "../components";

interface HomeState {
  requestedUrls: Array<string>;
  url: string;
  buttonState: "enabled" | "disabled";
  buttonCss: string;
  isDetailsOpen: boolean;
  selectedUrl: string;
}

const buttonCssDict = {
  enabled:
    "w-full rounded-md mt-6 p-2.5  font-bold bg-analyse-button-color text-white",
  disabled: "w-full rounded-md mt-6 p-2.5 font-bold text-white bg-gray-300",
};

export function Home() {
  const [state, setState] = useState<HomeState>({
    requestedUrls: Array<string>(),
    url: "",
    buttonState: "disabled",
    buttonCss: buttonCssDict.disabled,
    isDetailsOpen: false,
    selectedUrl: "",
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
    requestedUrls.push(state.url);

    setState({
      ...state,
      requestedUrls,
      url: "",
      buttonCss: buttonCssDict.disabled,
      buttonState: "disabled",
    });
  }

  function handleUrlChange(e: React.FormEvent<EventTarget>) {
    const target = e.target as HTMLInputElement;
    let { url, buttonState, buttonCss } = state;
    url = target.value;

    // check if the url is valid
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (urlRegex.test(url)) {
      buttonState = "enabled";
      buttonCss = buttonCssDict.enabled;
    } else {
      buttonState = "disabled";
      buttonCss = buttonCssDict.disabled;
    }

    setState({
      ...state,
      url,
      buttonState,
      buttonCss,
    });
  }

  function closeDetailsPage() {
    setState({
      ...state,
      isDetailsOpen: false,
      selectedUrl: "",
    });
  }

  function renderAnalysedUrls(): React.ReactNode {
    const { requestedUrls } = state;
    const urls = [];

    for (let i = 0; i < requestedUrls.length; i++) {
      urls.push(
        <AnalysedListItem
          key={i}
          url={requestedUrls[i]}
          openDetailsPage={openDetailsPage}
        />
      );
    }

    return urls;
  }

  return (
    <div className="min-h-screen bg-custom-bg relative grid place-items-center">
      <div className="w-1/3 h-4/5 rounded bg-white shadow-sm">
        {state.isDetailsOpen ? (
          // Details Page
          <Details
            closeDetailsPage={closeDetailsPage}
            url={state.selectedUrl}
          />
        ) : (
          // Search Page
          <div className="px-6 py-4 mx-6">
            <div className="font-bold text-4xl mb-2 mt-8">Silverlight</div>
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
                disabled={state.buttonState === "disabled"}
                type="submit"
                className={state.buttonCss}
              >
                Analyse
              </button>
            </form>
            {state.requestedUrls.length > 0 ? (
              <div className="pb-4">
                <div className="mt-8 text-xl font-bold">Analysing Targets</div>
                {renderAnalysedUrls()}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
