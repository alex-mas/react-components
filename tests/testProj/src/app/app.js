
import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../../../../dist/interactive/autoComplete';
import Modal from '../../../../dist/layout/modal';
import Carousel, { LinkedCarousel, CarouselImage } from '../../../../dist/navigation/carousel';
import Router from '../../../../dist/navigation/router';
import BrowserRouter, { BrowserLink, BrowserRoute } from '../../../../dist/navigation/browserRouter';
import AlexComponents from '../../../../dist/index';
import { Tab, TabContainer } from '../../../../dist/navigation/tabContainer';
import Dropdown from '../../../../dist/layout/dropdown';
import Dialog from '../../../../dist/layout/dialog';
import Countdown from '../../../../dist/interactive/countdown';
import Stopwatch from '../../../../dist/interactive/stopwatch';
const TypeWritter = AlexComponents.TypeWritter;




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



const MyRouter = (props) => {
    return (
        <BrowserRouter
            startingRoute={'/'}
        >
            <div path='/' exact={true}>
                This is the landing page!
                    <BrowserLink
                    value='carousel'
                    to='/carousel'
                    text='Go to carousel'
                />
                <BrowserLink
                    value='tabs'
                    to='/tabs'
                    text='Go to tabs'
                />
                <BrowserLink
                    value='countdown'
                    to='/countdown'
                    text='Go to countdown'
                />
            </div>
            <div path='/notFound'>
                Sorry, the content you asked for was not found
                <BrowserLink
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
                        <TypeWritter
                            string='first element, the duration should equal to roughly 350*length'
                            timePerCharacter={35}
                            variance={15}
                            preserve={false}
                        />
                    </div>
                    <div>
                        <TypeWritter
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
                    <BrowserLink
                        to='/'
                        text='Return to landing page'
                    />

                </LinkedCarousel>
                <LinkedCarousel
                    startingElement={-15}
                    onElementChange={(currentIndex) => {
                        console.log('Changing of element, current one is: ', currentIndex);
                    }}
                >
                    <div>
                        <TypeWritter
                            string='first element, the duration should equal to roughly 350*length'
                            timePerCharacter={5}
                            variance={0}
                            preserve={false}
                        />
                    </div>
                    <div>
                        <TypeWritter
                            string='Second element'
                            timePerCharacter={30}
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
                    <BrowserLink
                        to='/'
                        text='Return to landing page'
                    />

                </LinkedCarousel>
                <LinkedCarousel
                    startingElement={-15}
                    onElementChange={(currentIndex) => {
                        console.log('Changing of element, current one is: ', currentIndex);
                    }}
                >
                    <div>
                        <TypeWritter
                            string='first element, the duration should equal to roughly 350*length'
                            timePerCharacter={5}
                            variance={0}
                            preserve={false}
                        />
                    </div>
                    <div>
                        <TypeWritter
                            string='Second element'
                            timePerCharacter={30}
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
                    <BrowserLink
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
        </BrowserRouter>
    )

}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: 'Alex',
                surname: 'Mas'
            },
            isModalOpen: false,
            myStringState: undefined
        };
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

            </div>
        )
    }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<App />, appRoot);




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