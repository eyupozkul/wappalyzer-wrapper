import { describe, test } from "vitest";
import { cleanup, render, RenderResult, screen } from "@testing-library/react";
import socketIO from "socket.io-client";
import { Details } from "./Details";

describe("Details tests", () => {
  let page: RenderResult;
  let socket: any;

  beforeEach(() => {
    socket = socketIO("http://localhost:3000");
    page = render(
      <Details
        url={"https://www.website.com"}
        socket={socket}
        closeDetailsPage={() => {}}
      />
    );
  });

  afterEach(() => {
    socket.disconnect();
    cleanup();
  });

  test("page title is correct", () => {
    expect(
      screen.getByText("https://www.website.com Results")
    ).toBeInTheDocument();
  });
});
