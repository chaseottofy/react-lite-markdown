import { useState, useEffect } from 'react';
import store from "./hooks/storeLocal";
import handleTheme from "./hooks/handleTheme";
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
  /* theme__light, theme__dark, theme__medium */
  const [theme, setTheme] = useState("theme__light");

  // const handleLayout = () => {
  //   if (layoutState === "row") {
  //     setLayoutState("column");
  //     store.set("layout", "column");
  //   } else {
  //     setLayoutState("row");
  //     store.set("layout", "row");
  //   }
  // }

  useEffect(() => {
    const localHtml = store.get('html');
    if (localHtml) {
      setHtml(localHtml);
    }
  }, []);

  useEffect(() => { 
    store.set('html', html); 
  }, [html]);

  // useEffect(() => {
  //   const localLayout = store.get("layout");
  //   if (localLayout === "column") {
  //     setLayoutState("column");
  //   } else {
  //     setLayoutState("row");
  //   }
  // }, [])

  useEffect(() => {
    const localTheme = store.get('theme');
    if (localTheme) {
      const root = document.documentElement;
      setTheme(localTheme);
      root.removeAttribute("class");
      root.classList.add(localTheme);
    }
  }, []);

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
          theme={theme}
          setLayoutState={setLayoutState}
          handleTheme={() => handleTheme({ store, setTheme })}
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