import { useState } from "react";

interface DetailsProps {
  url: string;
  closeDetailsPage: () => void;
}

interface DetailsState {}

export function Details({ url, closeDetailsPage }: DetailsProps) {
  const [state, setState] = useState<DetailsState>({});

  return (
    <div className="mx-16 my-8">
      <button
        onClick={() => closeDetailsPage()}
        className="text-blue-600 hover:text-blue-800 ml-2"
      >
        <p>&lt; Back</p>
      </button>

      <div className="font-bold text-2xl mt-8">{url} Results</div>
    </div>
  );
}
