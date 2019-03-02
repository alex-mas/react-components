import React, { CSSProperties } from 'react';
import uuid from 'uuid/v4';

export interface AutoCompleteProps {
    value: string,
    onChange(inputVal: string): any,
    onSubmit?(value: string): any,
    suggestions?: string[],
    className?: string,
    placeholder?: string,
    id?: string,
    getSuggestions?(inputVal: string): string[]
}


export interface AutoCompleteState {
    suggestions: string[],
    selectedSuggestion: number,
    focused: boolean,
    shouldRenderSuggestions: boolean
}




interface SuggestionProps {
    value: string,
    index: number,
    style?: CSSProperties,
    onClick(suggestionIndex: number): any,
    onHover(suggestionIndex: number): any,
    className: string
}

class Suggestion extends React.PureComponent<SuggestionProps, any>{
    onClick = (event: React.MouseEvent<any>) => {
        this.props.onClick(this.props.index);
    }
    onMouseEnter = (event: React.MouseEvent<any>) => {
        this.props.onHover(this.props.index);
    }
    render() {
        return (
            <div
                className={this.props.className}
                style={this.props.style}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
            >
                {this.props.value}
            </div>
        )

    }

}


export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState>{
    static defaultProps: Partial<AutoCompleteProps> = {
        suggestions: []
    };
    private id: string;
    constructor(props: AutoCompleteProps) {
        super(props);
        this.state = {
            suggestions: [],
            selectedSuggestion: -1,
            focused: false,
            shouldRenderSuggestions: true
        };
        this.onChange = this.onChange.bind(this);
        this.computeSuggestions = this.computeSuggestions.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.id = uuid();
    }

    shouldComponentUpdate(nextProps: AutoCompleteProps, nextState: AutoCompleteState) {
        if (
            nextProps.value !== this.props.value ||
            nextState.focused !== this.state.focused ||
            nextState.selectedSuggestion !== this.state.selectedSuggestion ||
            nextState.suggestions.length || this.state.suggestions.length
        ) {
            return true;
        } else {
            return false;
        }
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
                suggestions = this.props.getSuggestions(inputValue);
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
            value && value.length &&
            suggestion.substring(0, value.length).toLocaleLowerCase() === value.toLocaleLowerCase() &&
            suggestions.indexOf(suggestion) === -1 &&
            value !== suggestion
        );
    }
    computeSuggestions(value: string): string[] {
        const matchingSuggestions: string[] = [];
        for (let i = 0; i < this.props.suggestions.length; i++) {
            if (this.shouldAddSuggestion(value, this.props.suggestions[i], matchingSuggestions)) {
                matchingSuggestions.push(this.props.suggestions[i]);
            }
        }
        return matchingSuggestions;
    }
    onClickSuggestion = (suggestionIndex: number) => {
        this.onChange(this.state.suggestions[suggestionIndex]);
    }
    onHoverSuggestion = (suggestionIndex: number) => {
        this.setState((prevState) => ({
            selectedSuggestion: suggestionIndex
        }));
    }
    onKeyDown(event: React.KeyboardEvent<any>): void {
        if (this.state.focused) {
            //key down
            if (event.keyCode === 40 && this.state.selectedSuggestion < this.state.suggestions.length - 1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion + 1
                }));
                //key up
            } else if (event.keyCode === 38 && this.state.selectedSuggestion > -1) {
                this.setState((prevState) => ({
                    selectedSuggestion: prevState.selectedSuggestion - 1
                }));
                //enter key
            } else if (event.keyCode === 13) {
                if (this.state.selectedSuggestion > -1) {
                    this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
                    this.setState((prevState) => ({
                        shouldRenderSuggestions: false
                    }));
                    if (this.props.onSubmit) {
                        this.props.onSubmit(this.state.suggestions[this.state.selectedSuggestion]);
                    }

                } else {
                    if (this.props.onSubmit) {
                        this.props.onSubmit(this.props.value);
                    }
                }
                //esc key
            } else if (event.keyCode === 27) {
                this.setState((prevState) => ({
                    selectedSuggestion: -1,
                    shouldRenderSuggestions: false
                }));
                //tab key
            } else if (event.keyCode === 9 /*&& this.state.selectedSuggestion > -1*/ && this.state.shouldRenderSuggestions) {
                if (this.state.suggestions.length > 0) {
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
            } else {
                this.setState(() => ({
                    shouldRenderSuggestions: true
                }));
            }
        } else {
            //event.preventDefault();
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
        let id = this.props.id ? this.props.id : this.id;
        let value: string = this.props.value;
        if (this.state.selectedSuggestion > -1) {
            value = this.state.suggestions[this.state.selectedSuggestion];
        }
        return (
            <div
                className={this.props.className ? this.props.className : undefined}
                onKeyDown={this.onKeyDown}
            >
                <div
                    id={id}
                    className='axc-auto-complete'
                >
                    <input
                        className='axc-auto-complete__input'
                        placeholder={this.props.placeholder}
                        type='text'
                        value={value}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                    />
                    {this.state.focused && this.state.shouldRenderSuggestions ?
                        <div className='axc-auto-complete__suggestions'>
                            {this.state.suggestions.map((suggestion: string, index: number) => {
                                const selected: boolean = index === this.state.selectedSuggestion
                                let className: string = 'axc-auto-complete__suggestion';
                                if (selected) {
                                    className += '--selected';
                                }
                                return (
                                    <Suggestion
                                        key={suggestion}
                                        value={suggestion}
                                        className={className}
                                        index={index}
                                        onClick={this.onClickSuggestion}
                                        onHover={this.onHoverSuggestion}
                                    />
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