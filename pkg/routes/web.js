"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    });
};
exports.register = register;
//# sourceMappingURL=web.js.map