import React from 'react';
import EasingFunctions from './utils/easing';



export interface CountUpProps {
    start: number,
    end: number
    timeSteps: number,
    timeStepDuration:number,
    easingFunction: string,
    decimalPlaces?: number
}

export interface CountUpState {
    currentStep: number,
    stepInterval: any,
}

export class CountUp extends React.Component<CountUpProps, CountUpState>{
    constructor(props){
        super(props);
        this.state = {
            stepInterval: setInterval(this.timeStep, this.props.timeStepDuration),
            currentStep: 0
        };
    }
    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps.start !== this.props.start || nextProps.end !== this.props.end){
            this.reset(nextProps);
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.stepInterval);

    }
    reset = (nextProps)=>{
        this.setState((prevState)=>({
            currentStep: 0,
        }));
    }
    getEasingValue = (current: number, steps: number, decimals?: number)=>{
        let progress;
        if(!EasingFunctions[this.props.easingFunction]){
            progress = EasingFunctions.linear(current/steps);
        }else{
            progress = EasingFunctions[this.props.easingFunction](current/steps);
        }
        const value = this.props.start + Math.abs((this.props.end-this.props.start))*progress;
        if(decimals && decimals >=0){
            return value.toFixed(decimals);
        }else{
            return value.toFixed(2);
        }
    }
    timeStep = ()=>{
        if(this.state.currentStep< this.props.timeSteps){
            this.setState((prevState)=>{
                    return{
                        ...prevState,
                        currentStep: prevState.currentStep+1
                    }
            });
        }else{
            clearInterval(this.state.stepInterval);
        }

    }
    render(){
        return this.getEasingValue( this.state.currentStep, this.props.timeSteps, this.props.decimalPlaces);
    }
}


export default CountUp;