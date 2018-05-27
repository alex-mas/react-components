import React, { CSSProperties } from 'react';
import uuid from 'uuid/v4';
const defaultPredictionData = ['hello', 'world', 'hello world', 'hey there', 'hello world program in c++', 'hello world program', 'stupidly long text stupidly long text stupidly long text stupidly long text'];

export interface AutoCompleteProps {
    value: string,
    onChange(inputVal: string): any,
    predictionData?: string[],
    className?: string,
    placeholder?: string,
    id?: string,
    getSuggestions?(): string[],
    styles?: AutoCompleteStyles,
    useInlineStyles?: boolean
}


export interface AutoCompleteState {
    userHistory: string[],
    predictionData: string[],
    suggestions: string[],
    selectedSuggestion: number,
    id: string,
    focused: boolean,
    styles: AutoCompleteStyles
}

export interface AutoCompleteStyles {
    [key: string]: CSSProperties | undefined,
    autoComplete?: CSSProperties,
    autoComplete__input?: CSSProperties,
    autoComplete__suggestions?: CSSProperties,
    autoComplete__suggestion?: CSSProperties,
    autoComplete__suggestion_selected?: CSSProperties
}

let defaultStyles: AutoCompleteStyles = {
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
}


export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState>{
    constructor(props: AutoCompleteProps) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : uuid(),
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
                        this.state.styles[key] = {
                            ...defaultStyles[key],
                            ...props.styles[key]
                        };
                    }
                }
            } else {
                for (let key in this.state.styles) {
                    if (this.state.styles.hasOwnProperty(key)) {
                        this.state.styles[key] = {
                            ...defaultStyles[key]
                        };
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
    onChange(event: React.ChangeEvent<any> | string) {
        let inputValue = '';
        if (typeof event === 'object') {
            inputValue = event.target.value;
        } else {
            inputValue = event;
        }
        this.setState(() => {
            let suggestions: string[];
            if (this.props.getSuggestions) {
                suggestions = this.props.getSuggestions();
            } else {
                suggestions = this.computeSuggestions(inputValue);
            }

            return {
                suggestions,
                selectedSuggestion: -1
            }
        });
        this.props.onChange(inputValue);
    }
    shouldAddSuggestion(value: string, suggestion: string, suggestions: string[]): boolean {
        return (
            suggestion.substring(0, value.length) === value &&
            suggestions.indexOf(suggestion) === -1 &&
            value !== suggestion
        );
    }
    computeSuggestions(value: string): string[] {
        const suggestions: string[] = [];
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
    onSubmit(value: string) {
        this.setState((prevState) => {
            return {
                userHistory: [...prevState.userHistory, value]
            }
        });
    }
    onKeyDown(event: React.KeyboardEvent<any>): void {
        if (this.state.focused) {
            if (event.keyCode === 40 && this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion + 1
                }));
            } else if (event.keyCode === 38 && this.state.selectedSuggestion > -1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion - 1
                }));
            } else if (event.keyCode === 13 && this.state.selectedSuggestion > -1) {
                this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
            } else if (event.keyCode === 27) {
                this.setState((prevState) => ({
                    selectedSuggestion: -1
                }));
            } else if (event.keyCode === 9 && this.state.selectedSuggestion > -1) {
                event.preventDefault();
                if (this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                    this.setState((prevState) => ({
                        selectedSuggestion: prevState.selectedSuggestion + 1
                    }));
                } else {
                    this.setState(() => ({
                        selectedSuggestion: 0
                    }));
                }
            }
        }
    }
    onFocus(event: React.FocusEvent<any>) {
        this.setState(() => ({
            focused: true
        }))
    }
    onBlur(event: React.FocusEvent<any>) {
        this.setState(() => ({
            focused: false
        }))
    }
    render() {
        let value = this.props.value;
        if (this.state.selectedSuggestion > -1) {
            value = this.state.suggestions[this.state.selectedSuggestion];
        }
        return (
            <div
                className={this.props.className ? this.props.className : undefined}
                onKeyDown={this.onKeyDown}
            >
                <div className='axc-auto-complete' style={this.state.styles.autoComplete}>
                    <input
                        id={this.state.id}
                        className='axc-auto-complete__input'
                        placeholder={this.props.placeholder}
                        type='text'
                        value={value}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        style={this.state.styles.autoComplete__input}
                    />
                    {this.state.focused ?
                        <div className='axc-auto-complete__suggestions' style={this.state.styles.autoComplete__suggestions}>
                            {this.state.suggestions.map((suggestion, index) => {
                                const selected = index === this.state.selectedSuggestion
                                let className = 'axc-auto-complete__suggestion';
                                if (selected) {
                                    className += '--selected';
                                }
                                return (
                                    <div
                                        key={suggestion}
                                        className={className}
                                        style={selected ?
                                            this.state.styles.autoComplete__suggestion_selected
                                            :
                                            this.state.styles.autoComplete__suggestion
                                        }
                                    >
                                        {suggestion}
                                    </div>
                                )

                            })}
                        </div>
                        :
                        undefined
                    }
                </div>
            </div>
        )
    }
}



export default AutoComplete;