import { describe, test } from "vitest";
import { cleanup, render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./Home";
import socketIO from "socket.io-client";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("Home page tests", () => {
  let page: RenderResult;
  let socket: any;
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    socket = socketIO("http://localhost:3000");
    page = render(<Home socket={socket} />);
  });

  afterEach(() => {
    socket.disconnect();
    cleanup();
  });

  test("show backend status when disconnected", () => {
    expect(screen.getByText("Server status: ❌")).toBeInTheDocument();
  });

  test("analyse button is disabled", () => {
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("textbox value changes after user input", async () => {
    const textbox = screen.getByRole("textbox");
    await userEvent.type(textbox, "https://www.google.com");
    expect(textbox).toHaveValue("https://www.google.com");
  });
});
