"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
<<<<<<< HEAD
const react_1 = __importDefault(require("react"));
const App = ({ name }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null,
            "Great job ",
            name,
            "!")));
=======
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const hook_1 = require("../redux/hooks/hook");
const authSlice_1 = require("../redux/slices/authSlice");
const Login_1 = __importDefault(require("./views/Login"));
const Register_1 = __importDefault(require("./views/Register"));
const App = ({ name }) => {
    const dispatch = (0, hook_1.useAppDispatch)();
    const auth = (0, hook_1.useAppSelector)((state) => state.auth);
    (0, react_1.useEffect)(() => {
        dispatch((0, authSlice_1.getCurrentUser)());
    }, [dispatch]);
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("main", { className: "app", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: "Home" }), auth.currentUser === null && ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/login", children: "Login" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", children: "Register" })] })), auth.currentUser && ((0, jsx_runtime_1.jsx)("span", { onClick: () => dispatch(authSlice_1.logout), children: "Logout" })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsxs)("h1", { children: ["Hello ", name] }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/user-profile", element: (0, jsx_runtime_1.jsx)("h1", { children: "User Profile" }) })] })] }) }));
>>>>>>> dev
};
exports.App = App;
