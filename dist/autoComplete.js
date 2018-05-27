"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const v4_1 = __importDefault(require("uuid/v4"));
const defaultPredictionData = ['hello', 'world', 'hello world', 'hey there', 'hello world program in c++', 'hello world program', 'stupidly long text stupidly long text stupidly long text stupidly long text'];
let defaultStyles = {
    autoComplete: {
        position: 'relative',
        width: '173px'
    },
    autoComplete__input: {
        maxWidth: 'inherit',
        width: 'inherit'
    },
    autoComplete__suggestions: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        border: '0.5px solid black'
    },
    autoComplete__suggestion: {
        border: '0.25px solid grey'
    },
    autoComplete__suggestion_selected: {
        border: '0.5px solid black',
        fontWeight: 'bold'
    }
};
class AutoComplete extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : v4_1.default(),
            userHistory: [],
            predictionData: props.predictionData ? props.predictionData : defaultPredictionData,
            suggestions: [],
            selectedSuggestion: -1,
            focused: false,
            styles: {
                autoComplete: {},
                autoComplete__input: {},
                autoComplete__suggestions: {},
                autoComplete__suggestion: {},
                autoComplete__suggestion_selected: {}
            }
        };
        //style initialization 
        if (props.useInlineStyles) {
            if (props.styles) {
                for (let key in this.state.styles) {
                    if (this.state.styles.hasOwnProperty(key)) {
                        this.state.styles[key] = Object.assign({}, defaultStyles[key], props.styles[key]);
                    }
                }
            }
            else {
                for (let key in this.state.styles) {
                    if (this.state.styles.hasOwnProperty(key)) {
                        this.state.styles[key] = Object.assign({}, defaultStyles[key]);
                    }
                }
            }
        }
        this.onChange = this.onChange.bind(this);
        this.computeSuggestions = this.computeSuggestions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    onChange(event) {
        let inputValue = '';
        if (typeof event === 'object') {
            inputValue = event.target.value;
        }
        else {
            inputValue = event;
        }
        this.setState(() => {
            let suggestions;
            if (this.props.getSuggestions) {
                suggestions = this.props.getSuggestions();
            }
            else {
                suggestions = this.computeSuggestions(inputValue);
            }
            return {
                suggestions,
                selectedSuggestion: -1
            };
        });
        this.props.onChange(inputValue);
    }
    shouldAddSuggestion(value, suggestion, suggestions) {
        return (suggestion.substring(0, value.length) === value &&
            suggestions.indexOf(suggestion) === -1 &&
            value !== suggestion);
    }
    computeSuggestions(value) {
        const suggestions = [];
        for (let i = 0; i < this.state.userHistory.length; i++) {
            if (this.shouldAddSuggestion(value, this.state.userHistory[i], suggestions)) {
                suggestions.push(this.state.userHistory[i]);
            }
        }
        for (let i = 0; i < this.state.predictionData.length; i++) {
            if (this.shouldAddSuggestion(value, this.state.predictionData[i], suggestions)) {
                suggestions.push(this.state.predictionData[i]);
            }
        }
        return suggestions;
    }
    onSubmit(value) {
        this.setState((prevState) => {
            return {
                userHistory: [...prevState.userHistory, value]
            };
        });
    }
    onKeyDown(event) {
        if (this.state.focused) {
            if (event.keyCode === 40 && this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion + 1
                }));
            }
            else if (event.keyCode === 38 && this.state.selectedSuggestion > -1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion - 1
                }));
            }
            else if (event.keyCode === 13 && this.state.selectedSuggestion > -1) {
                this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
            }
            else if (event.keyCode === 27) {
                this.setState((prevState) => ({
                    selectedSuggestion: -1
                }));
            }
            else if (event.keyCode === 9 && this.state.selectedSuggestion > -1) {
                event.preventDefault();
                if (this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                    this.setState((prevState) => ({
                        selectedSuggestion: prevState.selectedSuggestion + 1
                    }));
                }
                else {
                    this.setState(() => ({
                        selectedSuggestion: 0
                    }));
                }
            }
        }
    }
    onFocus(event) {
        this.setState(() => ({
            focused: true
        }));
    }
    onBlur(event) {
        this.setState(() => ({
            focused: false
        }));
    }
    render() {
        let value = this.props.value;
        if (this.state.selectedSuggestion > -1) {
            value = this.state.suggestions[this.state.selectedSuggestion];
        }
        return (react_1.default.createElement("div", { className: this.props.className ? this.props.className : undefined, onKeyDown: this.onKeyDown },
            react_1.default.createElement("div", { className: 'axc-auto-complete', style: this.state.styles.autoComplete },
                react_1.default.createElement("input", { id: this.state.id, className: 'axc-auto-complete__input', placeholder: this.props.placeholder, type: 'text', value: value, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, style: this.state.styles.autoComplete__input }),
                this.state.focused ?
                    react_1.default.createElement("div", { className: 'axc-auto-complete__suggestions', style: this.state.styles.autoComplete__suggestions }, this.state.suggestions.map((suggestion, index) => {
                        const selected = index === this.state.selectedSuggestion;
                        let className = 'axc-auto-complete__suggestion';
                        if (selected) {
                            className += '--selected';
                        }
                        return (react_1.default.createElement("div", { key: suggestion, className: className, style: selected ?
                                this.state.styles.autoComplete__suggestion_selected
                                :
                                    this.state.styles.autoComplete__suggestion }, suggestion));
                    }))
                    :
                        undefined)));
    }
}
exports.AutoComplete = AutoComplete;
exports.default = AutoComplete;
