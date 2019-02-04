import React from 'react';
import "../src/styles/index.scss";

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import AutoComplete from "../src/autoComplete";



class StaticSuggestions extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            values: ["test", "suggestion", "hello world", "some emojis 😃"],
            value: ''
        }
    }
    onChangeValue = (newVal)=>{
        this.setState(()=>({
            value: newVal
        }))
    }
    render(){
        return(
            <div>
               <AutoComplete
                    value={this.state.value}
                    onChange={this.onChangeValue}
                    suggestions={this.state.values}
               />
            </div>
        )

    }
}


class DynamicSuggestions extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            values: ["suggestion"],
            value: ''
        }
    }
    onSubmit = ()=>{
        if(this.state.values.indexOf(this.state.value) === -1){
            this.setState((prevState)=>({
                value: '',
                values: [...prevState.values, prevState.value]
            }));
        }else{
            this.setState((prevState)=>({
                value: ''
            }));
        }
    }
    onChangeValue = (newVal)=>{
        this.setState(()=>({
            value: newVal
        }));
    }
    render(){
        return(
            <div>
               <AutoComplete
                    value={this.state.value}
                    onChange={this.onChangeValue}
                    suggestions={this.state.values}
                    onSubmit={this.onSubmit}
               />
               <button onClick={this.onSubmit}>Submit</button>
            </div>
        )

    }
}

storiesOf('AutoComplete', module)
  .add('static suggestions', () => (
    <StaticSuggestions/>
  ))
  .add('dynamic suggestions', () => (
    <DynamicSuggestions/>
  ));