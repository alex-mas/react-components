import React, { KeyboardEvent, EventHandler, RefObject } from 'react';
import { canUseDOM } from './utils/env';





export interface KeyBinderProps {
    keyToListen?: string,
    keys?: string[],
    onTrigger: Function;
    className?: string;
    localBinder?: boolean;
}

export interface KeyBinderState {

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
    static defaultProps = {
        localBinder: false
    };
    rootRef: RefObject<HTMLDivElement> = React.createRef();
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(canUseDOM){
            if(this.props.localBinder){
                this.rootRef.current.addEventListener('keyup', this.onKeyUp, false);
            }else{
                window.addEventListener('keyup', this.onKeyUp, false);
            }
           
        }

    }
    componentWillUnmount() {
        if(canUseDOM){
            if(this.props.localBinder){
                this.rootRef.current.removeEventListener('keyup', this.onKeyUp);
            }else{
                window.removeEventListener('keyup', this.onKeyUp);
            }
          
        }
    }
    onKeyUp: EventListener = (event: any): any => {
        if(!this.props.keys && !this.props.keyToListen){
            return;
        }
        if(this.props.keyToListen){
            if(this.props.keyToListen === event.key){
                return this.props.onTrigger();
            }
            return;
        }
        for (let i = 0; i < this.props.keys.length; i++) {
            if (this.props.keys[i].includes(event.key)) {
                return this.props.onTrigger();
            }
        }
    }
    render() {
        if(this.props.localBinder){
            return(
                <div ref={this.rootRef}> 
                    {this.props.children}
                </div>
            );
        }
        if(!this.props.children) {
            return null;
        }
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );

    }
}


export default KeyBinder;