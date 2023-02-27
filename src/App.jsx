import { useState, useRef } from 'react';
import './styles/App.css';
import {
  Header,
  Sidebar,
  MarkdownEditor,
  Modal
} from './components';

function App() {
  const [markdown, setMarkdown] = useState("");
  const [sidebarState, setSidebarState] = useState(false);
  const [layoutState, setLayoutState] = useState("column");
  const [modalState, setModalState] = useState(false);

  return (
    <div 
      className='main-app'
    >
      <Sidebar 
        sidebarState={sidebarState}
      />
      <div className="main-container">
        <Header 
          markdown={markdown} 
          setMarkdown={setMarkdown}
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
          layoutState={layoutState}
          setLayoutState={setLayoutState}
          setModalState={setModalState}
        />
        <MarkdownEditor 
          markdown={markdown}
          setMarkdown={setMarkdown}
          layoutState={layoutState}
        />
      </div>
      <aside>
        <Modal 
          modalState={modalState}
          setModalState={setModalState}
        />
      </aside>
    </div>
  );
}

export default App;