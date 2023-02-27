import { IoIosMenu, IoMdClose, IoMdHelp } from "react-icons/io";
import { RiLayoutColumnLine } from "react-icons/ri";
import "../../styles/Header.css";
import Button from "./Button";
import saveFile from "../../utils/saveFile";
import uploadFile from "../../utils/uploadFile";

export default function Header({
  markdown,
  setMarkdown,
  sidebarState,
  setSidebarState,
  layoutState,
  setLayoutState,
  setModalState,
}) {

  return (
    <header className="header">
      <div className="header-col-1">
        <Button
          btnclass="btn-svgpair menu-btn"
          title={sidebarState ? <IoMdClose className="menu-icon" /> : <IoIosMenu className="menu-icon" />}
          onClick={() => setSidebarState((prev) => !prev)}
        />
        <Button
          btnclass="btn-svgpair help-btn"
          title={<IoMdHelp className="help-icon" />}
          onClick={() => setModalState((prev) => !prev)}
        />
        <Button
          btnclass={layoutState === "column" ? "btn-svgpair set-layout__btn" : "btn-svgpair set-layout__btn layout-horiz"}
          title={<RiLayoutColumnLine className="set-layout__icon" />}
          onClick={() => {
            setLayoutState(layoutState === "column" ? "row" : "column");
          }}
        />
      </div>


      <div className="header-col-2">
        <div className="handle-markdown__btns">
          <Button
            title="save"
            btnclass="btn-primary primary-dark save-markdown"
            onClick={() => {
              markdown.length === 0 ? alert("no markdown to save") : saveFile({ list: markdown });
            }}
          />
          <Button
            title="upload"
            btnclass="btn-dark upload-markdown"
            onClick={() => {
              uploadFile({ setMarkdown: setMarkdown });
            }}
          />
        </div>
      </div>

    </header>
  );
}