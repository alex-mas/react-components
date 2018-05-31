import React from 'react';

export interface TypeWriterProps {
    string: string,
    timePerCharacter?: number,
    variance?: number,
    preserve?: boolean,
    saveState?(state: TypeWriterState): void
    savedState?: TypeWriterState
}
export interface TypeWriterState {
    currentCharacter: number
    displayString: string
    timer: NodeJS.Timer
}

export class TypeWriter extends React.Component<TypeWriterProps, TypeWriterState>{
    public static defaultProps: TypeWriterProps = {
        string: '',
        timePerCharacter: 150,
        variance: 35,
        preserve: false
    }
    constructor(props) {
        super(props);
        if (this.props.savedState) {
            this.state = this.props.savedState;
        } else {
            this.state = {
                currentCharacter: 0,
                displayString: '',
                timer: undefined
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.string !== nextProps.string ||
            this.state.displayString !== nextState.displayString
        ) {
            return true;
        } else {
            return false;
        }
    }
    resetState = () => {
        this.setState(() => ({
            currentCharacter: 0,
            displayString: ''
        }));
    }
    componentWillUnmount() {
        if (this.props.preserve) {
            this.props.saveState(this.state);
        }
        clearTimeout(this.state.timer);

    }
    componentDidMount() {
        this.renderString();
    }
    getNextTimeDelay = () => {
        return this.props.timePerCharacter + (this.props.variance * (Math.random() * 2 - 1));
    }
    renderCharacter = () => {
        if (this.state.currentCharacter <= this.props.string.length - 1) {
            setTimeout(this.renderCharacter, this.getNextTimeDelay());
            this.setState((prevState) => ({
                displayString: prevState.displayString + this.props.string.charAt(this.state.currentCharacter),
                currentCharacter: prevState.currentCharacter + 1
            }));
        }
    }
    renderString = () => {
        setTimeout(this.renderCharacter, this.getNextTimeDelay());
    }
    render() {
        return this.state.displayString;
    }
}



export default TypeWriter;