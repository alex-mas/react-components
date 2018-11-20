import React from 'react';
import EasingFunctions from './utils/easing';



export interface CountUpProps {
    start: number,
    end: number
    timeSteps: number,
    timeStepDuration:number,
    easingFunction: string
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
    getEasingValue = (current, steps)=>{
        const progress = EasingFunctions[this.props.easingFunction](current/steps);
        return this.props.start + (this.props.end-this.props.end)*progress;
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
        return this.getEasingValue( this.state.currentStep, this.props.timeSteps);
    }
}


export default CountUp;