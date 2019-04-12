import React from 'react';
import "../src/styles/index.scss";

import {storiesOf} from '@storybook/react';

import Dropdown from "../src/dropdown";



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
               <Dropdown
                    default='test'
                    value={this.state.value}
                    onSelect={this.onChangeValue}
                    options={this.state.values}
               />
            </div>
        )

    }
}


storiesOf('Dropdown', module)
  .add('static options', () => (
    <StaticSuggestions/>
  ));