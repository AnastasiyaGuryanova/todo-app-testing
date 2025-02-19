import { render, screen, fireEvent } from "@testing-library/react";
import { NewTaskBar, TaskList } from "src/modules";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const preloadedState = {
  taskList: {
    list: [
      { id: "1", header: "Задача 1", done: false },
      { id: "2", header: "Задача 2", done: true },
    ],
    filterActive: false,
  },
};

const preloadedStateAllDone = {
  taskList: {
    list: [
      { id: "1", header: "Задача 1", done: true },
      { id: "2", header: "Задача 2", done: true },
    ],
    filterActive: false,
  },
};

describe("Список задач", () => {
  it("с включенным фильтром - показывает только невыполненные задачи", () => {
    render(
      <JestStoreProvider preloadedState={preloadedState}>
        <NewTaskBar />
        <TaskList />
      </JestStoreProvider>
    );

    const filterButton = screen.getByAltText("Фильтр");
    fireEvent.click(filterButton);

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).toBeNull();
  });

  it("с выключенным фильтром - показывает все задачи", () => {
    render(
      <JestStoreProvider preloadedState={preloadedState}>
        <NewTaskBar />
        <TaskList />
      </JestStoreProvider>
    );

    const filterButton = screen.getByAltText("Фильтр");
    fireEvent.click(filterButton);
    fireEvent.click(filterButton);

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });

  it("фильтр скрывает все задачи, если все задачи выполнены", () => {
    render(
      <JestStoreProvider preloadedState={preloadedStateAllDone}>
        <NewTaskBar />
        <TaskList />
      </JestStoreProvider>
    );

    const filterButton = screen.getByAltText("Фильтр");
    fireEvent.click(filterButton);

    expect(
      screen.getByText(/Вы пока не создали ни одной задачи/i)
    ).toBeInTheDocument();
  });
});
