import React, { CSSProperties, Children } from 'react';

const defaultPredictionData: string[] = [];


export interface DropdownProps {
    children?: any
    className?: string,
    useInlineStyles?: boolean,
    options?: string[],
    default: string,
    onSelect(index: number, value: string): any,
    component?: React.ComponentClass<any> | React.SFC<any>
    value?: any
}


export interface DropdownState {
    selectedOption: number,
    focused: boolean
}

//TODO: right now the element vanishes once the user attempts to select the options, need to detect that the focus is in fact not leaving the element

interface DropdownOptionProps {
    value?: string,
    component?: any
    index: number,
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
            focused: false
        };
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
        this.props.onSelect(optionIndex, optionValue);
    }
    onHoverOption = (optionIndex: number, optionValue: string) => {
        this.setState((prevState) => ({
            selectedOption: optionIndex
        }));
    }
    onKeyDown(event: React.KeyboardEvent<any>): void {
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
                <div className='axc-dropdown'>
                    <div className='axc-dropdown__component'
                        onMouseEnter={this.onHover}
                        onMouseLeave={this.onHoverEnd}
                    >
                        {this.props.component ?
                            <this.props.component />
                            :
                            this.props.value ? this.props.value : this.props.default
                        }
                    </div>
                    {this.isFocused() ?
                        <div className='axc-dropdown__options'>
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