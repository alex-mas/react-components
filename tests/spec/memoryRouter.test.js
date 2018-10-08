import React from 'react'
import { shallow, render, mount } from 'enzyme'
import MemoryRouter, { MemoryRoute, MemoryLink } from '../../dist/navigation/memoryRouter';





test('Memory Router should render all children that dont have path', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter>
            <div id="t1">Test</div>
            <div id="t2" testprop="nothing">Test</div>
            <div id="t3">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(true);
    expect(wrapper.find("#t3").exists()).toEqual(true);
});


test('Memory Router should properly render the default starting route', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/"
        >
            <div path="/" id="t1">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
});

test('Memory Router shouldn\'t render a div who\'s path is not the starting route ', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/"
        >
            <div path="/" id="t1">Test</div>
            <div path="/test" id="t2" testprop="nothing">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t2").exists()).toEqual(false);
});

test('Memory Router should only render the first route matching if singleRoute prop is true', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/"
            singleRoute={true}
        >
            <div path="/" id="t1">Test</div>
            <div path="/" id="t2" testprop="nothing">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(false);
});


test('Memory Router should render the route that matches exactly the current route if exact prop is given', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/test"
            singleRoute={true}
        >
            <div path="/test" exact={true} id="t2" testprop="nothing">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t2").exists()).toEqual(true);
});

test('If exact is provided and the route has params if a route matches the routing part it will be rendered regardless of the param values', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/test/myParam"
            singleRoute={true}
        >
            <div path="/test/:param" exact={true} id="t1">Test</div>
            <div path="/test/:param1:param2" exact={true} id="t2">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t1").exists()).toEqual(true);
});

test('Memory Router shouldn\'t render the route that doesn\'t match exactly the current route if exact prop is given', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <MemoryRouter
            startingRoute="/test"
        >
            <div path="/another" exact={true} id="t1">Test</div>
        </MemoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(false);
});

test('If exact and exactParams are both true a route that matches the routing part but doesnt have the same ammount of parameters shouldn\'t be rendered', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <div>
            <MemoryRouter
                startingRoute="/test/firstParam&secondParam"
            >
                <div path="/test/:onlyParam" exact={true} exactParams={true} id="t1">Test</div>
            </MemoryRouter>
            <MemoryRouter
                startingRoute="/test/"
            >
                <div path="/test/:onlyParam" exact={true} exactParams={true} id="t2">Test</div>
            </MemoryRouter>
        </div>

    );
    expect(wrapper.find("#t1").exists()).toEqual(false);
    expect(wrapper.find("#t2").exists()).toEqual(false);
});


test('If exact and exactParams are both true a route that matches the routing part and has the same ammount of parameters should be rendered', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <div>
            <MemoryRouter
                startingRoute="/test/firstParam"
            >
                <div path="/test/:onlyParam" exact={true} exactParams={true} id="t1">Test</div>
            </MemoryRouter>
            <MemoryRouter
                startingRoute="/test"
            >
                <div path="/test" exact={true} exactParams={true} id="t2">Test</div>
            </MemoryRouter>
            <MemoryRouter
                startingRoute="/test/"
            >
                <div path="/test/" exact={true} exactParams={true} id="t3">Test</div>
            </MemoryRouter>
        </div>

    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(true);
    expect(wrapper.find("#t3").exists()).toEqual(true);
});



/*
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

*/