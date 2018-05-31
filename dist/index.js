"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Here we import and export all components
const autoComplete_1 = __importDefault(require("./autoComplete"));
const carousel_1 = __importDefault(require("./carousel"));
const modal_1 = __importDefault(require("./modal"));
const browserRouter_1 = __importDefault(require("./browserRouter"));
const typeWriter_1 = __importDefault(require("./typeWriter"));
const router_1 = __importDefault(require("./router"));
const AlexComponents = {
    AutoComplete: autoComplete_1.default,
    Carousels: carousel_1.default,
    Modal: modal_1.default,
    Router: router_1.default,
    TypeWritter: typeWriter_1.default,
    BrowserRouter: browserRouter_1.default
};
exports.default = AlexComponents;
