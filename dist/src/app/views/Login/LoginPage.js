"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const hook_1 = require("../../../redux/hooks/hook");
const authSlice_1 = require("../../../redux/slices/authSlice");
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hook_1.useAppDispatch)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const onSubmit = (e) => {
        dispatch((0, authSlice_1.login)({ email, password })).then((action) => {
            localStorage.setItem("accessToken", action.payload.token);
            navigate("/");
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Login" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "email", placeholder: "Email", name: "email", onChange: (e) => setEmail(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", placeholder: "Password", name: "password", onChange: (e) => setPassword(e.target.value) })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "Sign In" }) })] })] }));
};
exports.default = Login;
