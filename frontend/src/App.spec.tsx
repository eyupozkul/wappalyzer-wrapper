import { describe, test } from "vitest";
import { cleanup, render, RenderResult, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  let page: RenderResult;

  beforeEach(() => {
    page = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("check app title", () => {
    const mainTitle = page.container.querySelector("#main_title");
    expect(mainTitle).toBeTruthy();
    expect(mainTitle?.innerHTML).toBe("Silverlight");
  });
});
