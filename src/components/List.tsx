import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
  const visibleItems = items.filter((item) => !item.done).slice(0, 10);

  return (
    <ul className="task-list tasks">
      {visibleItems.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};
