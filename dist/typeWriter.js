"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class TypeWriter extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.resetState = () => {
            this.setState(() => ({
                currentCharacter: 0,
                displayString: ''
            }));
        };
        this.getNextTimeDelay = () => {
            return this.props.timePerCharacter + (this.props.variance * (Math.random() * 2 - 1));
        };
        this.renderCharacter = () => {
            if (this.state.currentCharacter <= this.props.string.length - 1) {
                setTimeout(this.renderCharacter, this.getNextTimeDelay());
                this.setState((prevState) => ({
                    displayString: prevState.displayString + this.props.string.charAt(this.state.currentCharacter),
                    currentCharacter: prevState.currentCharacter + 1
                }));
            }
        };
        this.renderString = () => {
            setTimeout(this.renderCharacter, this.getNextTimeDelay());
        };
        console.log('component will construct', this.props);
        if (this.props.savedState) {
            console.log('there was a saved state');
            this.state = this.props.savedState;
        }
        else {
            this.state = {
                currentCharacter: 0,
                displayString: '',
                timer: undefined
            };
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.string !== nextProps.string ||
            this.state.displayString !== nextState.displayString) {
            return true;
        }
        else {
            return false;
        }
    }
    componentWillUnmount() {
        console.log('component will unmount', this.props.preserve);
        if (this.props.preserve) {
            this.props.saveState(this.state);
        }
        clearTimeout(this.state.timer);
    }
    componentDidMount() {
        this.renderString();
    }
    render() {
        return this.state.displayString;
    }
}
TypeWriter.defaultProps = {
    string: '',
    timePerCharacter: 150,
    variance: 35,
    preserve: false
};
exports.TypeWriter = TypeWriter;
exports.default = TypeWriter;
