/// <reference types="node" />
/// <reference types="react" />
import React from 'react';
export interface TypeWriterProps {
    string: string;
    timePerCharacter?: number;
    variance?: number;
    preserve?: boolean;
    saveState?(state: TypeWriterState): void;
    savedState?: TypeWriterState;
}
export interface TypeWriterState {
    currentCharacter: number;
    displayString: string;
    timer: NodeJS.Timer;
}
export declare class TypeWriter extends React.Component<TypeWriterProps, TypeWriterState> {
    static defaultProps: TypeWriterProps;
    constructor(props: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    resetState: () => void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    getNextTimeDelay: () => number;
    renderCharacter: () => void;
    renderString: () => void;
    render(): string;
}
export default TypeWriter;
