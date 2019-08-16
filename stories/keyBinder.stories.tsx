import React from 'react';
import "../src/styles/index.scss";
import KeyBinder from '../src/keyBinder';
import { storiesOf } from '@storybook/react';


interface KeyBinderExampleProps {
}
interface KeyBinderExampleState {
    color: string
}

class KeyBinderExample extends React.Component<KeyBinderExampleProps, KeyBinderExampleState>{
    constructor(props: KeyBinderExampleProps) {
        super(props);
        this.state = {
            color: 'green'
        };
    }
    toggleBlue = () => {
        this.setState(() => ({
            color: 'blue'
        }));
    }
    toggleRed = () => {
        this.setState(() => ({
            color: 'red'
        }));
    }
    toggleGreen = () => {
        this.setState(() => ({
            color: 'green'
        }));
    }
    render() {
        return (
            <div className='keybinder-showcase'>
                <div style={{
                    position: 'absolute',
                    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                    color: this.state.color,
                    width: '20vw',
                    height: '20vh',
                    top: '40vh',
                    left: '40vw'
                }}>
                    <KeyBinder
                        keyToListen={'1'}
                        onTrigger={this.toggleRed}
                    >
                        Press 1 to toggle red color
                        <input type='text'></input>
                    </KeyBinder>
                    <KeyBinder
                        keyToListen={'2'}
                        onTrigger={this.toggleBlue}
                    >
                        2 for blue color
                    </KeyBinder>
                    <KeyBinder
                        keyToListen={'Escape'}
                        onTrigger={this.toggleGreen}
                    >
                        and esc to reset color to green
                    </KeyBinder>
                </div>

            </div>
        )
    }
}





interface KeyBinderExampleProps {
}
interface KeyBinderExampleState {
    color: string
}

class LocalKeyBinderExample extends React.Component<KeyBinderExampleProps, KeyBinderExampleState>{
    constructor(props: KeyBinderExampleProps) {
        super(props);
        this.state = {
            color: 'green'
        };
    }
    toggleBlue = () => {
        this.setState(() => ({
            color: 'blue'
        }));
    }
    toggleRed = () => {
        this.setState(() => ({
            color: 'red'
        }));
    }
    toggleGreen = () => {
        this.setState(() => ({
            color: 'green'
        }));
    }
    render() {
        return (
            <div className='keybinder-showcase'>
                <div style={{
                    position: 'absolute',
                    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                    color: this.state.color,
                    width: '20vw',
                    height: 'auto',
                    top: '40vh',
                    left: '40vw'
                }}>
                    <div>Note how pressing the key on the other input fields dont trigger the effect</div>
                    <br/>
                    <KeyBinder
                        localBinder={true}
                        keys={['1','2']}
                        onTrigger={this.toggleRed}
                    >
                        Type 1 inside to toggle red color
                        <input type='text'></input>
                    </KeyBinder>
                    <KeyBinder
                        localBinder={true}
                        keyToListen={'2'}
                        onTrigger={this.toggleBlue}
                    >
                           Type 2 inside to toggle blue color
                           <input type='text'></input>
                    </KeyBinder>
                    <KeyBinder
                        localBinder={true}
                        keyToListen={'Escape'}
                        onTrigger={this.toggleGreen}
                    >
                        and esc to reset color to green
                        <input type='text'></input>
                    </KeyBinder>
                    <div>
                        Events are only triggered when a children of keyBinder is selected. Only input/textarea or contenteditable=true can be selected
                    </div>
                </div>

            </div>
        )
    }
}



storiesOf('KeyBinder', module)
    .add('global bind', () => (
        <KeyBinderExample />
    ))
    .add('local bind', () => (
        <LocalKeyBinderExample />
    ));

