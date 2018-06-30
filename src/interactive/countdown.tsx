import React, { InputHTMLAttributes } from 'react';
import {getTimeValues, TimePoint} from  '../utils/time';

export enum CountdownStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    INACTIVE = 'INACTIVE',
    FINISHED = 'FINISHED'
}


export interface CountdownProps {
    onFinishCountdown?(): any
}

export interface CountdownState {
    status: CountdownStatus
    minutes: string,
    seconds: string,
    hours: string,
    remainingTime: number,
    interval?: NodeJS.Timer
}


export class Countdown extends React.Component<CountdownProps, CountdownState> {
    constructor(props) {
        super(props);
        this.state = {
            status: CountdownStatus.INACTIVE,
            minutes: '00',
            seconds: '00',
            hours: '0',
            remainingTime: 0
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
    validateTimeNumber = (stringVal: string, type: string | undefined): string | undefined => {
        const num = Number(stringVal);
        if (!Number.isNaN(num)) {
            switch (type) {
                case 'hours':
                    return stringVal;
                default:
                    if (num >= 0 && num < 60) {
                        if (num < 10) {
                            //check that the string contains a leading 0
                            if (stringVal.length > 1) {
                                return stringVal;
                            }
                        } else {
                            return stringVal;
                        }

                    }
            }
        }
        return undefined;
    }
    timeLoop = () => {
        if (this.state.status === CountdownStatus.ACTIVE) {
            if (this.state.remainingTime > 0) {
                this.setState((prevState) => ({
                    remainingTime: prevState.remainingTime - 1
                }));
            } else {
                this.props.onFinishCountdown();
                this.setState((prevState) => ({
                    status: CountdownStatus.FINISHED
                }));
            }
        }
    }
    onHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = this.validateTimeNumber(e.target.value, 'hours');
        if (hours) {
            this.setState(() => ({
                hours
            }));
        }

    }
    onMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minutes = this.validateTimeNumber(e.target.value, undefined);
        if (minutes) {
            this.setState(() => ({
                minutes
            }));
        }
    }
    onSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seconds = this.validateTimeNumber(e.target.value, undefined);
        if (seconds) {
            this.setState(() => ({
                seconds
            }));
        }
    }
    onToggle = (e) => {
        if (this.state.status === CountdownStatus.ACTIVE) {
            this.setState(() => ({
                status: CountdownStatus.PAUSED
            }));
        } else if (this.state.status !== CountdownStatus.FINISHED) {
            let remainingTime = this.state.remainingTime;
            if (remainingTime <= 0) {
                remainingTime = 3600 * Number(this.state.hours) + 60 * Number(this.state.minutes) + Number(this.state.seconds);
            }
            this.setState(() => ({
                status: CountdownStatus.ACTIVE,
                remainingTime
            }));
        }
    }
    onReset = (e) => {
        this.setState(() => ({
            remainingTime: 0,
            status: CountdownStatus.INACTIVE
        }));
    }
    renderInputForm: React.SFC<any> = () => {
        return (
            <div className='axc-countdown__container'>
                <span className='axc-countdown__label'>
                    Hours
                </span>
                <input
                    className='axc-countdown__input'
                    type="string"
                    value={this.state.hours}
                    onChange={this.onHoursChange}
                />
                <span className='axc-countdown__label'>
                    Minutes
                </span>
                <input
                    className='axc-countdown__input'
                    type="string"
                    value={this.state.minutes}
                    onChange={this.onMinutesChange}
                />
                <span className='axc-countdown__label'>
                    Seconds
                </span>
                <input
                    className='axc-countdown__input'
                    type="string"
                    value={this.state.seconds}
                    onChange={this.onSecondsChange}
                />
            </div>
        );
    }
    renderCountdown: React.SFC<any> = () => {
        const time: TimePoint = getTimeValues(this.state.remainingTime);
        return (
            <div className='axc-countdown__container'>
                <span className='axc-countdown__number'>
                    {time.hours}
                </span>
                <span className='axc-countdown__separator'>
                    :
                </span>
                <span className='axc-countdown__number'>
                    {time.minutes < 10 ? '0' + time.minutes : time.minutes}
                </span>
                <span className='axc-countdown__separator'>
                    :
                </span>
                <span className='axc-countdown__number'>
                    {time.seconds < 10 ? '0' + time.seconds : time.seconds}
                </span>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.state.status === CountdownStatus.INACTIVE ?
                    <this.renderInputForm />
                    :
                    <this.renderCountdown />
                }
                <div className='axc-countdown__actions'>
                    <button  className='axc-countdown__action--toggle' onClick={this.onToggle}>{this.state.status === CountdownStatus.ACTIVE ? 'Pause' : 'Start'}</button>
                    <button className='axc-countdown__action--reset' onClick={this.onReset}>Reset</button>
                </div>
            </div>
        )
    }

}


export default Countdown;