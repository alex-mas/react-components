import * as carousel from './navigation/carousel';
import * as memoryRouter from './navigation/memoryRouter';
import * as router from './navigation/router';
import * as tabContainer from './navigation/tabContainer';

import * as dialog from './layout/dialog';
import * as dropdown from './layout/dropdown';
import * as modal from './layout/modal';

import * as autoComplete from './interactive/autoComplete';
import * as countdown from './interactive/countdown';
import * as keyBinder from './interactive/keyBinder';
import * as notifications from './interactive/notifications';
import * as stopwatch from './interactive/stopwatch';
import * as prompt from './interactive/prompt';

import * as i18string from './display/i18string';
import * as phoneNumber from './display/phoneNumber';
import * as progressBar from './display/progressBar';
import * as timeago from './display/timeago';
import * as timedProgressBar from './display/timedProgressBar';

import * as countUp from './animated/countUp';
import * as typeWriter from './animated/typeWriter';


export default {
    navigation:{
        carousel,
        memoryRouter,
        router,
        tabContainer
    },
    layout:{
        dialog,
        dropdown,
        modal
    },
    interactive:{
        autoComplete,
        countdown,
        keyBinder,
        notifications,
        stopwatch
    },
    display:{
        i18string,
        phoneNumber,
        progressBar,
        timeago,
        timedProgressBar
    },
    animated:{
        countUp,
        typeWriter
    }
}

