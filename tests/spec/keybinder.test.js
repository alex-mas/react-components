import React from 'react'
import { shallow, render, mount } from 'enzyme';
import KeyBinder from '../../dist/interactive/keyBinder';


test('Keybinder should render anything if not passed children', () => {
    const eHandler = jest.fn();
    const wrapper = mount(<KeyBinder keys={['0']} onTrigger={eHandler} />);
    expect(wrapper.contains(<div></div>)).toBe(false);
    expect(wrapper.isEmptyRender()).toBe(true);
});


test('KeyBinder should properly call the function provided when the key is pressed', () => {
    const eHandler = jest.fn();
    const wrapper = mount(<KeyBinder keys={['Tab']} onTrigger={eHandler} />, {attachTo: document.body});
    wrapper.simulate('keyup',{ key: 'Tab', keyCode: 9, which: 9 });
    wrapper.prop
    expect(eHandler).toHaveBeenCalled();
});



test('KeyBinder should render a div with the custom class passed', () => {
    const eHandler = jest.fn();
    const wrapper = mount(<KeyBinder keys={['0']} onTrigger={eHandler} className='binding' />);
    expect(wrapper.contains(<div className='binding'></div>));
});



test('KeyBinder should render a div with the provided children', () => {
    const eHandler = jest.fn();
    const MyElem = ()=>(
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