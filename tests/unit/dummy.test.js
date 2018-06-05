const React = require('react');
const {shallow} = require('enzyme');


test('this should just work',()=>{
    const wrapper = shallow(<div>Test</div>);
    expect(wrapper.text()).toEqual('Test');
});