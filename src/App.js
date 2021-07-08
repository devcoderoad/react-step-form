import React from "react";
import "./App.css";

/* components */
import FormContainer from "./components/container/FormContainer";

function App() {
  return (
    <div className="App">
      <FormContainer />
      <footer>
        <p>
          All right reserved - <code>2020</code> | Source code{" "}
          <a
            className="App-link"
            href="https://github.com/dyarfi/react-step-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          by{" "}
          <a className="App-link" href="https://github.com/dyarfi">
            Defrian Yarfi
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
