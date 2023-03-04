import { useState } from "react";
import { IoMdClose, IoMdHelp, IoMdMoon, IoMdSunny } from "react-icons/io";
import { RiLayoutColumnLine } from "react-icons/ri";
import { VscCopy } from "react-icons/vsc";
import Button from "./Button";
import Tooltip from "./Tooltip";
import "../../styles/Header.css";

/**
 * @Component Header
 * @param {string} html 
 * @param {function} setHtml
 * @param {boolean} sidebarState
 * @param {function} setSidebarState
 * @param {string} layoutState "column" or "row"
 * @param {function} setLayoutState
 * @param {function} handleTheme
 */
export default function Header({
  html,
  sidebarState,
  setSidebarState,
  layoutState,
  theme,
  setLayoutState,
  handleTheme,
}) {

  const [copyMessage, setCopyMessage] = useState("copy markdown");

  return (
    <header className="header">
      <div className="header-col-1">
        <a
          id="header-title"
          title="github repo link"
          rel="noreferrer"
          href="https://github.com/chaseottofy/react-lite-markdown"
          target="_blank"
          role="link"
          className="header-title"
        >MDLite
        </a>

        <Tooltip content={sidebarState ? "close help" : "open help"}>
          <Button
            btnclass="btn-svgpair--sm menu-btn"
            title={sidebarState ? <IoMdClose className="menu-icon" /> : <IoMdHelp className="menu-icon" />}
            onClick={() => setSidebarState((prev) => !prev)}
          />
        </Tooltip>

        <Tooltip content="change layout">
          <Button
            btnclass={layoutState === "row" ? "btn-svgpair--sm set-layout__btn" : "btn-svgpair--sm set-layout__btn layout-horiz"}
            data-tooltip-content="change layout"
            title={<RiLayoutColumnLine className="set-layout__icon" />}
            onClick={() => setLayoutState((prev) => prev === "row" ? "column" : "row")}
          />
        </Tooltip>

        <Tooltip content={copyMessage}>
          <Button
            btnclass="btn-svgpair--sm copy-markdown"
            title={<VscCopy className="copy-icon" />}
            onClick={() => {
              if (html.length === 0) {
                setCopyMessage("no markdown to copy");
              } else {
                navigator.clipboard.writeText(
                  html.replace(/<br>/g, "\n")
                );
                setCopyMessage("copied!");
                setTimeout(() => setCopyMessage("copy markdown"), 1000);
              }
            }}
          />
        </Tooltip>

        <Tooltip content="change theme">
          <Button
            btnclass="btn-svgpair--sm dark-mode"
            title={
              theme === "theme__light" ? <IoMdSunny className="theme-icon" /> : <IoMdMoon className="theme-icon" />
            }
            onClick={handleTheme}
          />
        </Tooltip>
      </div>
    </header>
  );
}