import React from 'react';
import "../src/styles/index.scss";

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import HandleClickOutside from "../src/handleClickOutside";


class ClickOutsideExample extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            messages: []
        }
    }
    addMessage = (message)=>{
        this.setState((prevState)=>({
            messages: [...prevState.messages, message]
        }));     
    }
    onClickInside = ()=>{
        this.addMessage("Clicked inside!");
    }
    onClickOutside = ()=>{
        this.addMessage("Clicked outside!");
    }
    resetMessages = (e)=>{
        console.log("executing button handler");
        e.preventDefault();
        e.stopPropagation();
        this.setState(()=>({
            messages: []
        }));
    }
    render(){
        return(
            <div>
                <HandleClickOutside onClickOutside={this.onClickOutside}>
                    <div 
                        onClick={this.onClickInside}
                        style={{
                            border: '1px solid red', 
                            position: 'absolute', 
                            left: '50%', 
                            top: '15%', 
                            height: '150px', 
                            width: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        click outside me
                    </div>
                </HandleClickOutside>
                <div 
                    style={{
                        backgroundColor: "#cccccc",
                        paddingTop: "2rem", 
                        width:'200px',
                        maxHeight: '300px',
                        overflowY: 'scroll'
                    }}
                >
                    {this.state.messages.map((message)=>{
                    return(
                        <div style={{fontWeight:'bold', color: message.includes('outside') ? "#ff1919" : '#19ff19', padding: "0.5rem"}}>
                            {message}
                        </div>
                        );
                    })}
                </div>
                <button onClick={this.resetMessages} style={{color: "white", backgroundColor: "black", padding: "0.5rem"}}>remove messages</button>
            </div>
        )

    }
}


class HideOnClickOutside extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            isBoxActive: true
        }
    }
    hideBox = ()=>{
        this.setState(()=>({
            isBoxActive: false
        })); 
    }
    showBox = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState(()=>({
            isBoxActive: true
        }));
    }
    render(){
        return(
            <div>
                <button onClick={this.showBox} style={{color: "white", backgroundColor: "black", padding: "0.5rem"}}>Show</button>
                {this.state.isBoxActive ? 
                    <HandleClickOutside onClickOutside={this.hideBox}>
                        <div 
                            style={{
                                border: '1px solid red', 
                                position: 'absolute',
                                left: '35%',
                                top: '15%', 
                                height: '250px', 
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            click outside to hide me
                        </div>
                    </HandleClickOutside>
                    :
                    null
                }
            </div>
        )

    }
}

storiesOf('HandleClickOutside', module)
  .add('simple', () => (
    <ClickOutsideExample/>
  ))
  .add('hide on click outside',()=>(
      <HideOnClickOutside/>
  ))
