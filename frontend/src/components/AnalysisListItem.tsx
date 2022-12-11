interface AnalysedListItemProps {
  url: string;
  openDetailsPage: (url: string) => void;
  analysisComplete: boolean;
}

export function AnalysedListItem({
  url,
  openDetailsPage,
  analysisComplete,
}: AnalysedListItemProps) {
  return (
    <div className="bg-custom-bg my-3 py-2 px-2 flex justify-between">
      <a
        href={url}
        target="_blank"
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        {url}
      </a>
      <div>
        {analysisComplete ? (
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={(e) => openDetailsPage(url)}
          >
            View More
          </button>
        ) : (
          "Analysing..."
        )}
      </div>
    </div>
  );
}
