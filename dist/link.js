"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const browserHistory_1 = require("./browserHistory");
class Link extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(browserHistory_1.History.Consumer, null, history => (react_1.default.createElement("a", { href: "", onClick: (e) => {
                e.preventDefault();
                history.pushState({ path: this.props.to, title: document.title });
            } }, this.props.text))));
    }
}
exports.Link = Link;
exports.default = Link;
