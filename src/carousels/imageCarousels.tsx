import React, { ReactChild, ReactElement, ReactNode, } from 'react';
import ReactDOM from 'react-dom';
import * as fontawesome from '@fortawesome/fontawesome';
import * as test from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import angleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import angleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import circleSolid from '@fortawesome/fontawesome-free-solid/faCircle';
import circleRegular from '@fortawesome/fontawesome-free-regular/faCircle';
import Router, { RouterContext } from '../router';
import Carousel, {CarouselProps, CarouselState} from './carousel';



export interface CarouselImageProps {
    src: string
    alt: string,
    title: string,
    subtitle: string
}

export type CarouselImage = React.SFC<CarouselImageProps>;

export const CarouselImage = (props: CarouselImageProps) => (
    <div className='carousel-image__container'>
        <img className='carousel-image__image' src={this.props.src} alt={this.props.alt} />
        <div className='carousel-image__text'>
            <div className='carousel-image__tile'>{this.props.title}</div>
            <div className='carousel-image__subtitle'>{this.props.subtitle}</div>
        </div>
    </div>
);



export interface ImageCarouselProps extends CarouselProps{
    children?: CarouselImage[]
}

export class ImageCarousel extends Carousel.LinkedCarousel {
    render() {
        return (
            <div className='axc-linked-carousel'>
                <button className='axc-linked-carousel__previous' onClick={this.previous}>
                    <FontAwesomeIcon icon={angleLeft} />
                </button>
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
                    strategy={(childProps: any, routerContext: RouterContext, index: number) => {
                        if (index === this.state.activeElement) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
                    className='axc-linked-carousel__element-container'
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