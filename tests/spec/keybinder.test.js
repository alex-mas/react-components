import React from 'react'
import { shallow, render, mount } from 'enzyme';
import KeyBinder from '../../dist/keyBinder';


test('Keybinder should render anything if not passed children', () => {
    const eHandler = jest.fn();
    const wrapper = mount(<KeyBinder keys={['0']} onTrigger={eHandler} />);
    expect(wrapper.contains(<div></div>)).toBe(false);
    expect(wrapper.isEmptyRender()).toBe(true);
});


test('KeyBinder should properly call the function provided when the key is pressed', () => {
    //mocking window addEventListener interface with jest functions;
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
    });
    const eHandler = jest.fn();
    const getComp = () => {
        return (
            <div>
                <KeyBinder keys={['Tab']} onTrigger={eHandler} />
            </div>
        )
    }
    const wrapper = mount(getComp());
    map.keyup({ key: 'Tab', keyCode: 9, which: 9 });
    expect(eHandler).toHaveBeenCalled();
});



test('KeyBinder should render a div with the custom class passed', () => {
    const eHandler = jest.fn();
    const wrapper = mount(<KeyBinder keys={['0']} onTrigger={eHandler} className='binding' />);
    expect(wrapper.contains(<div className='binding'></div>));
});



test('KeyBinder should render a div with the provided children', () => {
    const eHandler = jest.fn();
    const MyElem = () => (
        <div>
            Hello World
        </div>
    )
    const wrapper = mount(
        <KeyBinder keys={['0']} onTrigger={eHandler} className='binding'>
            <MyElem />
        </KeyBinder>
    );
    expect(wrapper.contains(<div className='binding'><MyElem /></div>));
});