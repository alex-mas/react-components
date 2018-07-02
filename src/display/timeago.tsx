import React from 'react';
import { getTimeValues, TimePoint, getTimeAgo, TimeAgoPoint } from '../utils/time';

export interface TimeAgoProps {
    time: number,
    ms: boolean
}
export class TimeAgo extends React.Component<TimeAgoProps, any> {
    render() {
        const timeP: TimeAgoPoint = getTimeAgo(this.props.time, this.props.ms);
        return (
            <div className='axc-timeago'>
                <span className='axc-timeago__time'>{timeP.time} </span>
                <span className='axc-timeago__text'>{timeP.text} ago</span>
            </div>
        );
    }
}


export default TimeAgo