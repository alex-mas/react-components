"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Here we import and export all components
const autoComplete_1 = __importDefault(require("./autoComplete"));
const carousel_1 = __importDefault(require("./carousel"));
const modal_1 = __importDefault(require("./modal"));
exports.default = {
    AutoComplete: autoComplete_1.default,
    Carousel: carousel_1.default,
    Modal: modal_1.default
};
