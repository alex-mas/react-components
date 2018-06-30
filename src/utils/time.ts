export interface TimePoint {
    hours: number,
    minutes: number,
    seconds: number
}


export const getTimeValues = (value: number): TimePoint => {
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



export interface TimeAgoPoint {
    time: number,
    text: string
}

export const getTimeAgo =(num: number): TimeAgoPoint=>{
    const givenTime: TimePoint = getTimeValues(num);
    let time: number;
    let text: string;
    if(givenTime.hours > 0){
        time = givenTime.hours;
        text = 'hours';
    }else if(givenTime.minutes > 0){
        time = givenTime.minutes;
        text = 'minutes';
    }else{
        time = givenTime.seconds;
        text = 'seconds';
    }
    return  {
        time,
        text
    }
}