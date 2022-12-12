import React from "react";
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

  function renderUsedTechnologies(): React.ReactNode {
    const rendered = [];
    for (let i = 0; i < state.analysis.usedTechnologies.length; i++) {
      rendered.push(
        <div key={i} className="bg-details-list-item p-2 mb-2 text-md">
          {state.analysis.usedTechnologies[i]}
        </div>
      );
    }
    return rendered;
  }

  return (
    <div className="mx-16 my-8 flex flex-col h-full pb-10">
      <div>
        <button
          onClick={() => closeDetailsPage()}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          <p>&lt; Back</p>
        </button>
      </div>

      <div className="font-bold text-2xl mt-8">{url} Results</div>
      <div className="bg-details-list-item mt-4 mb-8 pt-4 pb-4 pr-8 text-3xl inline-block">
        {state.analysis.numberOfPages} Pages Found
      </div>

      <div className="flex-grow overflow-y-auto h-full">
        {renderUsedTechnologies()}
      </div>
    </div>
  );
}
