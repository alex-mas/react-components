/// <reference types="react" />
import React from 'react';
export interface ModalState {
    isOpen: boolean;
    isInTransition: boolean;
}
export interface ModalProps {
    isOpen: boolean;
    onClose(): void;
    children?: any;
    delay?: boolean;
    className?: string;
    onOpen?(): void;
}
export declare class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps);
    handleClickOutsideModal(event: React.MouseEvent<any>): void;
    handleClickInsideModal(event: React.MouseEvent<any>): void;
    transition(delay: number): void;
    componentWillReceiveProps(nextProps: ModalProps): void;
    render(): JSX.Element;
}
export default Modal;
