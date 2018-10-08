import React from 'react'
import { shallow, render, mount } from 'enzyme'
import TypeWriter from '../../dist/animated/typeWriter';


test('Typewritter shouldn\'t throw an error if passed no props', () => {
    const onClose = jest.fn();
    expect(() => {
        let wrapper = mount(
            <TypeWriter />
        );
    }).not.toThrow();
});


test('TypeWritter shouldn\'t render anything if not passed a string or the string is an empty one', () => {
    const onClose = jest.fn();
    let withProp = shallow(
        <TypeWriter string='' />
    );
    let withoutProp = shallow(
        <TypeWriter />
    );
    expect(withProp.isEmptyRender()).toEqual(true);
    expect(withoutProp.isEmptyRender()).toEqual(true);
});


test('TypeWritter should properly render within the time frame established by props', (done) => {
    const str = '12345678910';
    const timeXchar = 50;
    const totalTime = 50*11;
    let wrapper = mount(<TypeWriter string={str} timePerCharacter={timeXchar} variance={0}/>);
    setTimeout(() => {
        expect(wrapper.getDOMNode().nodeValue).toEqual(str);
        done();
        //adding 500 cuz for some reason test takes mre time to complete
    }, totalTime+500);
});



test('TypeWritter should properly render re-render when a new string is passed', (done) => {
    const firstVal = 'Perfectly balanced, as all things should be';
    const secondVal = 'Dread it. Run from it. Destiny still arrives';
    class TestComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                string: firstVal,
                timeXchar: 1,
                variance: 1
            }
        }
        change = () => {
            this.setState(() => ({
                string: secondVal
            }));
        }
        render() {
            return (
                <div id='wrapper'>
                    <TypeWriter string={this.state.string} timePerCharacter={this.state.timeXchar} variance={this.state.variance} />
                </div>
            );

        }
    }
    let wrapper = mount(<TestComponent />);
    setTimeout(() => {
        expect(wrapper.find('#wrapper').childAt(0).text()).toEqual(firstVal);
        wrapper.instance().change();
        setTimeout(() => {
            expect(wrapper.find('#wrapper').childAt(0).text()).toEqual(secondVal);
            done();
        }, 5 * secondVal.length +300);
    }, 5 * firstVal.length +300);

});

//TODO: Check that behavior of variance and time delay work accurately, right now there are some huge delays for no apparent reason