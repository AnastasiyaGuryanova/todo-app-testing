import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AddButton } from "../src/components/AddButton";

import uE from "@testing-library/user-event";

describe('Кнопка "Добавить"', () => {
  const userEvent = uE.setup();

  it.todo("Блокировка для строки больше 32 символов");
  it.todo("Блокировка для строки меньше 1 символа");

  it("Проверка кликов по кнопке", async () => {
    const fn = jest.fn();

    render(<AddButton onClick={fn} />);

    const button = screen.getByText(/добавить/i);

    await userEvent.click(button);

    expect(fn).toBeCalledTimes(1);
  });
});
