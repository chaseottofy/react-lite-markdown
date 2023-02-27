import "../../styles/Modal.css";
import Button from "./Button"
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";

export default function Modal({ modalState, setModalState }) {



  return (
    <div 
      className={modalState ? "modal show-modal" : "modal"}
    >
      <div className="modal-header">
        <h2 className="modal-title">Markdown lite</h2>

        <Button 
          btnclass="btn-svgpair close-modal-btn"
          title={<IoMdClose className="close-modal-icon" />}
          onClick={() => setModalState((prev) => !prev)}
        />
      </div>

      <div className="modal-content">
        <h3 className="markdown-action">#</h3>
        <h3 className="markdown-output command-header">Header</h3>

        <h3 className="markdown-action">(...)</h3>
        <h3 className="markdown-output command-blue">Blue text</h3>

        <h3 className="markdown-action">[name](link)</h3>
        <h3 className="markdown-output command-link">Hyperlink</h3>

        <h3 className="markdown-action">*...*</h3>
        <h3 className="markdown-output command-bold">Bold Text</h3>
      </div>
    </div>
  );
}