import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from '../../../dist/autoComplete';



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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: 'Alex',
                surname: 'Mas'
            }
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
    render() {
        console.log(this.state);
        return (
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
        )
    }
}

const appRoot = document.getElementById('app');
ReactDOM.render(<App />, appRoot);




