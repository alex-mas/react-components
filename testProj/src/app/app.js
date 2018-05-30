import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../../../dist/autoComplete';
import Modal from '../../../dist/modal';
import Carousel from '../../../dist/carousel';
import Router from '../../../dist/router';
import BrowserRouter, {BrowserLink}from '../../../dist/browserRouter';
import BrowserHistory from '../../../dist/browserHistory';



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


const myHistory = new BrowserHistory({ path: '/', title: document.title });


const MyRouter = (props) => {
    return (
        <BrowserRouter
            history={['/','/notFound']}
            startingRoute={'/notFound'}
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
                <Carousel
                    startingElement={-15}
                    onElementChange={(currentIndex) => {
                        console.log('Changing of element, current one is: ', currentIndex);
                    }}
                    autoPlay={2000}
                >
                    <div>
                        First element
                    </div>
                    <div>
                        Second element
                    </div>
                    <div>
                        Third element
                    </div>
                    <BrowserLink
                        to='/'
                        text='Return to landing page'
                    />

                </Carousel>
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
            isModalOpen: false
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
    render() {
        console.log(this.state);

        return (
            <div>
                <div> Current location: {myHistory.location().path}</div>
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
                <MyRouter/>
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




