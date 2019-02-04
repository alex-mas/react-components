import React from 'react';
import "../src/styles/index.scss";

import { storiesOf } from '@storybook/react';

import { TimeAgo} from '../src/timeago';

class SimpleTimeAgo extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
            lastClick: Date.now()
        }
    }
    setLastClick = ()=>{
        this.setState(()=>({
            lastClick: Date.now()
        }));
    }
    render() {
        return (
            <div>
                <div>
                    Clicked the button <TimeAgo time={this.state.lastClick} ms={true} isTimePoint={true}/>
                </div>
                <button onClick={this.setLastClick}>Click me</button>
            </div>
        )
    }
}

storiesOf('TimeAgo', module)
    .add('Simple', () => (
        <SimpleTimeAgo />
    ))
