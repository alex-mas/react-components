import React, { InputHTMLAttributes } from 'react';


export enum StopwatchStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    INACTIVE = 'INACTIVE',
    FINISHED = 'FINISHED'
}


export interface StopwatchProps {
    start?: number
}

export interface StopwatchState {
    status: StopwatchStatus
    currentTime: number,
    interval?: NodeJS.Timer
}

export interface TimePoint {
    hours: number,
    minutes: number,
    seconds: number
}

export class Stopwatch extends React.Component<StopwatchProps, StopwatchState> {
    public static defaultProps: Partial<StopwatchProps> = {
        start: 0
    }
    constructor(props) {
        super(props);
        this.state = {
            status: StopwatchStatus.INACTIVE,
            currentTime: props.start
        };
    }
    componentWillMount() {
        this.setState(() => ({
            interval: setInterval(this.timeLoop, 1000)
        }));
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    timeLoop = () => {
        if (this.state.status === StopwatchStatus.ACTIVE) {
            this.setState((prevState) => ({
                currentTime: prevState.currentTime + 1
            }));
        }
    }
    onToggle = (e) => {
        if (this.state.status === StopwatchStatus.ACTIVE) {
            this.setState(() => ({
                status: StopwatchStatus.PAUSED
            }));
        } else if (this.state.status !== StopwatchStatus.FINISHED) {
            this.setState(() => ({
                status: StopwatchStatus.ACTIVE
            }));
        }
    }
    onReset = (e) => {
        this.setState(() => ({
            currentTime: this.props.start,
            status: StopwatchStatus.INACTIVE
        }));
    }
    getTimeValues = (value: number): TimePoint => {
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        hours = Math.floor(value / 3600);
        value -= hours * 3600;

        minutes = Math.floor(value / 60);
        value -= 60 * minutes;

        seconds = value;

        return {
            hours,
            minutes,
            seconds
        };
    }
    renderTime: React.SFC<any> = () => {
        const time: TimePoint = this.getTimeValues(this.state.currentTime);
        return (
            <div className='axc-stopwatch__container'>
                <span className='axc-stopwatch__number'>
                    {time.hours}
                </span>
                <span className='axc-stopwatch__separator'>
                    :
                </span>
                <span className='axc-stopwatch__number'>
                    {time.minutes < 10 ? '0' + time.minutes : time.minutes}
                </span>
                <span className='axc-stopwatch__separator'>
                    :
                </span>
                <span className='axc-stopwatch__number'>
                    {time.seconds < 10 ? '0' + time.seconds : time.seconds}
                </span>
            </div>
        )
    }
    render() {
        return (
            <div>
                <this.renderTime />
                <div className='axc-stopwatch__actions'>
                    <button onClick={this.onToggle}>{this.state.status === StopwatchStatus.ACTIVE ? 'Pause' : 'Start'}</button>
                    <button onClick={this.onReset}>Reset</button>
                </div>
            </div>
        )
    }

}


export default Stopwatch;