// icons
import { IoMdClose, IoMdHelp, IoMdMoon, IoMdSunny } from "react-icons/io";
import { RiLayoutColumnLine, RiFolderDownloadFill, RiFileUploadLine } from "react-icons/ri";
import { VscCopy } from "react-icons/vsc";

// tooltip plugin
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

// components / styles / utils
import Button from "./Button";
import saveFile from "../../utils/saveFile";
import uploadFile from "../../utils/uploadFile";
import "../../styles/Header.css";

/**
 * Header
 * @param {string} html 
 * @param {function} setHtml
 * @param {boolean} sidebarState
 * @param {function} setSidebarState
 * @param {string} layoutState "column" or "row"
 * @param {function} setLayoutState
 */
export default function Header({
  html,
  setHtml,
  sidebarState,
  setSidebarState,
  layoutState,
  setLayoutState,
  theme,
  handleTheme,
}) {



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

        <Button
          id="help-btn"
          btnclass="btn-svgpair menu-btn"
          title={sidebarState ? <IoMdClose className="menu-icon" /> : <IoMdHelp className="menu-icon" />}
          onClick={() => setSidebarState((prev) => !prev)}
        />

        <Button
          id="layout-btn"
          btnclass={layoutState === "row" ? "btn-svgpair set-layout__btn" : "btn-svgpair set-layout__btn layout-horiz"}
          data-tooltip-content="change layout"
          title={<RiLayoutColumnLine className="set-layout__icon" />}
          onClick={() => {
            setLayoutState(layoutState === "column" ? "row" : "column");
          }}
        />

        <Button
          id="copy-btn"
          btnclass="btn-svgpair copy-markdown"
          title={<VscCopy className="copy-icon" />}
          onClick={() => {
            html.length === 0 ? alert("no markdown to copy") : navigator.clipboard.writeText(html.replace(/<br>/g, "\n"));
          }}
        />

        <Button
          id="theme-btn"
          btnclass="btn-svgpair dark-mode"
          title={
            theme === "theme__light" ? <IoMdSunny className="theme-icon" /> : <IoMdMoon className="theme-icon" />
          }
          onClick={handleTheme}
        />

        <Tooltip
          anchorSelect="#help-btn"
          content={sidebarState ? "close help" : "open help"}
        />
        <Tooltip anchorSelect="#layout-btn" content="change layout" />
        <Tooltip anchorSelect="#copy-btn" content="copy markdown" />
        <Tooltip anchorSelect="#theme-btn" content="change theme" />
      </div>

      <div className="header-col-2">
        <Button
          id="download-btn"
          title={<RiFolderDownloadFill className="save-icon" />}
          btnclass="btn-svgpair save-markdown"
          onClick={() => { html.length === 0 ? alert("no markdown to save") : saveFile({ html: html }); }}
        />
        <Button
          id="upload-btn"
          btnclass="btn-svgpair upload-markdown"
          title={<RiFileUploadLine className="upload-icon" />}
          onClick={() => { uploadFile({ setHtml: setHtml }); }}
        />
        <Tooltip anchorSelect="#download-btn" content="download json" />
        <Tooltip anchorSelect="#upload-btn" content="upload json" />
      </div>

    </header>
  );
}