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
}
export declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    state: CarouselState;
    constructor(props: CarouselProps);
    onElementChange(): void;
    next(): void;
    previous(): void;
    stopAutoPlay(): void;
    render(): JSX.Element;
}
export default Carousel;
