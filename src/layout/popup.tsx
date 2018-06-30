import React, { CSSProperties } from 'react';
import Modal, {ModalProps,ModalState} from './modal';




export class PopUp extends Modal{
    render() {
        if (this.props.isOpen || this.state.isInTransition) {
            let overlayClassName = 'axc-popup__overlay';
            if (this.state.isInTransition) {
                if (this.props.isOpen) {
                    overlayClassName += '--opening';

                } else {
                    overlayClassName += '--closing';
                }
            }
            let bodyClassName = 'axc-popup__body';
            if (this.props.className) {
                bodyClassName = this.props.className;
            }
            return (
                <div className={overlayClassName} onClick={this.handleClickOutsideModal}>
                    <div className={bodyClassName} onClick={this.handleClickInsideModal}>
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }
}


export default PopUp;