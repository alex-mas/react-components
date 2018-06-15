import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Dialog from '../../dist/layout/dialog'


test('Dialog should crash if not passed any option', () => {
    const onClose = jest.fn();
    expect(()=>{
        let wrapper = shallow(
            <Dialog
                isOpen={false}
                onClose={onClose}
            >
                <div>
                    this should not render at all
                </div>
            </Dialog>
        );
    }).toThrow();
});


test('Dialog should not render anything if isOpen is false', () => {
    const onClose = jest.fn();
    let wrapper = shallow(
        <Dialog
            isOpen={false}
            onClose={onClose}
            options={["first optipon","second option"]}
        >
            <div id="dialog__content">
                this should not render at all
            </div>
        </Dialog>
    );
    expect(wrapper.find).toMatchSnapshot();
    expect(wrapper.find("#dialog__content").exists()).toEqual(false);
});