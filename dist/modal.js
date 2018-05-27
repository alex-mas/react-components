"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class Modal extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            isInTransition: false
        };
        this.handleClickOutsideModal = this.handleClickOutsideModal.bind(this);
        this.handleClickInsideModal = this.handleClickInsideModal.bind(this);
        this.transition = this.transition.bind(this);
    }
    handleClickOutsideModal(event) {
        this.props.onClose();
    }
    handleClickInsideModal(event) {
        event.stopPropagation();
    }
    transition(delay) {
        if (this.props.isOpen && this.props.onOpen) {
            this.props.onOpen();
        }
        setTimeout(() => {
            this.setState({
                isInTransition: false
            });
        }, delay);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.props.isOpen) {
            if (this.props.delay) {
                this.setState(() => ({ isInTransition: true }), () => {
                    this.transition(500);
                });
            }
        }
    }
    render() {
        if (this.props.isOpen || this.state.isInTransition) {
            let overlayClassName = 'axc-modal__overlay';
            if (this.state.isInTransition) {
                if (this.props.isOpen) {
                    overlayClassName += '--opening';
                }
                else {
                    overlayClassName += '--closing';
                }
            }
            let bodyClassName = 'axc-modal__body';
            if (this.props.className) {
                bodyClassName += " " + this.props.className;
            }
            return (react_1.default.createElement("div", { className: overlayClassName, onClick: this.handleClickOutsideModal },
                react_1.default.createElement("div", { className: bodyClassName, onClick: this.handleClickInsideModal }, this.props.children)));
        }
        else {
            return null;
        }
    }
}
exports.Modal = Modal;
exports.default = Modal;
