import "../../styles/Sidebar.css";
import { AiFillGithub } from "react-icons/ai";

export default function Sidebar({ sidebarState }) {
  return (
    <div className={sidebarState ? "sidebar show-sidebar" : "sidebar hide-sidebar"}>
      <div className="sidebar-body">
        <table>
          <tbody>
            <tr>
              <td>
                <h1 className="header1">#</h1>
              </td>
              <td>
                <h1 className="header1">Header 1</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="header2">##</h1>
              </td>
              <td>
                <h1 className="header2">Header 2</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="header3">###</h1>
              </td>
              <td>
                <h1 className="header3">Header 3</h1>
              </td>
            </tr>
            <tr>
              <td>
                <p>*bold*</p>
              </td>
              <td>
                <p className="bold">bold</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- list</p>
              </td>
              <td>
                <p className="list-example">• list</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>[link](https://)</p>
              </td>
              <td>
                <p className="example-link">link</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>{`{image link}`}</p>
              </td>
              <td>
                <div className="fake-img">img</div>
              </td>
            </tr>
            <tr>
              <td>
                <p>&gt; blockquote</p>
              </td>
              <td>
                <p className="blockquote">blockquote</p>
              </td>
            </tr>
            <tr>
              <td>
                <span>&lt;code&gt;...&lt;/code&gt;</span>
              </td>
              <td>
                <pre className="pre">
                  <code className="code">hello()</code>
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="sidebar-footer">
        <p>by Chase Ottofy</p>
        <a
          title="github repo link"
          rel="noreferrer"
          href="https://github.com/chaseottofy/react-lite-markdown"
          target="_blank"
          aria-disabled={!sidebarState}
          disabled={!sidebarState}
          role="link"
        >
          <AiFillGithub className="git-link" />
        </a>
      </div>
    </div>
  );
};