import { render, screen, fireEvent } from "@testing-library/react";
import { List } from "src/components/List";

describe("List", () => {
  it("отображение списка задач", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
      {
        id: "1",
        header: "купить хлеб",
        done: false,
      },
      {
        id: "2",
        header: "купить молоко",
        done: false,
      },
      {
        id: "3",
        header: "выгулять собаку",
        done: true,
      },
    ];

    const { rerender, asFragment } = render(
      <List items={items} onDelete={onDelete} onToggle={onToggle} />
    );
    const firstRender = asFragment();

    expect(screen.getByText("купить хлеб")).toBeInTheDocument();
    expect(screen.getByText("купить молоко")).toBeInTheDocument();
    expect(screen.getByText("выгулять собаку")).toBeInTheDocument();

    const updatedItems = items.slice(0, 2);

    rerender(
      <List items={updatedItems} onDelete={onDelete} onToggle={onToggle} />
    );
    const secondRender = asFragment();

    expect(screen.getByText("купить хлеб")).toBeInTheDocument();
    expect(screen.getByText("купить молоко")).toBeInTheDocument();
    expect(screen.queryByText("выгулять собаку")).not.toBeInTheDocument();

    expect(firstRender).toMatchDiffSnapshot(secondRender);
  });

  it("корректно вызывает обработчики при взаимодействии с задачами", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
      {
        id: "1",
        header: "купить хлеб",
        done: false,
      },
      {
        id: "2",
        header: "купить молоко",
        done: true,
      },
    ];

    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

    const firstCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckbox);
    expect(onToggle).toHaveBeenCalledWith("1");

    const deleteButtons = screen.getAllByRole("button", { name: /удалить/i });
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith("2");
  });
});
