import React, {KeyboardEvent} from 'react';





export interface KeyBinderProps {
    keys: string[],
    onTrigger: Function;
    className?: string
}

export interface KeyBinderState{

}


/**
 * 
 * Logic component that allows the provided function to execute when the key press event conditions meet those specified.
 * 
 * Keys hold an array of valid KeyboardEvent.code(https://www.w3.org/TR/uievents-key/#named-key-attribute-values) strings
 * 
 * 
 */
export class KeyBinder extends React.Component<KeyBinderProps, KeyBinderState> {
    constructor(props){
        super(props);
    }
    onKeyUp = (event: KeyboardEvent): any=>{
        for(let i = 0; i < this.props.keys.length; i++){
            if(this.props.keys.includes(event.key)){
                return this.props.onTrigger();
            }
        }

    }
    render(){
        return(<div className={this.props.className || ''} onKeyUp={this.onKeyUp}>{this.props.children}</div>);
    }
}


export default KeyBinder;