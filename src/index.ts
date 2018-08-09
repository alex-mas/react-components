//Here we import and export all components
import AutoComplete from './interactive/autoComplete';
import Carousel from './navigation/carousel';
import Modal from './layout/modal';
import BrowserRouter from './navigation/browserRouter';
import TypeWriter from './animated/typeWriter';
import Router from './navigation/router';
import Tabs from './navigation/tabContainer';
import Stopwatch from './interactive/stopwatch';
import CountUp from './animated/countUp';
import I18String from './display/i18string';
const AlexComponents: any = {
    AutoComplete,
    Carousels: Carousel,
    Modal,
    Router,
    TypeWriter,
    BrowserRouter,
    Tabs,
    Stopwatch,
    CountUp,
    I18String
}

export default AlexComponents;