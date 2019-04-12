import React from 'react';
import ProgressBar from './progressBar';


export interface TimedProgressBarProps {
    containerClass?: string,
    barClass?: string,
    duration:number,
}

export interface TimedProgressBarState {
    currentProgress: number,
    intervalId: NodeJS.Timer,
    lastUpdated: number
}

export class TimedProgressBar extends React.Component<TimedProgressBarProps, TimedProgressBarState>{
    constructor(props){
        super(props);
        this.state = {
            currentProgress: 0,
            intervalId: undefined,
            lastUpdated: undefined
        };
    }
    updateProgressBar = ()=>{
        this.setState((prevState)=>{
            const now = Date.now();
            const dt = now -prevState.lastUpdated;
            if(prevState.currentProgress > 100){
                clearInterval(prevState.intervalId);
                return{
                    ...prevState,
                    intervalId: undefined,
                    lastUpdated: now
                };
            }else{
                return{
                    ...prevState,
                    currentProgress: prevState.currentProgress + (dt/this.props.duration)*100,
                    lastUpdated: now,
                }
            }

        })
    }
    componentDidMount(){
        this.setState(()=>({
            intervalId: setInterval(this.updateProgressBar, 16.666),
            lastUpdated: Date.now()
        }));
    }
    render() {
        return (
            <ProgressBar
                containerClass={this.props.containerClass}
                barClass={this.props.barClass}
                progress={this.state.currentProgress}
            />
        );
    }
}


export default TimedProgressBar;