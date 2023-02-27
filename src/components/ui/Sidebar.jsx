import "../../styles/Sidebar.css";

export default function Sidebar({ sidebarState }) {
  return (
    <div
      className={sidebarState ? "sidebar show-sidebar" : "sidebar hide-sidebar"}
    >
      <div className="sidebar-content">
      </div>
    </div>
  );
}