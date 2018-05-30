"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class BrowserHistory {
    constructor(initialValue) {
        this.back = () => {
            if (this.currentPosition > 0) {
                this.currentPosition--;
            }
        };
        this.forward = () => {
            if (this.currentPosition < this.values.length - 1) {
                this.currentPosition++;
            }
        };
        this.pushState = (newNode) => {
            console.log('pushing new state');
            this.values.push(newNode);
            this.currentPosition = this.values.length - 1;
            console.log(this.location());
        };
        this.location = () => {
            return this.values[this.currentPosition];
        };
        this.editState = (editedNode) => {
            this.values[this.values.length - 1] = Object.assign({}, this.values[this.values.length - 1], editedNode);
        };
        this.values = [initialValue];
        this.currentPosition = 0;
    }
}
exports.BrowserHistory = BrowserHistory;
exports.History = react_1.default.createContext(new BrowserHistory({ path: '/', title: document.title }));
exports.default = BrowserHistory;
