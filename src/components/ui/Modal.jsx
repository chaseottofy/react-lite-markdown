import "../../styles/Modal.css";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";

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
        <h3 className="markdown-action">#Example</h3>
        <h3 className="markdown-output command-header">Example</h3>

        <h3 className="markdown-action">(Example)</h3>
        <h3 className="markdown-output command-blue">Example</h3>

        <h3 className="markdown-action">[Example](link)</h3>
        <h3 className="markdown-output command-link">Example</h3>

        <h3 className="markdown-action">*Example*</h3>
        <h3 className="markdown-output command-bold">Example</h3>
      </div>
    </div>
  );
}