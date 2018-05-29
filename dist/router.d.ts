/// <reference types="react" />
import React from 'react';
export interface RouterState {
}
export interface RouterProps {
    children?: any;
    strategy?(childProps: any, routerState: RouterState, index: number): boolean;
    activeRoute?: string;
    className?: string;
}
export declare class Router extends React.Component<RouterProps, RouterState> {
    state: RouterState;
    constructor(props: RouterProps);
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
export default Router;
