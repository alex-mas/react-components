import React from 'react'
import { shallow, render, mount } from 'enzyme'
import MemoryRouter, { MemoryRoute, MemoryLink } from '../../dist/memoryRouter';
import MemoryHistory from '../../dist/memoryHistory';





test('HistoryRouter should render all children that dont have path', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <HistoryRouter>
            <div id="t1">Test</div>
            <div id="t2" testprop="nothing">Test</div>
            <div id="t3">Test</div>
        </HistoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(true);
    expect(wrapper.find("#t3").exists()).toEqual(true);
});


test('HistoryRouter should work with function as a child pattern ', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <HistoryRouter>
            {(props) => <div id="t1">Test</div>}
        </HistoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
});



test('HistoryRouter should work with function as a child pattern ', () => {
    const onClose = jest.fn();
    let wrapper = mount(
        <HistoryRouter>
            {(props) => <div id="t1">Test</div>}
        </HistoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
});



test('HistoryRouter should render the correct route once a component inside its tree triggers navigation', () => {
    const onClose = jest.fn();
    const myHistory = new MemoryHistory({url:'/first'});
    let wrapper = mount(
        <HistoryRouter history={myHistory} singleRoute>
            {(props) => (
                <div path="/first" id="t1">
                    Test
                    <button
                        onClick={() => props.history.pushState(undefined,undefined,"/second")}
                        id="btn"
                    >
                        clickme
                    </button>
                </div>
            )}
            <div path="/second" id="#t2">yoo</div>
        </HistoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(false);
    wrapper.find("#btn").simulate("click");
    expect(wrapper.find("#t2").exists()).toEqual(true);
    expect(wrapper.find("#t1").exists()).toEqual(false);
});



test('React should react to changes to history that come from outside react\'s scope', () => {
    const onClose = jest.fn();
    const myHistory = new MemoryHistory({url:'/first'});
    let wrapper = mount(
        <HistoryRouter history={myHistory} singleRoute>
            {(props) => (
                <div path="/first" id="t1">
                    Test
                    <button
                        onClick={() => props.history.pushState(undefined,undefined,"/second")}
                        id="btn"
                    >
                        clickme
                    </button>
                </div>
            )}
            <div path="/second" id="#t2">yoo</div>
        </HistoryRouter>
    );
    expect(wrapper.find("#t1").exists()).toEqual(true);
    expect(wrapper.find("#t2").exists()).toEqual(false);
    myHistory.pushState(undefined,undefined, "/second");
    expect(wrapper.find("#t2").exists()).toEqual(true);
    expect(wrapper.find("#t1").exists()).toEqual(false);
});






