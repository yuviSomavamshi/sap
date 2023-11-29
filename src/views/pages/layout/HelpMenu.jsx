import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AboutDialog from "./AboutDialog";
import { Transition } from "@headlessui/react";
import IconRenderer from "../../IconRenderer";

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function Help({ product, ...props }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown?.current?.contains(target) || trigger?.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex mx-1">
      <button
        ref={trigger}
        className={`w-5 h-5 flex items-center justify-center bg-slate-200 hover:bg-slate-300 transition duration-150 rounded-full ${
          dropdownOpen && "bg-slate-300"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Need help?</span>
        <IconRenderer icon="Info" className="text-color-0500 fill-color-0500" fontSize="10" />
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden"
        show={dropdownOpen}
        enter="transition ease-in-out duration-[100ms]"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-[75ms]"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
          <div className="text-sm font-semibold text-color-0400 uppercase pt-1.5 pb-2 px-4">Need help?</div>
          <ul>
            <li>
              <div
                className="font-medium text-sm text-color-0500 hover:text-color-0700 flex items-center py-1 px-3 cursor-pointer"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  openInNewTab(`/${product?.page.base}/docs/introduction`);
                }}
              >
                <IconRenderer icon="Description" className="text-color-0500 fill-color-0500 mr-1" style={{ width: "16px" }} />
                <span>Documentation</span>
              </div>
            </li>
            {/* <li>
              <Link
                className="font-medium text-sm text-color-0500 hover:text-color-0700 flex items-center py-1 px-3"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg className="w-3 h-3 fill-current text-color-0500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
                </svg>
                <span>Support Site</span>
              </Link>
            </li> */}
            <li>
              <Link
                className="font-medium text-sm text-color-0500 hover:text-color-0700 flex items-center py-1 px-3"
                to="#0"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setShowAbout(!showAbout);
                }}
              >
                <IconRenderer icon="Info" className="text-color-0500 fill-color-0500 mr-1" style={{ width: "16px" }} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-color-0500 hover:text-color-0700 flex items-center py-1 px-3"
                to="#0"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  openInNewTab(`/${product?.page.base}/docs/release/note_v${product?.version}`);
                }}
              >
                <IconRenderer icon="Assignment" className="text-color-0500 fill-color-0500 mr-1" style={{ width: "16px" }} />
                <span>Release Note</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
      <AboutDialog showDialog={showAbout} closeDialog={() => setShowAbout(!showAbout)} product={product} {...props} />
    </div>
  );
}

export default Help;
