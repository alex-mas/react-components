import React from 'react';




export interface CountUpProps {
    start: number,
    end: number
    timeSteps: number,
    timeStepDuration:number
}

export interface CountUpState {
    currentNumber: number,
    difference: number,
    stepInterval: any
}

export class CountUp extends React.Component<CountUpProps, CountUpState>{
    constructor(props){
        super(props);
        this.state = {
            currentNumber: this.props.start,
            difference: this.props.end-this.props.start,
            stepInterval: setInterval(this.timeStep, this.props.timeStepDuration)
        };
    }
    timeStep = ()=>{
        this.setState((prevState)=>{
            if(this.props.end > this.props.start){
                return{
                    ...prevState,
                    currentNumber: prevState.currentNumber+this.state.difference/this.props.timeSteps
                }
            }else{
                clearInterval(this.state.stepInterval);
                return prevState;
            }

        })
    }
    render(){
        return this.state.currentNumber;
    }
}


export default CountUp;