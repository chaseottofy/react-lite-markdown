import "../../styles/Sidebar.css";

/**
 * Sidebar
 * @param {boolean} sidebarState
 * @returns {Component}
 * @description list markdown commands
 */
export default function Sidebar({ sidebarState }) {
  return (
    <div className={sidebarState ? "sidebar show-sidebar" : "sidebar hide-sidebar"}>
      <div className="sidebar-body">
        <table>
          <tbody>
            <tr>
              <td><h1 className="header1"># ...</h1></td>
              <td><h1 className="header1">Header 1</h1></td>
            </tr>

            <tr>
              <td><h2 className="header2">## ...</h2></td>
              <td><h2 className="header2">Header 2</h2></td>
            </tr>

            <tr>
              <td><h3 className="header3">### ...</h3></td>
              <td><h3 className="header3">Header 3</h3></td>
            </tr>

            <tr>
              <td>
                <div className="list-example__wrapper">
                  <p>- item1</p>
                  <p>- item2</p>
                </div>
              </td>
              <td>
                <div className="list-example__wrapper">
                  <p className="list-example">• item1</p>
                  <p className="list-example">• item2</p>
                </div>
              </td>
            </tr>

            <tr>
              <td>*bold*</td>
              <td className="bold">bold</td>
            </tr>

            <tr>
              <td>[link](https://)</td>
              <td className="example-link">link</td>
            </tr>

            <tr>
              <td>{`{image link}`}</td>
              <td><span className="fake-img">img</span></td>
            </tr>

            <tr>
              <td>&gt; blockquote</td>
              <td><p className="blockquote">blockquote</p></td>
            </tr>

            <tr>
              <td>
                <span className="example-break-sm">
                  3 underscores "___"
                </span>
              </td>
              <td><span className="example-break-lg"></span></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};