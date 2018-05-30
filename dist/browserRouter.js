"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const router_1 = __importDefault(require("./router"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
exports.BrowserHistoryContext = react_1.default.createContext(undefined);
class BrowserLink extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(exports.BrowserHistoryContext.Consumer, null, history => (react_1.default.createElement("a", { href: "", onClick: (e) => {
                e.preventDefault();
                history.pushState(this.props.to);
            } }, this.props.text))));
    }
}
exports.BrowserLink = BrowserLink;
class BrowserRouter extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.back = () => {
            if (this.state.currentPosition > 0) {
                this.setState((prevState) => ({
                    currentPosition: prevState.currentPosition - 1
                }));
            }
        };
        this.forward = () => {
            if (this.state.currentPosition < this.state.history.length - 1) {
                this.setState((prevState) => ({
                    currentPosition: prevState.currentPosition + 1
                }));
            }
        };
        this.pushState = (newNode) => {
            console.log('pushing new state');
            if (newNode !== this.location()) {
                this.setState((prevState) => ({
                    currentPosition: prevState.history.length,
                    history: [...prevState.history, newNode]
                }));
            }
            console.log(this.location());
        };
        this.location = () => {
            return this.state.history[this.state.currentPosition];
        };
        this.editState = (editedNode) => {
            console.log('editing current state');
            if (editedNode !== this.location()) {
                this.setState((prevState) => {
                    const newState = lodash_clonedeep_1.default(prevState);
                    newState.history[prevState.currentPosition] = editedNode;
                    return newState;
                });
            }
            console.log(this.location());
        };
        this.getBrowserHistory = () => {
            return {
                back: this.back,
                forward: this.forward,
                pushState: this.pushState,
                location: this.location,
                editState: this.editState
            };
        };
        this.strategy = (childProps, routerContext, index) => {
            const location = this.location();
            if (childProps.exact) {
                if (childProps.path === location) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (location.includes(childProps.path)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        let startingRoute = '/';
        if (props.startingRoute !== undefined) {
            startingRoute = props.startingRoute;
        }
        let history = [startingRoute];
        let currentPosition = 0;
        if (props.history) {
            history = props.history;
            if (history.indexOf(startingRoute) > -1) {
                currentPosition = history.indexOf(startingRoute);
            }
        }
        this.state = {
            history: [startingRoute],
            currentPosition: 0
        };
        this.history = react_1.default.createContext(this.getBrowserHistory());
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps) {
        console.log('browser router is getting new props: ', nextProps);
    }
    render() {
        return (react_1.default.createElement(exports.BrowserHistoryContext.Provider, { value: this.getBrowserHistory() },
            react_1.default.createElement(router_1.default, { strategy: this.strategy }, react_1.default.Children.map(this.props.children, (child, index) => {
                return (react_1.default.cloneElement(child, { history: this.history }));
            }))));
    }
}
exports.BrowserRouter = BrowserRouter;
exports.default = BrowserRouter;
