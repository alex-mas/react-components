import React, { CSSProperties, Children } from 'react';
import uuid from 'uuid/v4';

const defaultPredictionData: string[] = [];


export interface DropdownProps {
    children?: any
    className?: string,
    styles?: DropdownStyles,
    useInlineStyles?: boolean,
    options?: string[],
    onSelect(index: number, value: string): any,
    component?: React.ComponentClass<any> | React.SFCFactory<any>
    value?: any
}


export interface DropdownState {
    selectedOption: number,
    focused: boolean,
    styles: DropdownStyles
}

export interface DropdownStyles {
    [key: string]: CSSProperties | undefined,
    dropdown?: CSSProperties,
    dropdown_element?: CSSProperties,
    dropdown__options?: CSSProperties,
    dropdown__option?: CSSProperties,
    dropdown__option_selected?: CSSProperties
}

let defaultStyles: DropdownStyles = {
    dropdown: {
        position: 'relative',
        width: '173px'
    },
    dropdown__element: {
        maxWidth: 'inherit',
        width: 'inherit'
    },
    dropdown__options: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        border: '0.5px solid black'
    },
    dropdown__option: {
        border: '0.25px solid grey'
    },
    dropdown__option_selected: {
        border: '0.5px solid black',
        fontWeight: 'bold'
    }
}

//TODO: right now the element vanishes once the user attempts to select the options, need to detect that the focus is in fact not leaving the element

interface DropdownOptionProps {
    value?: string,
    component?: any
    index: number,
    style?: CSSProperties,
    onClick(optionIndex: number, optionValue: string): any,
    onHover(optionIndex: number, optionValue: string): any,
    onFocus(optionIndex: number): any,
    className: string
}

class DropdownOption extends React.PureComponent<DropdownOptionProps, any>{
    onClick = (event: React.MouseEvent<any>) => {
        const value = this.props.value === undefined ? this.props.component.props.value : this.props.value;
        this.props.onClick(this.props.index, value);
    }
    onMouseEnter = (event: React.MouseEvent<any>) => {
        const value = this.props.value === undefined ? this.props.component.props.value : this.props.value;
        this.props.onHover(this.props.index, value);
    }
    onMouseLeave = (event: React.MouseEvent<any>) => {
        this.props.onFocus(-1);
    }
    onFocus = ()=>{
        this.props.onFocus(this.props.index);
    }
    onBlur = ()=>{
        this.props.onFocus(-1);
    }
    render() {
        return (
            <div
                className={this.props.className}
                style={this.props.style}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            >
                {this.props.value ? this.props.value : this.props.component}
            </div>
        )

    }

}


export class Dropdown extends React.Component<DropdownProps, DropdownState>{
    constructor(props: DropdownProps) {
        super(props);
        this.state = {
            selectedOption: -1,
            focused: false,
            styles: {
                dropdown: {
                },
                dropdown__element: {
                },
                dropdown__options: {
                },
                dropdown__option: {
                },
                dropdown__option_selected: {
                }
            }
        };
        //style initialization 
        if (props.useInlineStyles) {
            if (props.styles) {
                for (let key in this.state.styles) {
                    if (this.state.styles.hasOwnProperty(key)) {
                        this.state.styles[key] = {
                            ...defaultStyles[key],
                            ...props.styles[key]
                        };
                    }
                }
            } else {
                for (let key in this.state.styles) {
                    if (this.state.styles.hasOwnProperty(key)) {
                        this.state.styles[key] = {
                            ...defaultStyles[key]
                        };
                    }
                }
            }
        }
        this.onHover = this.onHover.bind(this);
        this.onHoverEnd = this.onHoverEnd.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOption = this.onFocusOption.bind(this);
        this.isFocused = this.isFocused.bind(this);
    }

