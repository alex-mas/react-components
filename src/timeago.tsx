import React from 'react';
import { getTimeValues, TimePoint, getTimeAgo, TimeAgoPoint } from './utils/time';

export interface TimeAgoProps {
    time: number,
    ms: boolean,
    isTimePoint: boolean
}
export interface TimeAgoState {
    interval?: any,
    timeP: number
};

//TODO: Get rid of getting derived state from props
export class TimeAgo extends React.PureComponent<TimeAgoProps, any> {
    constructor(props){
        super(props);
        let timeP: TimeAgoPoint;
        if (this.props.isTimePoint) {
            timeP = getTimeAgo(Date.now() - this.props.time, true);
        } else {
            timeP = getTimeAgo(this.props.time, this.props.ms);
        }
        this.state = {
            timeP
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.time !== prevProps.time){
            this.updateTime();
        }
    }
    updateTime = ()=>{
        this.setState(()=>({
            timeP: getTimeAgo(Date.now() - this.props.time, true)
        }));
    }
    componentDidMount (){
        if(this.props.isTimePoint){
            const interval = setInterval(this.updateTime, 1000);
            this.setState(()=>({
                interval
            }));
        }
    }
    componentWillUnmount (){
        if(this.state.interval){
            clearInterval(this.state.interval);
        }
    } 
    render() {
        return (
            <span className='axc-timeago'>
                <span className='axc-timeago__time'>{this.state.timeP.time} </span>
                <span className='axc-timeago__text'>{this.state.timeP.text} ago</span>
            </span>
        );
    }
};



export default TimeAgo