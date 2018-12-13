import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Dialog from '../../dist/dialog'


test('Dialog shouldn\'t throw an error if passed no options', () => {
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
    }).not.toThrow();
});


test('Dialog shouldn\'t render anything if isOpen is false', () => {
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



test('Dialog should render the dialog properly if isOpen equals to true', () => {
    const onClose = jest.fn(); 
    let wrapper = shallow(
        <Dialog
            isOpen={true}
            onClose={onClose}
            options={["first optipon","second option"]}
        >
        </Dialog>
    );
    expect(wrapper.find).toMatchSnapshot();
    expect(wrapper.find(".axc-dialog").exists()).toEqual(true);
});

test('Dialog should render two buttons with content equal to the array elements ', () => {
    const dialogOptions = ["first optipon","second option"];
    const onClose = jest.fn();
    let wrapper = mount(
        <Dialog
            isOpen={true}
            onClose={onClose}
            options={dialogOptions}
        >
        </Dialog>
    );
    expect(wrapper.find('.axc-dialog__options').exists()).toEqual(true);
    wrapper.find('.axc-dialog__option').forEach((wrapperElement, index)=>{
        expect(wrapperElement.text()).toEqual(dialogOptions[index]);
    });
});


test('Dialog should properly call the onCLick option function provided when an option is clicked', () => {
    const dialogOptions = ["first optipon","second option"];
    const onClose = jest.fn();
    const handler = jest.fn();
    let wrapper = mount(
        <Dialog
            isOpen={true}
            onClose={onClose}
            options={dialogOptions}
            onClickOption={handler}
        >
        </Dialog>
    );
    wrapper.find('.axc-dialog__option').forEach((wrapperElement, index)=>{
        wrapperElement.simulate('click');
    });
    expect(handler).toHaveBeenCalledTimes(dialogOptions.length);
});



test('if onClickOption handler changes what is passed to isOpen the dialog should call the provided onClose funcunction and then start the transition to fade', () => {
    class MyComponent extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                isOpen: true,
                dialogOptions: ["first optipon","second option"]
            }
        }
        onClickHandler = (clickedOption) =>{
            this.onCloseHandler();
        }
        onClickOption = jest.fn(this.onClickHandler);
        onClose = ()=>{
            this.setState(()=>({
                isOpen: false
            }));
        }
        onCloseHandler = jest.fn(this.onClose);
        render(){
            return(
                <Dialog
                isOpen={this.state.isOpen}
                onClose={this.onCloseHandler}
                options={this.state.dialogOptions}
                onClickOption={this.onClickOption}
               />
            );
        }
    }

    let wrapper = mount(
        <MyComponent/>
    );
    wrapper.find('.axc-dialog__option').at(0).simulate('click');    
    expect(wrapper.instance().onClickOption).toHaveBeenCalled();
    expect(wrapper.instance().onCloseHandler).toHaveBeenCalled();
    setTimeout(()=>{
        expect(wrapper.find('.axc-dialog__option').exists()).toBeFalsy();
    },500);
});



test('Dialog shouldn\'t close when an option if clicked if the click handler doesn\'t set isOpen to false', () => {
    class MyComponent extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                isOpen: true,
                dialogOptions: ["first optipon","second option"]
            }
        }
        onClickHandler = (clickedOption) =>{
            const t = 0;
            let t2 = 5;
            const dt = t2-t;
            return "they did the math";
        }
        onClickOption = jest.fn(this.onClickHandler);
        onClose = ()=>{
            this.setState(()=>({
                isOpen: false
            }));
        }
        onCloseHandler = jest.fn(this.onClose);
        render(){
            return(
                <Dialog
                isOpen={this.state.isOpen}
                onClose={this.onCloseHandler}
                options={this.state.dialogOptions}
                onClickOption={this.onClickOption}
               />
            );
        }
    }

    let wrapper = mount(
        <MyComponent/>
    );
    wrapper.find('.axc-dialog__option').at(0).simulate('click');    
    expect(wrapper.instance().onClickOption).toHaveBeenCalled();
    expect(wrapper.instance().onCloseHandler).not.toHaveBeenCalled();
    expect(wrapper.find('.axc-dialog__option').exists()).toBeTruthy();
});
