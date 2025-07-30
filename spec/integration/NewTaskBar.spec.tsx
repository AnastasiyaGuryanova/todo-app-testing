import { render, screen } from "@testing-library/react";
import { NewTaskBar } from "src/modules/NewTaskBar";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import * as taskSliceModule from "src/store/taskSlice";
import { act } from "react-dom/test-utils";

// 1. Название задачи не должно быть больше 32 символов
// 2. Название задачи не может быть пустым
// 3. Кнопка Добавить должна блокироваться для невалидных значений
// 4. Список не может содержать больше 10 невыполненных задач

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it.each([
  ["Длинный неподходящий заголовок тут", true, true],
  ["Хороший заголовок", false, false],
  ["", true, false],
])("Создание задачи", async (text, isDisabled, isHinted) => {
  render(<NewTaskBar />, {
    wrapper: JestStoreProvider,
  });

  const inputEl = screen.getByRole("textbox");
  const hintEl = screen.getByTestId("input-hint-text");
  const addBtnEl = screen.getByRole("button", { name: "Добавить" });

  await act(async () => {
    await userEvent.clear(inputEl);
    if (text) {
      await userEvent.type(inputEl, text);
    }
  });

  expect(inputEl).toHaveValue(text);

  if (isDisabled) {
    expect(addBtnEl).toBeDisabled();
  } else {
    expect(addBtnEl).not.toBeDisabled();
  }

  expect(hintEl.innerHTML.length > 0).toBe(isHinted);
});

it("Не больше 10 новых задач", async () => {
  const spied = jest
    .spyOn(taskSliceModule, "uncompleteCount")
    .mockReturnValue(10);

  await act(async () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });
  });

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByRole("button", { name: "Добавить" });

  expect(inputEl).toBeDisabled();
  expect(addBtnEl).toBeDisabled();

  spied.mockRestore();
});

it("Блокировка ввода и кнопки при 10 невыполненных задачах", async () => {
  const spied = jest
    .spyOn(taskSliceModule, "uncompleteCount")
    .mockReturnValue(10);

  await act(async () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });
  });

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByRole("button", { name: "Добавить" });

  expect(inputEl).toBeDisabled();
  expect(addBtnEl).toBeDisabled();

  spied.mockRestore();
});
