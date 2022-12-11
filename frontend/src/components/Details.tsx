import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface DetailsProps {
  url: string;
  closeDetailsPage: () => void;
  socket: Socket;
}

interface DetailsState {
  analysis: Analysis;
}

interface Analysis {
  url: string;
  status: string;
  numberOfPages: number;
  usedTechnologies: Array<string>;
}

export function Details({ url, closeDetailsPage, socket }: DetailsProps) {
  const [state, setState] = useState<DetailsState>({
    analysis: {
      url,
      status: "pending",
      numberOfPages: 0,
      usedTechnologies: [],
    },
  });

  useEffect(() => {
    socket.on("analysis", (analysis: Analysis) => {
      if (analysis.url === url) {
        setState({
          analysis,
        });
      }
    });

    socket.emit("getAnalysis", url);
  });

  return (
    <div className="mx-16 my-8">
      <button
        onClick={() => closeDetailsPage()}
        className="text-blue-600 hover:text-blue-800 ml-2"
      >
        <p>&lt; Back</p>
      </button>

      <div className="font-bold text-2xl mt-8">{url} Results</div>
      <div>{state.analysis.url}</div>
      <div>{state.analysis.numberOfPages}</div>
      <div>{state.analysis.usedTechnologies}</div>
    </div>
  );
}
