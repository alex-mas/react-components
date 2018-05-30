import React, { Provider, Consumer } from 'react';
import Router, { RouterContext } from './router';
import cloneDeep from 'lodash.clonedeep';


export interface LinkProps {
    children: React.ReactNode,
    to: string,
    text?: string
}

export interface BrowserHistory {
    back(): void;
    forward(): void;
    pushState(newNode: string): void;
    location(): void;
    editState(editedState: string): void;
}
export const BrowserHistoryContext: React.Context<BrowserHistory> = React.createContext(undefined);

export class BrowserLink extends React.Component<LinkProps, any>{
    render() {
        return (
            <BrowserHistoryContext.Consumer>
                {history => (
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            history.pushState(this.props.to);
                        }}
                    >
                        {this.props.text}
                    </a>
                )
                }
            </BrowserHistoryContext.Consumer>
        )
    }
}

export interface BrowserRouterProps {
    history: BrowserHistory,
    startingRoute: string
}

export interface BrowserRouterState {
    history: string[];
    currentPosition: number;
}


export class BrowserRouter extends React.Component<BrowserRouterProps, BrowserRouterState>{
    history: React.Context<any>
    constructor(props) {
        super(props);

        let startingRoute = '/';
        if (props.startingRoute !== undefined) {
            startingRoute = props.startingRoute;
        }

        let history = [startingRoute];
        let currentPosition = 0;
        if (props.history) {
            history = props.history;
            if (history.indexOf(startingRoute) > -1) {
                currentPosition = history.indexOf(startingRoute);
            }

        }
        this.state = {
            history: [startingRoute],
            currentPosition: 0
        };
        this.history = React.createContext(this.getBrowserHistory());
    }
    back = () => {
        if (this.state.currentPosition > 0) {
            this.setState((prevState) => ({
                currentPosition: prevState.currentPosition - 1
            }));
        }
    }
    forward = () => {
        if (this.state.currentPosition < this.state.history.length - 1) {
            this.setState((prevState) => ({
                currentPosition: prevState.currentPosition + 1
            }));
        }
    }
    pushState = (newNode: string) => {
        if (newNode !== this.location()) {
            this.setState((prevState) => ({
                currentPosition: prevState.history.length,
                history: [...prevState.history, newNode]
            }));
        }
    }
    location = () => {
        return this.state.history[this.state.currentPosition];
    }
    editState = (editedNode: string) => {
        console.log('editing current state');
        if (editedNode !== this.location()) {
            this.setState((prevState) => {
                const newState = cloneDeep(prevState);
                newState.history[prevState.currentPosition] = editedNode;
                return newState;
            });
        }
        console.log(this.location());
    }
    getBrowserHistory = (): BrowserHistory => {
        return {
            back: this.back,
            forward: this.forward,
            pushState: this.pushState,
            location: this.location,
            editState: this.editState
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('browser router is getting new props: ', nextProps);
    }
    strategy = (childProps: any, routerContext: RouterContext, index: number) => {
        const location = this.location();
        if (childProps.exact) {
            if (childProps.path === location) {
                return true;
            } else {
                return false;
            }
        } else {
            if (location.includes(childProps.path)) {
                return true;
            } else {
                return false;
            }
        }
    }
    render() {
        return (
            <BrowserHistoryContext.Provider value={this.getBrowserHistory()}>
                <Router
                    strategy={this.strategy}
                >
                    {React.Children.map(this.props.children, (child: React.Component<any> | any, index: number) => {
                        return (
                            React.cloneElement(child, { history: this.history })
                        );

                    })}
                </Router>
            </BrowserHistoryContext.Provider>
        )
    }
}


export const WithHistoryContext: React.SFC<any> = (Component)=>{
    return(
        <BrowserHistoryContext.Consumer>
            {history=><Component history={history}/>}
        </BrowserHistoryContext.Consumer>
    )
}

export default BrowserRouter;