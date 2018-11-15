import React from 'react'
import { shallow, render, mount } from 'enzyme'
import PhoneNumber from '../../dist/display/phoneNumber';


test('PhoneNumber should render null if no number is passed', () => {
    const wrapper = shallow(<PhoneNumber/>);
    expect(wrapper.isEmptyRender()).toBe(true);
});


test('PhoneNumber shouldn\'t render null if passed a number and no method', () => {
    const wrapper = shallow(<PhoneNumber number={999999999}/>);
    expect(wrapper.isEmptyRender()).toBe(false);
});

test('PhoneNumber should by default render with spaces between each sequence of three numbers',()=>{
    const wrapper = mount(<PhoneNumber number={999999999}/>);
    const separators = wrapper.find('.axc__phone-num__separator');
    expect(separators.length).toBe(2);
    for(let i = 0; i < 2; i++){
        expect(separators.at(i).text()).toBe(' ');
    }
});

test('PhoneNumber should render with spaces between each sequence of three numbers if the separator string is a white space ',()=>{
    const wrapper = mount(<PhoneNumber number={999999999} separator=' '/>);
    const separators = wrapper.find('.axc__phone-num__separator');
    expect(separators.length).toBe(2);
    for(let i = 0; i < 2; i++){
        expect(separators.at(i).text()).toBe(' ');
    }
});

test('PhoneNumber should render with dashes between each sequence of three numbers if the separator string is a dash ',()=>{
    const wrapper = mount(<PhoneNumber number={999999999} separator='-'/>);
    const separators = wrapper.find('.axc__phone-num__separator');
    expect(separators.length).toBe(2);
    for(let i = 0; i < 2; i++){
        expect(separators.at(i).text()).toBe('-');
    }
});

test('PhoneNumber should render white space spans with the custom provided class if spearatorClass is provided and separator is not',()=>{
    const wrapper = mount(<PhoneNumber number={999999999} separatorClass='myCustomSeparator'/>);
    const separators = wrapper.find('.myCustomSeparator');
    expect(separators.length).toBe(2);
    for(let i = 0; i < 2; i++){
        expect(separators.at(i).text()).toBe(' ');
    }
});