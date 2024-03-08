"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const hook_1 = require("../../../redux/hooks/hook");
const authSlice_1 = require("../../../redux/slices/authSlice");
const react_2 = require("@chakra-ui/react");
const Register = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hook_1.useAppDispatch)();
    const [username, setUsername] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const onSubmit = () => {
        dispatch((0, authSlice_1.register)({ username, email, password })).then((action) => {
            localStorage.setItem("accessToken", action.payload.token);
            navigate("/home");
        });
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Container, { children: [(0, jsx_runtime_1.jsx)(react_2.Container, { children: "Left Side" }), (0, jsx_runtime_1.jsx)(react_2.Container, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Register" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "username", children: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "username", name: "username", onChange: (e) => setUsername(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "email", name: "email", onChange: (e) => setEmail(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", name: "password", onChange: (e) => setPassword(e.target.value) })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "Sign Up" }) })] })] }) })] }));
};
exports.default = Register;
