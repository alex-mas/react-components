import React from 'react';
import { getTimeValues, TimePoint, getTimeAgo, TimeAgoPoint } from '../utils/time';

export interface TimeagoProps {
    time: number
}
export class Timeago extends React.Component<TimeagoProps, any> {
    render() {
        const timeP = getTimeAgo(this.props.time);
        return (
            <div className='axc-timeago'>
                <span className='axc-timeageo__time'>{timeP.time}</span>

                <span className='axc-timeago__text'>{timeP.text}</span>
            </div>
        );
    }
}