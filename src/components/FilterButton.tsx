import FilterIcon from "../icons/filter.png";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

export const FilterButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      className="button button-with-icon"
      onClick={onClick}
      disabled={disabled}
      data-alt="фильтровать задачи"
    >
      <img src={FilterIcon} alt="Фильтр" />
    </button>
  );
};
