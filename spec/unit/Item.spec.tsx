import { render, screen, fireEvent } from "@testing-library/react";
import { Item } from "src/components";

describe("Элемент списка задач", () => {
  const defaultProps = {
    id: "1",
    header: "Test Task",
    done: false,
    onDelete: jest.fn(),
    onToggle: jest.fn(),
  };

  it("название не должно быть больше 32 символов", () => {
    const longHeader = "Это длинная задача, которая превышает 32 символа.";
    const expectedHeader = "Это длинная задача, которая прев";

    render(<Item {...defaultProps} header={longHeader} />);

    const label = screen.getByText(expectedHeader);

    expect(label.textContent).toBeShorterThan(32);
    expect(label.textContent).toBe(expectedHeader);
  });

  it("название не должно быть пустым", () => {
    render(<Item {...defaultProps} header="" />);

    const label = screen.getByRole("checkbox").nextElementSibling;

    expect(label?.textContent).toBe("Без названия");
    expect(label?.textContent).not.toBe("");
  });

  it("нельзя удалять невыполненные задачи", () => {
    render(<Item {...defaultProps} done={false} />);

    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeDisabled();

    fireEvent.click(deleteButton);
    expect(defaultProps.onDelete).not.toHaveBeenCalled();
  });

  it("должен вызывать onToggle при клике на checkbox", () => {
    render(<Item {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(defaultProps.onToggle).toHaveBeenCalledWith("1");
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it("должен отображать зачеркнутый текст для выполненной задачи", () => {
    render(<Item {...defaultProps} header="Done Task" done={true} />);

    const strikethrough = screen.getByText("Done Task").closest("s");
    expect(strikethrough).toBeInTheDocument();
    expect(strikethrough).toHaveStyle("text-decoration: line-through");
  });
});
