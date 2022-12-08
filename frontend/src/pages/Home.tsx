export function Home() {
  return (
    <div className="min-h-screen bg-custom-bg relative grid place-items-center">
      <div className="w-1/2 h-1/2 rounded bg-white shadow-sm">
        <div className="px-6 py-4 mx-6">
          <div className="font-bold text-4xl mb-2 mt-8">Silverlight</div>
          <form action="">
            <div className="pt-5">
              <input
                type="text"
                id="first_name"
                className="bg-white border-2 border-url-input-border text-url-input-border text-xl rounded-md  block w-full p-2.5 outline-none"
                placeholder="URL want to be checked"
              />
            </div>
            <button
              type="button"
              className="w-full bg-analyse-button-color rounded-md mt-6 p-2.5 text-white font-bold"
            >
              Analyse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
