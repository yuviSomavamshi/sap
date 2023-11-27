import IconRenderer from "../IconRenderer";

const RoundedIconButton = ({ id, icon, size, color, handleClick, border = false, btnSize = "w-6 h-6" }) => {
  return (
    <button
      id={id}
      className={`inline-flex items-center justify-center ${btnSize} ${
        border ? "border border-color-0900 text-color-0900" : color + " text-white"
      } mr-1 transition-colors duration-150 rounded-full focus:shadow-outline hover:opacity-90`}
    >
      <IconRenderer icon={icon} fontSize={size} onClick={() => (handleClick ? handleClick() : undefined)} />
    </button>
  );
};

export default RoundedIconButton;
