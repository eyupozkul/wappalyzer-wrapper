import React, { useState } from "react";

export function Home() {
  const [url, setUrl] = useState<string>("");
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [buttonCss, setButtonCss] = useState<string>(
    "w-full rounded-md mt-6 p-2.5 font-bold text-white bg-gray-300"
  );

  function handleUrlChange(e: React.FormEvent<EventTarget>) {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);

    // check if the url is valid
    const urlExpression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const urlRegex = new RegExp(urlExpression);
    if (urlRegex.test(target.value)) {
      setButtonState(true);
      setButtonCss(
        "w-full rounded-md mt-6 p-2.5  font-bold bg-analyse-button-color text-white"
      );
    } else {
      setButtonState(false);
      setButtonCss(
        "w-full rounded-md mt-6 p-2.5 font-bold text-white bg-gray-300"
      );
    }
  }

  return (
    <div className="min-h-screen bg-custom-bg relative grid place-items-center">
      <div className="w-1/2 h-1/2 rounded bg-white shadow-sm">
        <div className="px-6 py-4 mx-6">
          <div className="font-bold text-4xl mb-2 mt-8">Silverlight</div>
          <form action="">
            <div className="pt-5">
              <input
                type="text"
                onChange={handleUrlChange}
                id="first_name"
                className="bg-white border-2 border-url-input-border  text-xl rounded-md  block w-full p-2.5 outline-none"
                placeholder="URL want to be checked"
                value={url}
              />
            </div>
            <button disabled={!buttonState} type="button" className={buttonCss}>
              Analyse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
