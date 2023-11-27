import CustomDialog from "./CustomDialog";
import IconRenderer from "../IconRenderer";

const Icons = {
  info: "Info",
  warn: "Warning",
  success: "CloudDone"
};

export default function CustomAlertDialog({ showDialog, level, message, details, buttonText, onClose }) {
  return (
    <>
      {showDialog && (
        <CustomDialog open={showDialog} onClose={onClose}>
          <div className="flex flex-col h-fit items-center justify-center">
            <IconRenderer
              icon={Icons[level] || "Error"}
              className={`${
                level === "info"
                  ? "text-color-0500"
                  : level === "warn"
                    ? "text-yellow-400"
                    : level === "success"
                      ? "text-cds-green-0600"
                      : "text-cds-red-0500"
              }`}
              style={{
                fontSize: "80"
              }}
            />
            <span id="confirm-message" className="mb-5 text-sm text-center">
              {message}
            </span>
            {details && (
              <span id="confirm-message" className="mb-5 text-center text-red-500">
                {details}
              </span>
            )}
            <div className="flex text-cds-white">
              <button
                id="confirm-ok"
                type="button"
                className="flex px-4 py-1 rounded focus:outline-none shadow-sm bg-color-0800 hover:bg-color-0700 uppercase"
                onClick={onClose}
              >
                {buttonText || "ok"}
              </button>
            </div>
          </div>
        </CustomDialog>
      )}
    </>
  );
}
