import { describe, test } from "vitest";
import { cleanup, render } from "@testing-library/react";

import { AnalysisListItem } from "./AnalysisListItem";

describe("Analysis list item", () => {
  let url: string;

  beforeEach(() => {
    url = "https://website.com";
  });

  afterEach(() => {
    cleanup();
  });

  test("if analysis is not done, Analysing... is shown", () => {
    const item = render(
      <AnalysisListItem
        url={url}
        analysisComplete={false}
        openDetailsPage={(url: string) => {}}
      />
    );

    expect(item.getByText(url)).toBeInTheDocument();
    expect(item.getByText("Analysing...")).toBeInTheDocument();
  });

  test("if analysis is done, View More is shown", () => {
    const item = render(
      <AnalysisListItem
        url={url}
        analysisComplete={true}
        openDetailsPage={(url: string) => {}}
      />
    );

    expect(item.getByText(url)).toBeInTheDocument();
    expect(item.getByText("View More")).toBeInTheDocument();
  });
});
