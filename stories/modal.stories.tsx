import React from 'react';
import "../src/styles/index.scss";
import Modal from '../src/modal';
import { storiesOf } from '@storybook/react';


interface BasicModalProps {

}
interface BasicModalState {
    isModalOpen: boolean
}

class BasicModal extends React.Component<BasicModalProps, BasicModalState>{
    constructor(props: BasicModalProps) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }
    closeModal = () => {
        this.setState(() => ({
            isModalOpen: false
        }));
    }
    openModal = () => {
        this.setState(() => ({
            isModalOpen: true
        }));
    }
    render() {
        return (
            <div className='modal-showcase'>
                <button
                    onClick={this.openModal}
                    className='modal-showcase__button'
                >
                    open modal
                </button>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <div>
                        <span>Click the button to close the modal</span>
                        <span>You can click outside to close it too</span>
                        <button onClick={this.closeModal}>Click me!</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

storiesOf('Modal', module)
    .add('basic', () => (
        <BasicModal />
    ))
