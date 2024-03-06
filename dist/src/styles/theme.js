"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const theme = (0, react_1.extendTheme)({ config });
exports.default = theme;
