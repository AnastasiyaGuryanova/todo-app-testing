import { render, screen, waitFor } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";
import { JestStoreProvider } from "../utils/JestStoreProvider";

describe("Оповещение при вополнении задачи", () => {
  it("появляется и содержит заголовок задачи", async () => {
    const preloadedState = {
      taskList: {
        list: [],
        notification: 'Задача "Тестовая задача" завершена',
        filterActive: false,
      },
    };

    render(
      <JestStoreProvider preloadedState={preloadedState}>
        <Notifier
          task='Задача "Тестовая задача" завершена'
          open={true}
          onClose={() => {}}
        />
      </JestStoreProvider>
    );

    const notificationElement = screen.getByText(
      'Задача "Тестовая задача" завершена'
    );
    expect(notificationElement).toBeInTheDocument();
  });

  it("одновременно может отображаться только одно", async () => {
    const preloadedState = {
      taskList: {
        list: [
          { id: "1", header: "Задача 1", done: true },
          { id: "2", header: "Задача 2", done: true },
        ],
        notification: 'Задача "Задача 1" завершена',
        filterActive: false,
      },
    };

    const { rerender } = render(
      <JestStoreProvider preloadedState={preloadedState}>
        <Notifier
          task='Задача "Задача 1" завершена'
          open={true}
          onClose={() => {}}
        />
      </JestStoreProvider>
    );

    expect(screen.getByText('Задача "Задача 1" завершена')).toBeInTheDocument();
    expect(
      screen.queryByText('Задача "Задача 2" завершена')
    ).not.toBeInTheDocument();

    const updatedState = {
      taskList: {
        ...preloadedState.taskList,
        notification: 'Задача "Задача 2" завершена',
      },
    };

    rerender(
      <JestStoreProvider preloadedState={updatedState}>
        <Notifier
          task='Задача "Задача 2" завершена'
          open={true}
          onClose={() => {}}
        />
      </JestStoreProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Задача "Задача 2" завершена')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Задача "Задача 1" завершена')
      ).not.toBeInTheDocument();
    });
  });
});
