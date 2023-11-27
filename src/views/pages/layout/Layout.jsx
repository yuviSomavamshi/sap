import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ShowSnack } from "../../utilities/Snackbar";

function Layout({ disableLayout, base, sideBarItems, children, ...props }) {
  const { windowDimension } = props;
  const [expandSB, setExpandSB] = useState(true);

  useEffect(() => {
    setExpandSB(windowDimension.winWidth > 1024);
  }, [windowDimension]);

  const showSidebar = window.innerWidth > 1000;

  if (disableLayout) return children;

  return (
    <main role="main" className="w-full max-w-full h-screen bg-blue-50">
      <div
        className="flex flex-row"
        style={{
          maxHeight: windowDimension.maxContentHeight
        }}
      >
        {showSidebar && (
          <Sidebar
            showSidebar={expandSB}
            base={base}
            sideBarItems={sideBarItems}
            menuClicked={() => setExpandSB(!expandSB)}
            {...windowDimension}
            {...props}
          />
        )}
        <div
          className="w-full pl-2 overflow-y-scroll custom-scrollbar"
          style={{
            minHeight: windowDimension.maxContentHeight,
            maxHeight: windowDimension.maxContentHeight
          }}
        >
          {children}
        </div>
        <ShowSnack />
      </div>
    </main>
  );
}

export default Layout;
