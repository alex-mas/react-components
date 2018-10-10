import React, { CSSProperties } from 'react';
import uuid from 'uuid/v4';

const defaultPredictionData: string[] = [];


export interface AutoCompleteProps {
    value: string,
    onChange(inputVal: string): any,
    predictionData?: string[],
    className?: string,
    placeholder?: string,
    id?: string,
    getSuggestions?(inputVal: string): string[],
    styles?: AutoCompleteStyles,
    useInlineStyles?: boolean
}


export interface AutoCompleteState {
    predictionData: string[],
    suggestions: string[],
    selectedSuggestion: number,
    id: string,
    focused: boolean,
    shouldRenderSuggestions: boolean,
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


interface SuggestionProps {
    value: string,
    index: number,
    style?: CSSProperties,
    onClick(suggestionIndex: number): any,
    onHover(suggestionIndex: number): any,
    className: string
}

class Suggestion extends React.PureComponent<SuggestionProps, any>{
    onClick = (event: React.MouseEvent<any>)=>{
        this.props.onClick(this.props.index);
    }
    onMouseEnter = (event: React.MouseEvent<any>)=>{
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
    constructor(props: AutoCompleteProps) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : uuid(),
            predictionData: props.predictionData ? props.predictionData : defaultPredictionData,
            suggestions: [],
            selectedSuggestion: -1,
            focused: false,
            shouldRenderSuggestions: true,
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
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
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
            suggestion.substring(0, value.length) === value &&
            suggestions.indexOf(suggestion) === -1 &&
            value !== suggestion
        );
    }
    computeSuggestions(value: string): string[] {
        const suggestions: string[] = [];
        for (let i = 0; i < this.state.predictionData.length; i++) {
            if (this.shouldAddSuggestion(value, this.state.predictionData[i], suggestions)) {
                suggestions.push(this.state.predictionData[i]);
            }
        }
        return suggestions;
    }
    onClickSuggestion = (suggestionIndex: number) => {
        console.log('clicked a suggestion, changing the value');
        this.onChange(this.state.suggestions[suggestionIndex]);
    }
    onHoverSuggestion = (suggestionIndex: number)=>{
        console.log('hovered over a suggestion, changing the selected suggestion');
        this.setState((prevState) => ({
            selectedSuggestion: suggestionIndex
        }));
    }
    onKeyDown(event: React.KeyboardEvent<any>): void {
        console.log('handling key down events', event);
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
            } else if (event.keyCode === 13 && this.state.selectedSuggestion > -1) {
                this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
                this.setState((prevState)=>({
                    shouldRenderSuggestions: false
                }));
            //esc key
            } else if (event.keyCode === 27) {
                this.setState((prevState) => ({
                    selectedSuggestion: -1,
                    shouldRenderSuggestions: false
                }));
            //tab key
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
            }else{
                this.setState(()=>({
                    shouldRenderSuggestions: true
                }));
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
        let value: string = this.props.value;
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
                    {this.state.focused && this.state.shouldRenderSuggestions ?
                        <div className='axc-auto-complete__suggestions' style={this.state.styles.autoComplete__suggestions}>
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
                                        style={selected ?
                                            this.state.styles.autoComplete__suggestion_selected
                                            :
                                            this.state.styles.autoComplete__suggestion
                                        }
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