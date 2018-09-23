import React, { KeyboardEvent, EventHandler } from 'react';





export interface KeyBinderProps {
    keys: string[],
    onTrigger: Function;
    className?: string
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
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp, false);
    }
    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }
    onKeyUp: EventListener = (event: any): any => {
        for (let i = 0; i < this.props.keys.length; i++) {
            if (this.props.keys.includes(event.key)) {
                return this.props.onTrigger();
            }
        }

    }
    render() {
        if (!this.props.children) {
            return null;
        } else {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        }

    }
}


export default KeyBinder;