import { DeleteButton } from "./DeleteButton";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  const effectiveHeader =
    props.header.trim() === "" ? "Без названия" : props.header;
  const truncatedHeader =
    effectiveHeader.length > 32
      ? effectiveHeader.slice(0, 32)
      : effectiveHeader;

  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        id={props.id}
        defaultChecked={props.done}
        onChange={() => props.onToggle(props.id)}
      />

      <label htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
        {props.done ? <s>{truncatedHeader}</s> : truncatedHeader}
      </label>

      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
