import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Input } from "../src/components/Input";

import uE from "@testing-library/user-event";

describe("Поле ввода", () => {
  const userEvent = uE.setup({ delay: 100 });

  it("Ограничение на ввод более 32 символов", () => {
    expect("Greetings!").toBeShorterThan(32);
  });

  it("Поле доступно для ввода", async () => {
    const fn = jest.fn();

    render(<Input defaultValue="" onChange={fn} />);

    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.keyboard("Hello!");

    expect(fn).toBeCalledWith("Hello!");
  });
});