    shouldComponentUpdate(nextProps: DropdownProps, nextState: DropdownState) {
        if (
            nextState.focused !== this.state.focused ||
            nextState.selectedOption !== this.state.selectedOption ||
            nextProps.options.length || this.props.options.length
        ) {
            return true;
        } else {
            return false;
        }
    }
    onClickOption = (optionIndex: number, optionValue: string) => {
        console.log('clicked a option, changing the value');
        this.props.onSelect(optionIndex, optionValue);
    }
    onHoverOption = (optionIndex: number, optionValue: string) => {
        console.log('hovered over a option, changing the selected option');
        this.setState((prevState) => ({
            selectedOption: optionIndex
        }));
    }
    onKeyDown(event: React.KeyboardEvent<any>): void {
        console.log('handling key down events', event);
        if (this.state.focused) {
            if (event.keyCode === 40 && this.state.selectedOption < this.props.options.length - 1) {
                this.setState((prevState) => ({
                    selectedOption: prevState.selectedOption + 1
                }));
            } else if (event.keyCode === 38 && this.state.selectedOption > -1) {
                this.setState((prevState) => ({
                    selectedOption: prevState.selectedOption - 1
                }));
            } else if (event.keyCode === 13 && this.state.selectedOption > -1) {
                this.props.onSelect(this.state.selectedOption, this.props.options[this.state.selectedOption]);
            } else if (event.keyCode === 27) {
                this.setState((prevState) => ({
                    selectedOption: -1
                }));
            } else if (event.keyCode === 9 && this.state.selectedOption > -1) {
                event.preventDefault();
                if (this.state.selectedOption < this.props.options.length - 1) {
                    this.setState((prevState) => ({
                        selectedOption: prevState.selectedOption + 1
                    }));
                } else {
                    this.setState(() => ({
                        selectedOption: 0
                    }));
                }
            }
        }
    }
    onFocus(event: React.FocusEvent<any>) {
        this.setState(() => ({
            focused: true
        }));
    }
    onBlur(event: React.FocusEvent<any>) {
        setTimeout(() => {
            if (this.state.selectedOption === -1) {
                this.setState(() => ({
                    focused: false
                }));
            }
        }, 150);
    }
    onHover(event: React.MouseEvent<any>) {
        this.setState(() => ({
            focused: true
        }))
    }
    onHoverEnd(event: React.MouseEvent<any>) {
        setTimeout(() => {
            if (this.state.selectedOption === -1) {
                this.setState(() => ({
                    focused: false
                }));
            }
        }, 150);
    }
    onFocusOption(option) {
        if (option){
            this.setState(()=>({
                selectedOption: option
            }));
        }
    }
    isFocused(): boolean {
        return this.state.selectedOption > -1 || this.state.focused;
    }
    render() {
        return (
            <div
                className={this.props.className ? this.props.className : undefined}
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            >
                <div className='axc-dropdown' style={this.state.styles.dropdown}>
                    <div className='axc-dropdown__component'
                        onMouseEnter={this.onHover}
                        onMouseLeave={this.onHoverEnd}
                    >
                        {this.props.component ?
                            <this.props.component />
                            :
                            this.props.value
                        }
                    </div>
                    {this.isFocused() ?
                        <div className='axc-dropdown__options' style={this.state.styles.dropdown__options}>
                            {this.props.children ?
                                React.Children.map(this.props.children, (child: any, index: any) => {
                                    const selected: boolean = index === this.state.selectedOption
                                    let className: string = 'axc-dropdown__option';
                                    if (selected) {
                                        className += '--selected';
                                    }
                                    return <DropdownOption
                                        component={child}
                                        key={child.value}
                                        className={className}
                                        index={index}
                                        style={selected ?
                                            this.state.styles.dropdown__option_selected
                                            :
                                            this.state.styles.dropdown__option
                                        }
                                        onFocus={this.onFocusOption}
                                        onClick={this.onClickOption}
                                        onHover={this.onHoverOption}
                                    />
                                })
                                :
                                this.props.options.map((option: string, index: number) => {
                                    const selected: boolean = index === this.state.selectedOption
                                    let className: string = 'axc-dropdown__option';
                                    if (selected) {
                                        className += '--selected';
                                    }
                                    return (
                                        <DropdownOption
                                            key={option}
                                            value={option}
                                            className={className}
                                            index={index}
                                            style={selected ?
                                                this.state.styles.dropdown__option_selected
                                                :
                                                this.state.styles.dropdown__option
                                            }
                                            onClick={this.onClickOption}
                                            onHover={this.onHoverOption}
                                            onFocus={this.onFocusOption}
                                        />
                                    )

                                })

                            }

                        </div>
                        :
                        undefined
                    }
                </div>
            </div>
        )
    }
}



export default Dropdown;