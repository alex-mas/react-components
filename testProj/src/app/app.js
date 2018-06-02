import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../../../dist/autoComplete';
import Modal from '../../../dist/modal';
import Carousel, { LinkedCarousel } from '../../../dist/carousels/carousel';
import Router from '../../../dist/router';
import BrowserRouter, { BrowserLink } from '../../../dist/browserRouter';
import TypeWritter from '../../../dist/typeWriter';
import AlexComponents from '../../../dist/index';

console.log(AlexComponents);
console.log(typeof AlexComponents);



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
            history={['/', '/notFound']}
            startingRoute={'/'}
        >
            <div path='/' exact={true}>
                Hello, this is the landing page!
                <BrowserLink
                    to='/carousel'
                    text='Go to carousel'
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
                    autoPlay={1500}
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
                    <div>
                        Third element
                    </div>
                    <BrowserLink
                        to='/'
                        text='Return to landing page'
                    />

                </LinkedCarousel>
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
    saveStringState = (state)=>{
        console.log('saving state',state);
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
                    />
                    <AutoComplete
                        id='surnameInput'
                        value={this.state.formData.surname}
                        onChange={this.onSurnameChange}
                        useInlineStyles={true}
                        styles={myOtherStyles}
                    />
                </form>
                <button type='button' onClick={this.toggleModal}>
                    Toggle modal
                </button>
                {window.location.hash ?
                    null
                    :
                    <button type='button' onClick={() => { window.location.hash = '/home' }}>
                        Go to landing page
                    </button>
                }
                <MyRouter myStringState={this.state.myStringState} saveStringState={this.saveStringState} />
                <Modal
                    className='myModal'
                    delay={true}
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <div>
                        {this.state.formData.name} - {this.state.formData.surname}
                    </div>
                    <div>
                        Body!
                    </div>
                    <button type='button' onClick={this.toggleModal}>Close!</button>
                </Modal>
            </div>
        )
    }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<App />, appRoot);




