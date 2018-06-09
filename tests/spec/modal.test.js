import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Modal from '../../dist/layout/modal'


test('Modal should return null when passed false to isOpen prop', () => {
    let wrapper = shallow(
        <Modal
            isOpen={false}
            onClose={jest.fn()}
        >
            <div>
                this should not render at all
                </div>
        </Modal>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.getElement()).toEqual(null);
});


test('Modal should render properly when passed true to isOpen prop', () => {
    const child = (
        <div>
            this should not render at all
        </div>
    );
    let wrapper = shallow(
        <Modal
            isOpen={true}
            onClose={jest.fn()}
        >
            {child}
        </Modal>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains(child)).toBe(true);
});


test('Modal should properly call onClose hook when a click otuside the modal body', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <Modal
            isOpen={true}
            onClose={onClose}
        >
            not much content, nope
            </Modal>
    );
    wrapper.find('.axc-modal__overlay').simulate('click');
    expect(onClose).toHaveBeenCalled();
});


test('Modal shouldn\'t call onClose hook when a click inside the modal body is done, instead it should call the clickInsideModal method', () => {
    const onClose = jest.fn();
    const onClickinside = jest.fn((event) => { event.stopPropagation(); });
    class MockedModal extends Modal {
        handleClickInsideModal = onClickinside;
    }
    let wrapper = mount(
        <MockedModal
            isOpen={true}
            onClose={onClose}
        >
            not much content, nope
            </MockedModal>
    );
    wrapper.find('.axc-modal__body').simulate('click');
    expect(onClose).not.toHaveBeenCalled();
    expect(onClickinside).toHaveBeenCalled();
});

test('Modal should properly call the onOpen hook when isOpen changes from false to true', () => {
    const onOpen = jest.fn();
    let wrapper = mount(
        <Modal
            isOpen={false}
            onOpen={onOpen}
        >
            not much content, nope
            </Modal>
    );
    wrapper.setProps({ isOpen: true });
    //Transition is suposed to take some time so we delay the check so that the component has time to call it.
    setTimeout(() => {
        expect(onOpen).toHaveBeenCalled();
    }, 1500);
});


test('Modal should properly call the onClose hook when isOpen changes from true to false', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <Modal
            isOpen={true}
            onClose={onClose}
        >
            not much content, nope
            </Modal>
    );
    wrapper.setProps({ isOpen: false });
    //Transition is suposed to take some time so we delay the check so that the component has time to call it.
    setTimeout(() => {
        expect(onClose).toHaveBeenCalled();
    }, 1500);
});

test('Modal should properly transition from not rendering to rendering when isOpen changes from false to true', () => {
    const modalContent = (
        <div id='content root'>
            this is a bit of text
            <div>
                with a nested div inside
            </div>
            <div>
                and another
            </div>
        </div>
    )
    let wrapper = mount(
        <Modal
            isOpen={false}
            onClose={jest.fn()}
        >
            {modalContent}
        </Modal>
    );
    expect(wrapper.find('#content root').exists()).toEqual(false);
    wrapper.setProps({ isOpen: true });
    expect(wrapper.contains(modalContent)).toBe(true);
});



test('Modal should properly transition from rendering to not rendering when isOpen changes from true to false', () => {
    const modalContent = (
        <div id='content root'>
            this is a bit of text
            <div>
                with a nested div inside
            </div>
            <div>
                and another
            </div>
        </div>
    )
    let wrapper = mount(
        <Modal
            isOpen={true}
            onClose={jest.fn()}
        >
            {modalContent}
        </Modal>
    );
    expect(wrapper.contains(modalContent)).toBe(true);
    wrapper.setProps({ isOpen: false });
    expect(wrapper.find('#content root').exists()).toEqual(false);
});



test('Modal should properly change the class names during closing transition', () => {
    const modalContent = (
        <div id='content root'>
            this is a bit of text
            <div>
                with a nested div inside
            </div>
            <div>
                and another
            </div>
        </div>
    )
    let wrapper = mount(
        <Modal
            isOpen={true}
            onClose={jest.fn()}
        >
            {modalContent}
        </Modal>
    );
    expect(wrapper.find('.axc-modal__overlay').exists()).toEqual(true);
    wrapper.setProps({ isOpen: false });
    //we add delay so that the modal have time to trigger the closing transition
    setTimeout(() => {
        expect(wrapper.find('.axc-modal__overlay--closing').exists()).toEqual(true);
    }, 100);
    //we add even more delay to make sure the transition has finished and the component has closed
    setTimeout(() => {
        expect(expect(wrapper.find('.axc-modal__overlay').exists()).toEqual(false));
    }, 1000);
});



test('Modal should properly change the class names during opening transition', () => {
    const modalContent = (
        <div id='content root'>
            this is a bit of text
            <div>
                with a nested div inside
            </div>
            <div>
                and another
            </div>
        </div>
    )
    let wrapper = mount(
        <Modal
            isOpen={false}
            onClose={jest.fn()}
        >
            {modalContent}
        </Modal>
    );
    expect(wrapper.find('.axc-modal__overlay').exists()).toEqual(false);
    wrapper.setProps({ isOpen: true });
    //we add delay so that the modal have time to trigger the closing transition
    setTimeout(() => {
        expect(wrapper.find('.axc-modal__overlay--opening').exists()).toEqual(true);
    }, 100);
    //we add even more delay to make sure the transition has finished and the component has closed
    setTimeout(() => {
        expect(expect(wrapper.find('.axc-modal__overlay').exists()).toEqual(true));
    }, 1000);
});