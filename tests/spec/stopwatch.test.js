import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Stopwatch from '../../dist/interactive/stopwatch';


test('Constructing it should render a timer with zeroed values if no start prop is provided', () => {
    const wrapper = mount(<Stopwatch />);
    const element = wrapper.find('.axc-stopwatch__number');
    expect(element.at(0).text()).toEqual('0');
    expect(element.at(1).text()).toEqual('00');
    expect(element.at(2).text()).toEqual('00');
});


test('Constructing it with 5555 seconds should render a timer with 1 hour, 32 minutes and 35 seconds', () => {
    const wrapper = mount(<Stopwatch start={5555} />);
    const element = wrapper.find('.axc-stopwatch__number');
    expect(element.at(0).text()).toEqual('1');
    expect(element.at(1).text()).toEqual('32');
    expect(element.at(2).text()).toEqual('35');
});



test('The value rendered should increase over time when activated explicitly', () => {
    const wrapper = mount(<Stopwatch start={5555} />);
    wrapper.find('.axc-stopwatch__action--toggle').simulate('click');
    const element = wrapper.find('.axc-stopwatch__number');
    expect(element.at(2).text()).toEqual('35');
    setTimeout(() => {
        expect(element.at(2).text() == 37).toEqual(true);
    }, 2500);
});


test('The value rendered shouldn\'t increase over time if not activated', () => {
    const wrapper = mount(<Stopwatch start={5555} />);
    const element = wrapper.find('.axc-stopwatch__number');
    expect(element.at(2).text()).toEqual('35');
    setTimeout(() => {
        expect(element.at(2).text()).toEqual('35');
    }, 2500);
});


test('The value of the stopwatch after being reset should be 1 hour, 32 minutes and 35 seconds', () => {
    const wrapper = mount(<Stopwatch start={5555} />);
    const element = wrapper.find('.axc-stopwatch__number');
    wrapper.find('.axc-stopwatch__action--toggle').simulate('click');
    setTimeout(() => {
        wrapper.find('axc-stopwatch__action--reset').simulate('click');
        setTimeout(() => {
            expect(element.at(0).text()).toEqual('1');
            expect(element.at(1).text()).toEqual('32');
            expect(element.at(2).text()).toEqual('35');
        }, 250);
    }, 3500);
});


