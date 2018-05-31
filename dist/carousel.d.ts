/// <reference types="node" />
/// <reference types="react" />
import React from 'react';
export interface CarouselState {
    activeElement: number;
    intervalHandle?: NodeJS.Timer;
}
export interface CarouselProps {
    children?: any;
    startingElement?: number;
    autoPlay?: number;
    onElementChange?(currentElement: number): any;
    captions?: React.ComponentClass | React.SFCFactory<any>;
}
export declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    state: CarouselState;
    constructor(props: CarouselProps);
    onElementChange(): void;
    boundsChecked(num: number): number;
    next(): void;
    previous(): void;
    stopAutoPlay(): void;
    render(): JSX.Element;
}
export declare class LinkedCarousel extends Carousel {
    setElement(element: any): void;
    render(): JSX.Element;
}
declare const _default: {
    Carousel: typeof Carousel;
    LinkedCarousel: typeof LinkedCarousel;
};
export default _default;
