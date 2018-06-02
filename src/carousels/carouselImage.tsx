import React, { ReactChild, ReactElement, ReactNode, } from 'react';


export interface CarouselImageProps {
    src: string
    alt: string,
    title: string,
    subtitle: string
}

export type CarouselImage = React.SFC<CarouselImageProps>;

export const CarouselImage = (props: CarouselImageProps) => {
    console.log('Carousel image props: ',props);
    return (
        <div className='carousel-image__container'>
            <img className='carousel-image__image' src={props.src} alt={props.alt} />
            <div className='carousel-image__text'>
                <div className='carousel-image__title'>{props.title}</div>
                <div className='carousel-image__subtitle'>{props.subtitle}</div>
            </div>
        </div>
    );
}

export default CarouselImage;