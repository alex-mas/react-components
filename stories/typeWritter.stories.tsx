import React from 'react';
import "../src/styles/index.scss";
import { storiesOf } from '@storybook/react';

import { TypeWriter } from '../src/typeWriter';

class SimpleTypeWriter extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
            str: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id mattis magna, eget mattis mi. Sed mollis, sem eget scelerisque.'
        }
    }
    forceReRender = () => {
        this.setState((prevState)=>({
            str: prevState.str + ' ' 
        }));
    }
    render() {
        return (
            <div>
                <TypeWriter
                    
                    timePerCharacter={15}
                    variance={10}
                    string={this.state.str}
                />
                <button onClick={this.forceReRender}>restart</button>
            </div>
        )
    }
}

storiesOf('TypeWritter', module)
    .add('Simple', () => (
        <SimpleTypeWriter />
    ))
