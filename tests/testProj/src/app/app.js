
import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../../../../dist/interactive/autoComplete';
import Modal from '../../../../dist/layout/modal';
import Carousel, { LinkedCarousel, CarouselImage } from '../../../../dist/navigation/carousel';
import Router from '../../../../dist/navigation/router';
import MemoryRouter, { MemoryLink, MemoryRoute } from '../../../../dist/navigation/memoryRouter';
import { Tab, TabContainer } from '../../../../dist/navigation/tabContainer';
import Dropdown from '../../../../dist/layout/dropdown';
import Dialog from '../../../../dist/layout/dialog';
import Countdown from '../../../../dist/interactive/countdown';
import Stopwatch from '../../../../dist/interactive/stopwatch';
import TimeAgo from '../../../../dist/display/timeago';
import TypeWriter from '../../../../dist/animated/typeWriter';
import CountUp from '../../../../dist/animated/countUp';
import { NotificationSystem, WithNotifications } from '../../../../dist/interactive/notifications';
import PhoneNumber from '../../../../dist/display/phoneNumber';
import withTooltip from '../../../../dist/interactive/tooltip';
import ProgressBar from '../../../../dist/display/progressBar';
import TimedProgressBar from '../../../../dist/display/timedProgressBar';
import PromptSystem,{withPrompt} from '../../../../dist/interactive/prompt';



class _PromptButton extends React.Component{
    onClick = ()=>{
        debugger;
        this.props.prompt('are you ready?')
        .then((response)=>{
            console.log('Prompt response: ', response);
        })
    }
    render(){
        return(
            <button onClick={this.onClick}>{this.props.children}</button>
        )
    }
}
const PromptButton = withPrompt(_PromptButton);


const defaultPredictionData = [
    'hello',
    'world',
    'hello world',
    'hey there',
    'hello world program',
    'stupidly long text stupidly long text stupidly long text stupidly long text',
    'intellisense rocks',
    'auto-complete this'
];

const myStyles = {
    autoComplete: {
        width: '300px'
    }
}

const myOtherStyles = {
    autoComplete: {
        width: '300px'
    },
    autoComplete__suggestions: {
        zIndex: 2,
        backgroundColor: 'white',
        border: '0.75px solid lightskyblue'
    },
    autoComplete__suggestion: {
        border: '0.25px solid grey'
    },
    autoComplete__suggestion_selected: {
        border: '0.75px solid lightskyblue',
        fontWeight: 'bold',
        color: 'lightskyblue'
    }
}


const _Notificator = (props) => {
    const notify = () => {
        props.notify('Hey there has ben an error', 'testApp__notification');
    }
    return (
        <button onClick={notify}>Notify of error</button>
    )
}
const Notificator = WithNotifications(_Notificator);

const TooltippedLink = withTooltip(MemoryLink);

