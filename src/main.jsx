import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import Slider from "./ui/Slider";
// import DatePicker from "./practice/DatePicker";
// import DatePickerV1 from "./practice/DatePickerV1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
