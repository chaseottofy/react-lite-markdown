import { useState } from 'react';
import './styles/App.css';
import {
  Sidebar,
  Header,
  MarkdownRenderer
} from "./components";

function App() {
  const [html, setHtml] = useState('');
  const [sidebarState, setSidebarState] = useState(false);
  const [layoutState, setLayoutState] = useState("row");

  return (
    <div className="main-app">
      <Sidebar
        sidebarState={sidebarState}
      />
      <div className="main-container">
        <Header
          html={html}
          setHtml={setHtml}
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
          layoutState={layoutState}
          setLayoutState={setLayoutState}
        />
        <MarkdownRenderer
          html={html}
          setHtml={setHtml}
          layoutState={layoutState}
        />
      </div>
    </div>
  );
}

export default App;