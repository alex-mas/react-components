import React, { ReactChild, ReactElement, ReactNode, } from 'react';
import ReactDOM from 'react-dom';
import * as fontawesome from '@fortawesome/fontawesome';
import * as test from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import circleSolid from '@fortawesome/fontawesome-free-solid/faCircle';
import circleRegular from '@fortawesome/fontawesome-free-regular/faCircle';
import Router, { RouterContext } from './router';


//TODO: Make Linked carousel be composed of carousel instead of extending it, and remake carousel

export interface CarouselState {
    activeElement: number,
    intervalHandle?: NodeJS.Timer
}

export interface CarouselProps {
    children?: any,
    startingElement?: number,
    autoPlay?: number,
    onElementChange?(currentElement: number): any,
    captions?: React.ComponentClass | React.SFCFactory<any>
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
    boundsChecked(num: number): number {
        if (num < 0) {
            num = React.Children.count(this.props.children) - 1;
        } else if (num > React.Children.count(this.props.children) - 1) {
            num = 0;
        }
        return num;
    }
    next() {
        this.setState((prevState) => {
            let newElement: number = prevState.activeElement + 1;
            return {
                activeElement: this.boundsChecked(newElement)
            }
        }, () => {
            this.onElementChange();
        });
    }
    previous() {
        this.setState((prevState) => {
            let newElement: number = prevState.activeElement - 1;
            return {
                activeElement: this.boundsChecked(newElement)
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
    routingStrategy =(childProps: any, routerContext: RouterContext, index: number) => {
        if (index === this.state.activeElement) {
            return true;
        } else {
            return false;
        }
    }
    routerBoostrap = (child: React.ReactElement<any>, routerContext: RouterContext, index: number) =>{
        if(typeof child === 'object'){
            return React.cloneElement(child, {className:'axc-carousel__element-container'})
        }else{
            return child;
        }
    }
    render() {
        return (
            <div className="axc-carousel">
                <button className="axc-carousel__previous" onClick={this.previous}>
                    <FontAwesomeIcon icon={angleLeft} />
                </button>
                {this.props.captions ?
                    <div className='axc-carousel__captions'>
                        {this.props.captions}
                    </div>
                    :
                    null}
                <Router
                    strategy={this.routingStrategy}
                    bootstrap={this.routerBoostrap}
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


export class LinkedCarousel extends Carousel {
    setElement(element) {
        if (this.state.activeElement !== element) {
            this.setState((prevState) => {
                return {
                    activeElement: this.boundsChecked(element)
                }
            }, () => {
                this.onElementChange();
            });
        }
    }
    routerBoostrap = (child: React.ReactElement<any>, routerContext: RouterContext, index: number)=>{
        if(typeof child === 'object'){
            return React.cloneElement(child, {className:'axc-linked-carousel__element-container'})
        }else{
            return child;
        }
    }
    render() {
        return (
            <div className='axc-linked-carousel'>
                <button className='axc-linked-carousel__previous' onClick={this.previous}>
                    <FontAwesomeIcon icon={angleLeft} />
                </button>
                {this.props.captions ?
                    <div className='axc-linked-carousel__captions'>
                        {<this.props.captions />}
                    </div>
                    :
                    null}
                <div className='axc-linked-carousel__links'>
                    {Array.apply(null, { length: React.Children.count(this.props.children) }).map((elmt, i) => {
                        let iconType = circleRegular;
                        if (i === this.state.activeElement) {
                            iconType = circleSolid;
                        }
                        return (
                            <a
                                href=''
                                className='axc-linked-carousel__link'
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setElement(i)
                                }}
                            >
                                <FontAwesomeIcon icon={iconType} />
                            </a>
                        )
                    })}

                </div>
                <Router
                    strategy={this.routingStrategy}
                    bootstrap={this.routerBoostrap}
                >
                    {this.props.children}
                </Router>
                <button className='axc-linked-carousel__next' onClick={this.next}>
                    <FontAwesomeIcon icon={angleRight} />
                </button>
            </div>
        )
    }
}



export interface CarouselImageProps extends React.Attributes {
    src: string
    alt: string,
    title: string,
    subtitle: string
}


export const CarouselImage: React.SFC<CarouselImageProps> = (props: CarouselImageProps)=> {
    return (<div className='carousel-image__container'>
        <img className='carousel-image__image' src={props.src} alt={props.alt} />
        <div className='carousel-image__text'>
            <div className='carousel-image__title'>{props.title}</div>
            <div className='carousel-image__subtitle'>{props.subtitle}</div>
        </div>
    </div>
    )

}


export default {
    Carousel,
    LinkedCarousel,
    CarouselImage
};
