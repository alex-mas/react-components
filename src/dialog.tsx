import React, { CSSProperties } from 'react';
import Modal from './modal';


export interface DialogProps {
    options: string[],
    title: string
    description?: string,
    className?: string,
    buttonClass?: string,
    isOpen: boolean,
    onClickOption(option: string): any
    onOpen?(): any
    onClose(): any
}


interface DialogOptionProps {
    option: string,
    className?: string
    onClick(option: string): void
}
class DialogOption extends React.Component<DialogOptionProps, any>{
    onClick = (evt: React.MouseEvent<any>) => {
        evt.preventDefault();
        this.props.onClick(this.props.option);
    }
    shouldComponentUpdate(nextProps: DialogOptionProps) {
        if (
            nextProps.option !== this.props.option ||
            nextProps.className !== this.props.className
        ) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        return (
            <button
                className={this.props.className ? this.props.className : 'axc-dialog__option'}
                onClick={this.onClick}
            >
                {this.props.option}
            </button>
        );
    }

}

export class Dialog extends React.Component<DialogProps,void> {
    render() {
        return (
            <Modal
                className={this.props.className ? this.props.className : 'axc-dialog'}
                isOpen={this.props.isOpen}
                delay={true}
                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
            >
                <div className='axc-dialog__title'>
                    {this.props.title}
                </div>
                <div className='axc-dialog__description'>
                    {this.props.description}
                </div>
                <div className='axc-dialog__options'>
                    {this.props.options ? this.props.options.map((option, index) => {
                        return (
                            <DialogOption
                                key={option}
                                option={option}
                                onClick={this.props.onClickOption}
                                className={this.props.buttonClass}
                            />
                        )
                    })
                    : 
                    <button onClick={this.props.onClose}>Exit</button>
                    }
                </div>

            </Modal>
        )
    }
}


export default Dialog;