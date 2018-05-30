/// <reference types="react" />
import React from 'react';
export interface LinkProps {
    children: React.ReactNode;
    to: string;
    text?: string;
}
export declare class Link extends React.Component<LinkProps, any> {
    render(): JSX.Element;
}
export default Link;
