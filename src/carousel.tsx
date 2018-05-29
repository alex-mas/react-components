import React, { ReactChild, ReactElement } from 'react';


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

        this.onElementChange = this.onElementChange.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.stopAutoPlay = this.stopAutoPlay.bind(this);


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
            <div>
                <div className="axc-carousel">
                    <button className="axc-carousel__previous" onClick={this.previous}>previous</button>
                    <div className="axc-carousel__element-container">
                        {React.Children.map(this.props.children, (child: ReactElement<any> | any, i: number) => {
                            if (i === this.state.activeElement) {
                                return child;
                            }
                        })}
                    </div>
                    <button className="axc-carousel__next" onClick={this.next}>next</button>
                </div>
            </div>
        )
    }
}


export default Carousel;
