"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
console.log("Hello World!");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const app_1 = require("./app");
react_dom_1.default.render(react_1.default.createElement(app_1.App, { name: "Gian" }), document.getElementById("root"));
=======
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const react_redux_1 = require("react-redux");
const store_1 = require("./redux/store");
const app_1 = require("./app");
const container = document.getElementById("root");
const root = (0, client_1.createRoot)(container);
root.render((0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.store, children: (0, jsx_runtime_1.jsx)(app_1.App, { name: "Edwin" }) }));
>>>>>>> dev
