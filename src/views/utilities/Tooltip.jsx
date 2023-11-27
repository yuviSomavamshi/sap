import { useState } from "react";
import { usePopperTooltip } from "./usePopperTooltip";
import "../../assets/css/tooltip.css";

const Tooltip = ({ placement = "auto", title, content, children, backgroundColor }) => {
  const [controlledVisible, setControlledVisible] = useState(false);
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement,
    trigger: "hover",
    closeOnOutsideClick: false,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible
  });

  if (title == undefined && content == undefined) {
    return <>{children}</>;
  }

  const toolProps = { className: "tooltip-container px-2 z-50" };
  if (backgroundColor) {
    toolProps.style = { color: "#262640", backgroundColor };
  }

  console.log(getTooltipProps(toolProps));

  return (
    <>
      <div ref={setTriggerRef}>{children}</div>
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps(toolProps)}>
          {title && <div className={`${content === undefined ? "text-[10px] leading-4" : "text-xs font-semibold"} break-words`}>{title}</div>}
          {content && <div className="text-[10px] leading-4 break-words mt-2">{content}</div>}
          <div {...getArrowProps({ className: "tooltip-arrow" })} />
        </div>
      )}
    </>
  );
};

export default Tooltip;
