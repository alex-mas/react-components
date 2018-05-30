/// <reference types="react" />
import React from 'react';
import { RouterContext } from './router';
export interface BrowserLinkProps {
    children: React.ReactNode;
    to: string;
    text?: string;
}
export interface BrowserHistory {
    back(): void;
    forward(): void;
    pushState(newNode: string): void;
    location(): void;
    editState(editedState: string): void;
}
export declare const BrowserHistoryContext: React.Context<BrowserHistory>;
export declare class BrowserLink extends React.Component<BrowserLinkProps, any> {
    render(): JSX.Element;
}
export interface BrowserRouterProps {
    history: BrowserHistory;
    startingRoute: string;
}
export interface BrowserRouterState {
    history: string[];
    currentPosition: number;
}
export declare class BrowserRouter extends React.Component<BrowserRouterProps, BrowserRouterState> {
    history: React.Context<any>;
    constructor(props: any);
    back: () => void;
    forward: () => void;
    pushState: (newNode: string) => void;
    location: () => string;
    editState: (editedNode: string) => void;
    getBrowserHistory: () => BrowserHistory;
    componentWillReceiveProps(nextProps: any): void;
    strategy: (childProps: any, routerContext: RouterContext, index: number) => boolean;
    render(): JSX.Element;
}
export interface WithHistoryContextFunction {
    (params: any): React.SFC<any>;
}
export declare const WithHistoryContext: WithHistoryContextFunction;
export interface BrowserRouteProps {
    history: BrowserHistory;
    path: string;
    exact: boolean;
    component?: React.ComponentClass<any> | React.SFCFactory<any> | any;
    children?: any;
}
export declare const BrowserRoute: React.StatelessComponent<any>;
export default BrowserRouter;
