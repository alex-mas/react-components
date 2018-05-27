/// <reference types="react" />
import React, { CSSProperties } from 'react';
export interface AutoCompleteProps {
    value: string;
    onChange(inputVal: string): any;
    predictionData?: string[];
    className?: string;
    placeholder?: string;
    id?: string;
    getSuggestions?(): string[];
    styles?: AutoCompleteStyles;
    useInlineStyles?: boolean;
}
export interface AutoCompleteState {
    userHistory: string[];
    predictionData: string[];
    suggestions: string[];
    selectedSuggestion: number;
    id: string;
    focused: boolean;
    styles: AutoCompleteStyles;
}
export interface AutoCompleteStyles {
    [key: string]: CSSProperties | undefined;
    autoComplete?: CSSProperties;
    autoComplete__input?: CSSProperties;
    autoComplete__suggestions?: CSSProperties;
    autoComplete__suggestion?: CSSProperties;
    autoComplete__suggestion_selected?: CSSProperties;
}
export declare class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
    constructor(props: AutoCompleteProps);
    onChange(event: React.ChangeEvent<any> | string): void;
    shouldAddSuggestion(value: string, suggestion: string, suggestions: string[]): boolean;
    computeSuggestions(value: string): string[];
    onSubmit(value: string): void;
    onKeyDown(event: React.KeyboardEvent<any>): void;
    onFocus(event: React.FocusEvent<any>): void;
    onBlur(event: React.FocusEvent<any>): void;
    render(): JSX.Element;
}
export default AutoComplete;
