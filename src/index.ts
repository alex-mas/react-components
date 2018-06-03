//Here we import and export all components
import AutoComplete from './interactive/autoComplete';
import Carousel from './navigation/carousel';
import Modal from './layout/modal';
import BrowserRouter from './navigation/browserRouter';
import TypeWritter from './animated/typeWriter';
import Router from './navigation/router';
import Tabs from './navigation/tabContainer';
const AlexComponents: any = {
    AutoComplete,
    Carousels: Carousel,
    Modal,
    Router,
    TypeWritter,
    BrowserRouter,
    tabs: Tabs
}

export default AlexComponents;