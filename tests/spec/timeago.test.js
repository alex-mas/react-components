import React from 'react'
import { shallow, render, mount } from 'enzyme'
import TimeAgo from '../../dist/timeago';


test('TimeAgo should properly render 1 second', () => {
    let wrapper = mount(
        <TimeAgo
            time={1}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('1 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('second ago');
});


test('TimeAgo should properly render 15 seconds', () => {
    let wrapper = mount(
        <TimeAgo
            time={15}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('15 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('seconds ago');
});



test('TimeAgo should properly render 1 minute', () => {
    let wrapper = mount(
        <TimeAgo
            time={60}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('1 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('minute ago');
});


test('TimeAgo should properly render 2 minutes', () => {
    let wrapper = mount(
        <TimeAgo
            time={120}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('2 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('minutes ago');
});


test('TimeAgo should properly render 1.5 hours', () => {
    let wrapper = mount(
        <TimeAgo
            time={5400}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('1 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('hour ago');
});


test('TimeAgo should properly render 2 hours', () => {
    let wrapper = mount(
        <TimeAgo
            time={7200}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('2 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('hours ago');
});



test('TimeAgo should properly render 2 hours when passed the value as milliseconds', () => {
    let wrapper = mount(
        <TimeAgo
            time={7200000}
            ms={true}
        />
    );
    expect(wrapper.find('.axc-timeago__time').text()).toEqual('2 ');
    expect(wrapper.find('.axc-timeago__text').text()).toEqual('hours ago');
});
