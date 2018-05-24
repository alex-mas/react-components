"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var v4_1 = __importDefault(require("uuid/v4"));
var defaultPredictionData = ['hello', 'world'];
var AutoComplete = /** @class */ (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            id: _this.props.id ? _this.props.id : v4_1.default(),
            userHistory: [],
            predictionData: props.predictionData ? props.predictionData : defaultPredictionData,
            suggestions: [],
            selectedSuggestion: -1
        };
        return _this;
    }
    AutoComplete.prototype.onChange = function (inputValue) {
        var _this = this;
        this.props.onChange(inputValue);
        this.setState(function () {
            return {
                suggestions: _this.computeSuggestions(inputValue)
            };
        });
    };
    AutoComplete.prototype.computeSuggestions = function (value) {
        var suggestions = [];
        for (var i = 0; i < this.state.userHistory.length; i++) {
            if (this.state.userHistory[i].substring(0, value.length - 1) === value) {
                suggestions.push(this.state.userHistory[i]);
            }
        }
        return suggestions;
    };
    AutoComplete.prototype.onSubmit = function (value) {
        this.setState(function (prevState) {
            return {
                userHistory: prevState.userHistory.concat([value])
            };
        });
    };
    AutoComplete.prototype.isActive = function () {
        return document.activeElement.id === this.state.id;
    };
    AutoComplete.prototype.onKeyUp = function (event) {
        if (this.isActive()) {
            if (event.keyCode === 38 && this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                this.setState(function (prevState) { return ({
                    selectedSuggestion: prevState.selectedSuggestion + 1
                }); });
            }
            else if (event.keyCode === 40 && this.state.selectedSuggestion >= 0) {
                this.setState(function (prevState) { return ({
                    selectedSuggestion: prevState.selectedSuggestion - 1
                }); });
            }
            else if (event.keyCode === 13 && this.state.selectedSuggestion > -1) {
                this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
            }
        }
    };
    AutoComplete.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { id: this.state.id, className: "auto-complete " + this.props.className, onKeyUp: this.onKeyUp },
            react_1.default.createElement("input", { className: 'auto-complete__input', placeholder: this.props.placeholder, type: 'text', value: this.props.value }),
            this.isActive() ?
                react_1.default.createElement("div", { className: 'auto-complete__suggestions' }, this.state.suggestions.map(function (suggestion, index) {
                    var className = 'auto-complete__suggestion';
                    if (index === _this.state.selectedSuggestion) {
                        className += ' selected';
                    }
                    return (react_1.default.createElement("div", { key: suggestion, className: className }, suggestion));
                }))
                :
                    undefined));
    };
    return AutoComplete;
}(react_1.default.Component));
exports.AutoComplete = AutoComplete;
exports.default = AutoComplete;
