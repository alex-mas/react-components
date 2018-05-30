/// <reference types="react" />
import React from 'react';
export interface RouterState {
}
export interface RouterProps {
    children?: any;
    strategy?(childProps: any, routerContext: RouterContext, index: number): boolean;
    activeRoute?: string;
    className?: string;
}
export interface RouterContext {
    state: RouterState;
    props: RouterProps;
}
export declare class Router extends React.Component<RouterProps, RouterState> {
    state: RouterState;
    constructor(props: RouterProps);
    render(): JSX.Element;
}
export default Router;