const MyRouter = (props) => {
    return (
        <MemoryRouter
            startingRoute='/'
        >
            <div path='/' exact={true}>
                This is the landing page!
                <TooltippedLink
                    value='carousel'
                    to='/carousel'
                    text='Go to carousel'
                    tooltip='Opens the page with the carousel'
                    className='my-tooltip'
                />
                <MemoryLink
                    value='carousel'
                    to='/carousel'
                    text='Go to carousel'
                />
                <MemoryLink
                    value='tabs'
                    to='/tabs'
                    text='Go to tabs'
                />
                <MemoryLink
                    value='countdown'
                    to='/countdown'
                    text='Go to countdown'
                />
                <Dropdown
                    value='Dropdown Here'
                    options={['first', 'second', 'third', 'fourth']}
                    useInlineStyles={true}
                >

                </Dropdown>
            </div>
            <div path='/notFound'>
                Sorry, the content you asked for was not found
                <MemoryLink
                    to='/'
                    text='Return to landing page'
                />
            </div>
            <div path='/carousel'>
                <LinkedCarousel
                    startingElement={-15}
                    onElementChange={(currentIndex) => {
                        console.log('Changing of element, current one is: ', currentIndex);
                    }}
                >
                    <div>
                        <TypeWriter
                            string='first element, the duration should equal to roughly 350*length'
                            timePerCharacter={35}
                            variance={15}
                            preserve={false}
                        />
                    </div>
                    <div>
                        <TypeWriter
                            string='Second element'
                            timePerCharacter={75}
                            variance={25}
                            preserve={false}
                        />

                    </div>
                    <CarouselImage
                        src="space.jpg"
                        title='The milky way'
                        subtitle='there are a lot of stars there'
                    />
                    <CarouselImage
                        src="lake.jpg"
                        title='A lake'
                        subtitle='it looks cold'
                    />
                    <MemoryLink
                        to='/'
                        text='Return to landing page'
                    />

                </LinkedCarousel>
            </div>
            <div path='/tabs'>
                <TabContainer
                    initialTab='starting'
                    className='dark-tab'
                >
                    <Tab
                        title='starting'
                    >
                        <div>
                            inside the tab
                        </div>
                    </Tab>
                    <Tab
                        title='another'
                    >
                        <div>
                            inside the other tab
                        </div>
                    </Tab>
                    <Tab
                        title='third tab'
                    >
                        <div>
                            inside the third tab
                        </div>
                    </Tab>
                    <Tab
                        title='fourth tab'
                    >
                        <div>
                            inside the fourth tab
                        </div>
                    </Tab>
                </TabContainer>
            </div>
            <div path='/countdown'>
                <Countdown onFinishCountdown={() => console.log('countdown finished!')} />
                <Stopwatch
                    start={0}
                />
            </div>
        </MemoryRouter>
    )

}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: 'Lerooy',
                surname: 'Jenkins'
            },
            isModalOpen: false,
            myStringState: undefined
        };
    }
    advanceProgres = () => {
        this.setState((prevState) => ({
            barProgress: prevState.barProgress + 1
        }));
    }
    onNameChange = (name) => {
        this.setState((prevState) => ({
            formData: {
                name,
                surname: prevState.formData.surname
            }
        }));
    }
    onSurnameChange = (surname) => {
        this.setState((prevState) => ({
            formData: {
                surname,
                name: prevState.formData.name
            }
        }), () => console.log('changed surname state theoretically'));
    }
    toggleModal = () => {
        console.log('before toggling:', this.state);
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }
    closeModal = () => {
        this.setState((prevState) => ({
            isModalOpen: false
        }));
    }
    saveStringState = (state) => {
        console.log('saving state', state);
        this.setState({
            myStringState: state
        });
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <form className='testForm'>
                    <AutoComplete
                        id='nameInput'
                        value={this.state.formData.name}
                        onChange={this.onNameChange}
                        useInlineStyles={true}
                        styles={myStyles}
                        predictionData={defaultPredictionData}
                    />
                    <AutoComplete
                        id='surnameInput'
                        value={this.state.formData.surname}
                        onChange={this.onSurnameChange}
                        useInlineStyles={true}
                        styles={myOtherStyles}
                        predictionData={defaultPredictionData}
                    />
                </form>
                <button type='button' onClick={this.toggleModal}>
                    Toggle dialog
                </button>
                <MyRouter myStringState={this.state.myStringState} saveStringState={this.saveStringState} />
                <Modal
                    className='myModal'
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <div>
                        inside the modal
                    </div>
                    <div>
                        another div inside the modal
                    </div>
                </Modal>
                <div>
                    This page was rendered <TimeAgo time={Date.now()} ms={true} isTimePoint={true} />
                </div>
                <Notificator />
                <CountUp start={0} end={2000} timeSteps={2000} timeStepDuration={1} />
                <div>
                    <PhoneNumber number={639999999} method='spaces' />
                </div>
                <div>
                    <PhoneNumber number={639999999} method='dashes' />
                </div>
                <TimedProgressBar duration={5000} />
                <PromptButton>toggle prompt</PromptButton>
            </div>
        )
    }
}


//    
const connectedApp = (
    <NotificationSystem>
        <PromptSystem>
            <App />
        </PromptSystem>
    </NotificationSystem>
)
const appRoot = document.getElementById('app');
ReactDOM.render(connectedApp, appRoot);




/*
<Dialog
className='myModal'
isOpen={this.state.isModalOpen}
onClose={this.closeModal}
onClickOption={(option) => {
    console.warn(`an option was clicked: ${option}`);
    this.closeModal();
}}
options={['attack', 'heal', 'cast fireball', 'flee']}
title='What action will you take?'
description='remember, you can only select one, so choose wisely!'
>
</Dialog>*/