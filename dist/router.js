"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
;
class Router extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //TODO: Pass the utility functions and data to the children so that they can activate changes of routes and such
        return (react_1.default.createElement("div", { className: this.props.className ? this.props.className : "axc-router__route" }, react_1.default.Children.map(this.props.children, (child, i) => {
            if (this.props.strategy) {
                if (this.props.strategy(child.props, { state: this.state, props: this.props }, i)) {
                    return react_1.default.cloneElement(child, {});
                }
            }
            else if (this.props.activeRoute) {
                if (!child.props || !child.props.match) {
                    return react_1.default.cloneElement(child, {});
                }
                else if (child.props.match === this.props.activeRoute) {
                    return react_1.default.cloneElement(child, {});
                }
            }
            else {
                react_1.default.cloneElement(child, {});
            }
        })));
    }
}
exports.Router = Router;
exports.default = Router;
