import React from 'react';
import uuid from 'uuid/v4';
const defaultPredictionData = ['hello', 'world'];

export interface AutoCompleteProps {
    value: string,
    onChange(inputVal: string): any,
    predictionData: string[] | undefined,
    className: string | undefined,
    placeholder: string | undefined,
    id: string | undefined
}

export interface AutoCompleteState {
    userHistory: string[],
    predictionData: string[],
    suggestions: string[],
    selectedSuggestion: number,
    id: string
}

export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState>{
    constructor(props: AutoCompleteProps) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : uuid(),
            userHistory: [],
            predictionData: props.predictionData ? props.predictionData : defaultPredictionData,
            suggestions: [],
            selectedSuggestion: -1
        }
    }
    onChange(inputValue: string) {
        this.props.onChange(inputValue);
        this.setState(() => {
            return {
                suggestions: this.computeSuggestions(inputValue)
            }
        })
    }
    computeSuggestions(value: string): string[] {
        const suggestions: string[] = [];
        for (let i = 0; i < this.state.userHistory.length; i++) {
            if (this.state.userHistory[i].substring(0, value.length - 1) === value) {
                suggestions.push(this.state.userHistory[i]);
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
    isActive(): boolean {
        return document.activeElement.id === this.state.id;
    }
    onKeyUp(event: React.KeyboardEvent<any>): void {
        if (this.isActive()) {
            if(event.keyCode === 38 && this.state.selectedSuggestion < this.state.suggestions.length-1){
                this.setState((prevState)=>({
                    selectedSuggestion: prevState.selectedSuggestion+1
                }));
            }else if(event.keyCode === 40 && this.state.selectedSuggestion >= 0){
                this.setState((prevState)=>({
                    selectedSuggestion: prevState.selectedSuggestion-1
                }));
            }else if(event.keyCode === 13 && this.state.selectedSuggestion > -1){
                this.onChange(this.state.suggestions[this.state.selectedSuggestion]);
            }
        }
    }
    render() {
        return (
            <div
                id={this.state.id}
                className={`auto-complete ${this.props.className}`}
                onKeyUp={this.onKeyUp}
            >
                <input
                    className='auto-complete__input'
                    placeholder={this.props.placeholder}
                    type='text'
                    value={this.props.value}
                />
                {this.isActive() ?
                    <div className='auto-complete__suggestions'>
                        {this.state.suggestions.map((suggestion, index) => {
                            let className = 'auto-complete__suggestion';
                            if(index === this.state.selectedSuggestion){
                                className+= ' selected';
                            }
                            return (
                                <div key={suggestion} className={className}>
                                    {suggestion}
                                </div>
                            )

                        })}
                    </div>
                    :
                    undefined
                }


            </div>
        )
    }

}


export default AutoComplete;