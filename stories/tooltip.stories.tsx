import React from 'react';
import "../src/styles/index.scss";

import { storiesOf } from '@storybook/react';

import withTooltip from "../src/tooltip";



class _SimpleTooltip extends React.Component<{}, any>{
    render() {
        return (
            <div>Hover me</div>
        )
    }
}


const positionedDiv = ({pos,val, pos2, val2}: any)=><span style={{position:'absolute', [pos]: val, [pos2 ? pos2 : undefined]: val2}}>Hover me</span>;
const TooltippedDiv = withTooltip(positionedDiv);


class BoundsChecked extends React.Component<{}, any>{
    root: React.Ref<HTMLDivElement>;
    render() {
        return (
            <div ref={this.root} style={{height:'500px', width: '500px', border: '2px solid red', position: 'relative'}}>
                <TooltippedDiv pos='right' val='0px' pos2='bottom' val2='0px'tooltip='hello world' tooltipClass='axc-tooltip' containerRef={this.root}/>
                <TooltippedDiv pos='right' val='0px' tooltip='hello world' tooltipClass='axc-tooltip'containerRef={this.root}/>
                <TooltippedDiv pos='top' val='0px' tooltip='hello world' tooltipClass='axc-tooltip'containerRef={this.root}/>
                <TooltippedDiv pos='bottom' val='0px' tooltip='hello world' tooltipClass='axc-tooltip'containerRef={this.root}/>
            </div>
        );
    }
}

const SimpleTooltip = withTooltip(_SimpleTooltip);


storiesOf('Tooltip', module)
    .add('simple example', () => (
        <SimpleTooltip tooltip='Hello world' tooltipClass='simple-tooltip' />
    ))
    /*.add('bounds checking', () => (
        <BoundsChecked />
    ))
    .add('dynamic element', () => (
        <SimpleTooltip tooltip='Hello world' tooltipClass='simple-tooltip' />
    ));*/