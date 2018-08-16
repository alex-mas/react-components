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
//TODO: Make the number increment non linear or atleast let it depend on a prop
export class CountUp extends React.Component<CountUpProps, CountUpState>{
    constructor(props){
        super(props);
        this.state = {
            currentNumber: this.props.start,
            difference: this.props.end-this.props.start,
            stepInterval: setInterval(this.timeStep, this.props.timeStepDuration)
        };
    }
    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps.start !== this.props.start || nextProps.end !== this.props.end){
            this._resetState(nextProps);
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.stepInterval);

    }
    private _resetState = (nextProps)=>{
        this.setState((prevState)=>({
            currentNumber: nextProps.start,
            difference: nextProps.end-nextProps.start
        }));
    }
    timeStep = ()=>{
        if(this.state.currentNumber < this.props.end){
            this.setState((prevState)=>{
                    return{
                        ...prevState,
                        currentNumber: prevState.currentNumber+prevState.difference/this.props.timeSteps
                    }
            });
        }else{
            clearInterval(this.state.stepInterval);
        }

    }
    render(){
        return this.state.currentNumber;
    }
}


export default CountUp;