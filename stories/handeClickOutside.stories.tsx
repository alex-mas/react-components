import React from 'react';
import "../src/styles/index.scss";

import {storiesOf} from '@storybook/react';

import HandleClickOutside from "../src/handleClickOutside";


class ClickOutsideExample extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            message: ''
        }
    }
    setMessage = (message)=>{
        this.setState((prevState)=>({
            message
        }));     
    }
    onClickInside = ()=>{
        this.setMessage("Clicked inside!");
    }
    onClickOutside = ()=>{
        this.setMessage("Clicked outside!");
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
                        backgroundColor: "#f0f0f0f0",
                        width:'150px', 
                    }}
                >
                    {this.state.message}
                    {this.state.message.includes('inside') ? '😃' : '😰'}
                </div>
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
                <button onClick={this.showBox} style={{color: "white", backgroundColor: "black", padding: "0.5rem", border: 'none'}}>Show</button>
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
                            Click outside to hide me
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
