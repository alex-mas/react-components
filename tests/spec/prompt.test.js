import React from 'react';
import { shallow, render, mount } from 'enzyme';
import PromptSystem,{withPrompt} from '../../dist/prompt';

const DELAY_TRESHOLD = 1500;


class TestForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            testValue: 'some string value',
            testNumber: 42,
        }
    }
    onSubmit=()=>{
        console.log('submiting: ', this.state);
        this.props.onSubmit(this.state);
    }
    render(){
        return(
            <div>
                No need to create a form
                <button id='form-btn' onClick={this.onSubmit}> the button</button>
            </div>
            
        )
    }
}


test('Prompt should successfully behave when a string is provided',()=>{
    class _TestCaller extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                result:undefined
            }
        }
        callPrompt = (e)=>{
            e.preventDefault();
            this.props.prompt('are you ready?').then((result)=>{
                this.setState(()=>{
                    result
                });
            })
        }
        render(){
            return(
                <div>
                    <button id='caller-btn'onClick={this.callPrompt}>
                        click me
                    </button>
                    {this.state.result === '' ? 
                        <div id='results'>
                            {this.state.result}
                        </div>
                        :
                        null
                    }
                </div>
            )
        }
    }
    const TestCaller = withPrompt(_TestCaller);
    let wrapper = mount(
        <div>
            <PromptSystem>
                <TestCaller/>
            </PromptSystem>
        </div>
    );
    wrapper.find('#caller-btn').simulate('click');
    expect(wrapper.find('#results').exists()).toBe(false);
    //expect value nt to be set yet
    setTimeout(()=>{
        wrapper.find('.axc-prompt__actions').childAt(0).simulate('click');
        setTimeout(()=>{
            expect(wrapper.find('#results').exists()).toBe(true);
            expect(wrapper.find('#results')).toEqual((
                <div id='results'>
                    {''}
                </div>
            ));
        }, DELAY_TRESHOLD);
    },DELAY_TRESHOLD);
});

test('Prompt should succesfully return the state of the form to the .then handler ', () => {

    class _TestCaller extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                result:undefined
            }
        }
        callPrompt = (e)=>{
            e.preventDefault();
            this.props.prompt(TestForm).then((result)=>{
                this.setState(()=>{
                    result
                });
            })
        }
        render(){
            return(
                <div>
                    <button id='caller-btn'onClick={this.callPrompt}>
                        click me
                    </button>
                    {this.state.result ? 
                        <div id='results'>
                            {this.state.result.testValue} - {this.state.result.testNumber}
                        </div>
                        :
                        null
                    }
                </div>
            )
        }
    }
    const TestCaller = withPrompt(_TestCaller);
    let wrapper = mount(
        <div>
            <PromptSystem>
                <TestCaller/>
            </PromptSystem>
        </div>
    );
    wrapper.find('#caller-btn').simulate('click');
    expect(wrapper.find('#results').exists()).toBe(false);
    //expect value nt to be set yet
    setTimeout(()=>{
        wrapper.find('#form-btn').simulate('click');
        setTimeout(()=>{
            expect(wrapper.find('#results').exists()).toBe(true);
            expect(wrapper.find('#results')).toEqual((
                <div id='results'>
                    {'some string value'} - {42}
                </div>
            ));
        }, DELAY_TRESHOLD);
    },DELAY_TRESHOLD);

    //expect value to be set soon.
});
