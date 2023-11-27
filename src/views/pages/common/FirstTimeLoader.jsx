import React from "react";
import Spinner from "../../utilities/Spinner";
import IconRenderer from "../../IconRenderer";
import Centered from "../../utilities/Centered";
import IconButton from "../../utilities/IconButton";

export const FirstTimeLoader = ({ id, loading, title = "Create", handleClickAction, icon = "Rocket", buttonIcon = "Rocket" }) => {
  return (
    <Centered>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center h-48 w-96 shadow-xl rounded-md bg-slate-50 border border-slate-300">
          <IconRenderer icon={icon} className="text-color-0500 animate-bounce" style={{ fontSize: 50 }} />
          <label id={`${id}-label`} className="my-3 text-center text-slate-800 uppercase text-lg select-none">
            {title}
          </label>
          <IconButton id={`${id}-btn`} title="Create" icon={buttonIcon} onClick={handleClickAction} />
        </div>
      )}
    </Centered>
  );
};
