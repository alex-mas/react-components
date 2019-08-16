import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
export interface ModalState {
    isOpen: boolean,
    isInTransition: boolean
}

export interface ModalProps {
    isOpen: boolean,
    onClose(...args: any[]): void,
    children?: any,
    delay?: boolean,
    className?: string,
    onOpen?(): void,
    root?: Element
}



export class Modal extends React.Component<ModalProps, ModalState>{
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            isInTransition: false
        };
        this.handleClickOutsideModal = this.handleClickOutsideModal.bind(this);
        this.handleClickInsideModal = this.handleClickInsideModal.bind(this);
        this.transition = this.transition.bind(this);
    }
    handleClickOutsideModal(event: React.MouseEvent<any>) {
        if(!event.isPropagationStopped()){
            this.props.onClose();
        }
    }
    handleClickInsideModal(event: React.MouseEvent<any>) {
        event.stopPropagation();
    }
    transition(delay: number) {
        if (this.props.isOpen && this.props.onOpen) {
            this.props.onOpen();
        }
        setTimeout(() => {
            this.setState({
                isInTransition: false
            });
        }, delay);
    }
    componentWillReceiveProps(nextProps: ModalProps) {
        if (nextProps.isOpen !== this.props.isOpen) {
            if (this.props.delay) {
                this.setState(() => ({ isInTransition: true }), () => {
                    this.transition(500);
                });
            }
        }
    }
    getOverlayClassName = ()=>{
        let overlayClassName = 'axc-modal__overlay';
        if (this.state.isInTransition) {
            if (this.props.isOpen) {
                overlayClassName += '--opening';

            } else {
                overlayClassName += '--closing';
            }
        }
        return overlayClassName;
    }
    getBodyClassName = ()=>{
        let bodyClassName = 'axc-modal__body';
        if (this.props.className) {
            bodyClassName = this.props.className;
        }
        return bodyClassName;
    }
    renderModal = ()=>{
        return (
            <div className={this.getOverlayClassName()} onClick={this.handleClickOutsideModal}>
                <div className={this.getBodyClassName()} onClick={this.handleClickInsideModal}>
                    {this.props.children}
                </div>
            </div>
        );
    }
    render() {
        if (this.props.isOpen || this.state.isInTransition) {
            if(this.props.root){
                return ReactDOM.createPortal(
                    this.renderModal(),
                    this.props.root
                )
            }else{
                return this.renderModal();
            }

        } else {
            return null;
        }

    }
}


export default Modal;