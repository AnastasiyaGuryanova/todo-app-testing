import { App } from "src/App";
import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("Добавление задач в список", async () => {
  render(<App />);

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByAltText(/Добавить/i);

  await act(async () => {
    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Первый заголовок");
    await userEvent.click(addBtnEl);
  });

  await act(async () => {
    await userEvent.type(inputEl, "Второй заголовок");
    await userEvent.click(addBtnEl);
  });

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
});

it("Хранение стора в localStorage", async () => {
  render(<App />);

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByAltText(/Добавить/i);

  await act(async () => {
    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Первый заголовок");
    await userEvent.click(addBtnEl);
  });

  await act(async () => {
    await userEvent.type(inputEl, "Второй заголовок");
    await userEvent.click(addBtnEl);
  });

  expect(localStorage.getItem).toBeCalled();
  expect(localStorage.setItem).toBeCalled();
});
