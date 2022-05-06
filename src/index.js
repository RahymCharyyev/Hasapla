import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Hasapla from "./components/hasapla";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Hasapla />, document.getElementById("root"));
registerServiceWorker();
