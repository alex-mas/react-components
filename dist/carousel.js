"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_fontawesome_1 = __importDefault(require("@fortawesome/react-fontawesome"));
const faAngleRight_1 = __importDefault(require("@fortawesome/fontawesome-free-solid/faAngleRight"));
const faAngleLeft_1 = __importDefault(require("@fortawesome/fontawesome-free-solid/faAngleLeft"));
const router_1 = __importDefault(require("./router"));
class Carousel extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onElementChange = this.onElementChange.bind(this);
        this.stopAutoPlay = this.stopAutoPlay.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        let intervalHandle;
        if (this.props.autoPlay !== undefined && this.props.autoPlay > 0) {
            intervalHandle = setInterval(this.next, this.props.autoPlay);
        }
        let activeElement;
        if (this.props.startingElement !== undefined
            &&
                this.props.startingElement <= react_1.default.Children.count(this.props.children) - 1
            &&
                this.props.startingElement >= 0) {
            activeElement = this.props.startingElement;
        }
        else {
            activeElement = 0;
        }
        this.state = {
            activeElement,
            intervalHandle
        };
    }
    onElementChange() {
        if (this.props.onElementChange) {
            this.props.onElementChange(this.state.activeElement);
        }
    }
    next() {
        this.setState((prevState) => {
            let newElement = prevState.activeElement + 1;
            if (newElement > react_1.default.Children.count(this.props.children) - 1) {
                newElement = 0;
            }
            return {
                activeElement: newElement
            };
        }, () => {
            this.onElementChange();
        });
    }
    previous() {
        this.setState((prevState) => {
            let newElement = prevState.activeElement - 1;
            if (newElement < 0) {
                newElement = react_1.default.Children.count(this.props.children) - 1;
            }
            return {
                activeElement: newElement
            };
        }, () => {
            this.onElementChange();
        });
    }
    stopAutoPlay() {
        if (this.state.intervalHandle) {
            clearInterval(this.state.intervalHandle);
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "axc-carousel" },
            react_1.default.createElement("button", { className: "axc-carousel__previous", onClick: this.previous },
                react_1.default.createElement(react_fontawesome_1.default, { icon: faAngleLeft_1.default })),
            react_1.default.createElement(router_1.default, { strategy: (childProps, routerContext, index) => {
                    if (index === this.state.activeElement) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }, className: 'axc-carousel__element-container' }, this.props.children),
            react_1.default.createElement("button", { className: "axc-carousel__next", onClick: this.next },
                react_1.default.createElement(react_fontawesome_1.default, { icon: faAngleRight_1.default }))));
    }
}
exports.Carousel = Carousel;
exports.default = Carousel;
