import { IoIosMenu, IoMdClose, IoMdHelp } from "react-icons/io";
import { RiLayoutColumnLine, RiFolderDownloadFill, RiFileUploadLine } from "react-icons/ri";
import { VscCopy } from "react-icons/vsc";
import Button from "./Button";
import saveFile from "../../utils/saveFile";
import uploadFile from "../../utils/uploadFile";
import "../../styles/Header.css";


export default function Header({
  html,
  setHtml,
  sidebarState,
  setSidebarState,
  layoutState,
  setLayoutState,
}) {

  return (
    <header className="header">
      <div className="header-col-1">
        <h1 className="header-title">MD LITE</h1>
        
        <Button
          btnclass="btn-svgpair menu-btn"
          title={sidebarState ? <IoMdClose className="menu-icon" /> : <IoMdHelp className="menu-icon" />}
          onClick={() => setSidebarState((prev) => !prev)}
        />

        <Button
          btnclass={layoutState === "row" ? "btn-svgpair set-layout__btn" : "btn-svgpair set-layout__btn layout-horiz"}
          title={<RiLayoutColumnLine className="set-layout__icon" />}
          onClick={() => {
            setLayoutState(layoutState === "column" ? "row" : "column");
          }}
        />
        <Button
          btnclass="btn-svgpair copy-markdown"
          title={<VscCopy className="copy-icon" />}
          onClick={() => {
            html.length === 0 ? alert("no markdown to copy") : navigator.clipboard.writeText(html.replace(/<br>/g, "\n"));
          }}
        />
      </div>


      <div className="header-col-2">
        <div className="handle-markdown__btns">
          <Button
            btnclass="btn-svgpair save-markdown"
            title={<RiFolderDownloadFill className="save-icon" />}
            onClick={() => { html.length === 0 ? alert("no markdown to save") : saveFile({ html: html }); }}
          />
          <Button
            btnclass="btn-svgpair upload-markdown"
            title={<RiFileUploadLine className="upload-icon" />}
            onClick={() => { uploadFile({ setHtml: setHtml }); }}
          />
        </div>
      </div>

    </header>
  );
}