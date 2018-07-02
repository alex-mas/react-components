import {getTimeAgom, getTimeValues} from '../../dist/utils/time';

test('getTimeValues should properly return 1 second when passed 1000 milliseconds',()=>{
    expect(getTimeValues(1000, true)).toEqual({
        hours: 0,
        minutes: 0,
        seconds: 1
    });
});

test('getTimeValues should properly return 1 minute and 1 second when passed 61000 milliseconds',()=>{
    expect(getTimeValues(61000, true)).toEqual({
        hours: 0,
        minutes: 1,
        seconds: 1
    });
});
 

test('getTimeValues should properly return 1 hour 1 minute and 1 second when passed 3661000 milliseconds',()=>{
    expect(getTimeValues(3661000, true)).toEqual({
        hours: 1,
        minutes: 1,
        seconds: 1
    });
});
 



test('getTimeValues should properly return 1 second when passed 1 ',()=>{
    expect(getTimeValues(1)).toEqual({
        hours: 0,
        minutes: 0, 
        seconds: 1
    });
});

test('getTimeValues should properly return 1 minute and 1 second when passed 61',()=>{
    expect(getTimeValues(61)).toEqual({
        hours: 0,
        minutes: 1,
        seconds: 1
    });
});
 

test('getTimeValues should properly return 1 hour 1 minute and 1 second when passed 3661',()=>{
    expect(getTimeValues(3661)).toEqual({
        hours: 1,
        minutes: 1,
        seconds: 1
    });
});
 