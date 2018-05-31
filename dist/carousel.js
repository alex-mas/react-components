"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_fontawesome_1 = __importDefault(require("@fortawesome/react-fontawesome"));
const faAngleRight_1 = __importDefault(require("@fortawesome/fontawesome-free-solid/faAngleRight"));
const faAngleLeft_1 = __importDefault(require("@fortawesome/fontawesome-free-solid/faAngleLeft"));
const faCircle_1 = __importDefault(require("@fortawesome/fontawesome-free-solid/faCircle"));
const faCircle_2 = __importDefault(require("@fortawesome/fontawesome-free-regular/faCircle"));
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
    boundsChecked(num) {
        if (num < 0) {
            num = react_1.default.Children.count(this.props.children) - 1;
        }
        else if (num > react_1.default.Children.count(this.props.children) - 1) {
            num = 0;
        }
        return num;
    }
    next() {
        this.setState((prevState) => {
            let newElement = prevState.activeElement + 1;
            return {
                activeElement: this.boundsChecked(newElement)
            };
        }, () => {
            this.onElementChange();
        });
    }
    previous() {
        this.setState((prevState) => {
            let newElement = prevState.activeElement - 1;
            return {
                activeElement: this.boundsChecked(newElement)
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
            this.props.captions ?
                react_1.default.createElement("div", { className: 'axc-carousel__captions' }, this.props.captions)
                :
                    null,
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
class LinkedCarousel extends Carousel {
    setElement(element) {
        if (this.state.activeElement !== element) {
            this.setState((prevState) => {
                return {
                    activeElement: this.boundsChecked(element)
                };
            }, () => {
                this.onElementChange();
            });
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: 'axc-linked-carousel' },
            react_1.default.createElement("button", { className: 'axc-linked-carousel__previous', onClick: this.previous },
                react_1.default.createElement(react_fontawesome_1.default, { icon: faAngleLeft_1.default })),
            this.props.captions ?
                react_1.default.createElement("div", { className: 'axc-linked-carousel__captions' }, react_1.default.createElement(this.props.captions, null))
                :
                    null,
            react_1.default.createElement("div", { className: 'axc-linked-carousel__links' }, Array.apply(null, { length: react_1.default.Children.count(this.props.children) }).map((elmt, i) => {
                let iconType = faCircle_2.default;
                if (i === this.state.activeElement) {
                    iconType = faCircle_1.default;
                }
                return (react_1.default.createElement("a", { href: '', className: 'axc-linked-carousel__link', onClick: (e) => {
                        e.preventDefault();
                        this.setElement(i);
                    } },
                    react_1.default.createElement(react_fontawesome_1.default, { icon: iconType })));
            })),
            react_1.default.createElement(router_1.default, { strategy: (childProps, routerContext, index) => {
                    if (index === this.state.activeElement) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }, className: 'axc-linked-carousel__element-container' }, this.props.children),
            react_1.default.createElement("button", { className: 'axc-linked-carousel__next', onClick: this.next },
                react_1.default.createElement(react_fontawesome_1.default, { icon: faAngleRight_1.default }))));
    }
}
exports.LinkedCarousel = LinkedCarousel;
exports.default = {
    Carousel,
    LinkedCarousel
};
