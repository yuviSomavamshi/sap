import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import snakeCase from "lodash/snakeCase";
import IconRenderer from "../../IconRenderer";
import Tooltip from "../../utilities/Tooltip";
import UserInfo from "./UserInfo";
import LogoRenderer from "./LogoRenderer";
import LogoutButton from "./LogoutButton";

export default function Sidebar({ showSidebar, base, sideBarItems, maxContentHeight, menuClicked, ...props }) {
  const isSmallScreen = maxContentHeight < 800;
  return (
    <aside
      className={`transition-all duration-500 ${
        showSidebar ? "w-[12%]" : "w-14"
      } bg-sky-950 text-slate-100 flex flex-col cursor-pointer h-screen z-50`}
    >
      <div className="h-[35px] border-b mx-3 py-3 flex flex-row items-center">
        <LogoRenderer className="m-1 h-5 w-5" name={props?.product.name} />
        {showSidebar && (
          <div className="cursor-pointer tracking-normal font-normal flex flex-col items-center justify-center">
            <label className="px-2 lg:tracking-wider text-lg font-semibold tracking-wider">{props?.product.name}</label>
          </div>
        )}
      </div>
      <div className="flex flex-col h-[94%]">
        <SidebarRender showSidebar={showSidebar} isSmallScreen={isSmallScreen} {...props}>
          {sideBarItems.map((item, index) =>
            item.divider ? (
              <SidebarDividerItem key={index} title={item.title} isSmallScreen={isSmallScreen} />
            ) : (
              <SidebarItem key={index} showTitle={showSidebar} base={base} isSmallScreen={isSmallScreen} {...item} />
            )
          )}
        </SidebarRender>
        <UserInfo showTitle={showSidebar} {...props} />
        <div className={`flex ${showSidebar ? "flex-row" : "flex-col"} items-center justify-between`}>
          <LogoutButton {...props} />
          <Tooltip title={!showSidebar ? "Expand Sidebar" : "Collapse Sidebar"} placement="bottom">
            <div className="h-6 w-7 flex cursor-pointer rounded justify-center items-center hover:bg-slate-500/40 mx-1" onClick={menuClicked}>
              <IconRenderer icon="DoubleArrowTwoTone" className={`text-white ${showSidebar ? "rotate-180" : ""}`} fontSize="20px" />
            </div>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}

function SidebarRender({ showSidebar, children }) {
  return (
    <div className={`flex flex-col px-1.5 py-2 select-none h-full ${showSidebar ? "max-h-[94%]" : "max-h-[99%]"} overflow-y-auto custom-scrollbar`}>
      {children}
    </div>
  );
}

function SidebarDividerItem({ title, isSmallScreen }) {
  return (
    <div
      className="m-0.5 inline-flex items-start border-t-[1px] border-slate-600"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p className={`${isSmallScreen ? "text-[7px]" : "text-sm"} font-normal tracking-wide`}>{title}</p>
    </div>
  );
}

function SidebarItem({ showTitle, base, path, title, icon, openNewTab = false, isSmallScreen }) {
  const [hovered, setHovered] = useState(false);
  const actualPath = base + "/" + path;
  const location = useLocation();
  const { pathname } = location;
  const id = snakeCase(title).replaceAll("_", "-");
  return (
    <NavLink
      id={`nav-page-${id}`}
      to={!openNewTab ? actualPath : pathname}
      className={`relative inline-flex items-center w-full transition-all duration-300 ease-in-out ${isSmallScreen ? "mb-1" : "p-1 mb-2"} ${
        pathname.includes(path)
          ? "backdrop-blur-sm bg-slate-500/40 text-slate-300 border-l-4 border-slate-500"
          : hovered
            ? "backdrop-blur-sm text-slate-300"
            : "hover:text-slate-300"
      } ${!showTitle ? "justify-center rounded" : "rounded-md"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (openNewTab) {
          openInNewTab(path);
        }
      }}
    >
      <div
        className={`absolute h-full transition-all duration-300 ease-in-out ${
          hovered ? "right-0 w-full rounded-md bg-slate-900 text-slate-300" : "right-full w-0"
        }`}
      />
      {icon && (
        <div className="mx-1 z-10">
          <Tooltip title={!showTitle ? title : undefined} placement="right">
            <IconRenderer icon={icon} className="h-4 w-4" viewBox={`${isSmallScreen ? "0 0 30 30" : "0 0 25 25"}`} />
          </Tooltip>
        </div>
      )}
      {showTitle && title && <label className="break-words pr-1 z-10 cursor-pointer font-medium text-sm">{title}</label>}
    </NavLink>
  );
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
