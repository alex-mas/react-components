import React, { ReactChild, ReactElement, } from 'react';
import ReactDOM from 'react-dom';
import * as fontawesome from '@fortawesome/fontawesome';
import * as test from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import Router,{RouterContext} from './router';

export interface CarouselState {
    activeElement: number,
    intervalHandle?: NodeJS.Timer
}

export interface CarouselProps {
    children?: any,
    startingElement?: number,
    autoPlay?: number,
    onElementChange?(currentElement: number): any
}

export class Carousel extends React.Component<CarouselProps, CarouselState>{
    state: CarouselState
    constructor(props: CarouselProps) {
        super(props);
        
        this.onElementChange = this.onElementChange.bind(this);
        this.stopAutoPlay = this.stopAutoPlay.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        let intervalHandle;
        if (this.props.autoPlay !== undefined && this.props.autoPlay > 0) {
            intervalHandle = setInterval(this.next, this.props.autoPlay);
        }

        let activeElement;
        if (
            this.props.startingElement !== undefined
            &&
            this.props.startingElement <= React.Children.count(this.props.children) - 1
            &&
            this.props.startingElement >= 0
        ) {
            activeElement = this.props.startingElement;
        } else {
            activeElement = 0;
        }

        this.state = {
            activeElement,
            intervalHandle
        };


    }
    onElementChange() {
        if (this.props.onElementChange) {
            this.props.onElementChange(this.state.activeElement);
        }
    }
    next() {
        this.setState((prevState) => {
            let newElement: number = prevState.activeElement + 1;
            if (newElement > React.Children.count(this.props.children) - 1) {
                newElement = 0;
            }
            return {
                activeElement: newElement
            }
        }, () => {
            this.onElementChange();
        });
    }
    previous() {
        this.setState((prevState) => {
            let newElement: number = prevState.activeElement - 1;
            if (newElement < 0) {
                newElement = React.Children.count(this.props.children) - 1;
            }
            return {
                activeElement: newElement
            }
        }, () => {
            this.onElementChange();
        });
    }
    stopAutoPlay() {
        if (this.state.intervalHandle) {
            clearInterval(this.state.intervalHandle);
        }
    }
    render() {
        return (
            <div className="axc-carousel">
                <button className="axc-carousel__previous" onClick={this.previous}>
                    <FontAwesomeIcon icon={angleLeft} />
                </button>
                <Router
                    strategy={(childProps: any, routerContext: RouterContext, index: number) => {
                        if (index === this.state.activeElement) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
                    className='axc-carousel__element-container'
                >
                    {this.props.children}
                </Router>
                <button className="axc-carousel__next" onClick={this.next}>
                    <FontAwesomeIcon icon={angleRight} />
                </button>
            </div>
        )
    }
}



export default Carousel;
