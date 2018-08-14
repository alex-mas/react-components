import React, { Provider, Consumer } from 'react';
import Router, { RouterContext } from './router';
import cloneDeep from 'lodash.clonedeep';


export interface BrowserLinkProps {
    children: React.ReactNode,
    to: string,
    text?: string
}

export interface BrowserHistory {
    back(): void;
    forward(): void;
    go(delta: number): void;
    pushState(newNode: string): void;
    location(): void;
    replaceState(replacedNode: string): void;
}
export const BrowserHistoryContext: React.Context<BrowserHistory> = React.createContext(undefined);

export class BrowserLink extends React.Component<BrowserLinkProps, any>{
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
    history: string[],
    startingRoute?: string
}

export interface BrowserRouterState {
    history: string[];
    currentPosition: number;
}


export class BrowserRouter extends React.Component<BrowserRouterProps, BrowserRouterState>{
    history: React.Context<any>
    constructor(props: BrowserRouterProps) {
        super(props);
        let startingRoute = window.location.pathname;
        if (props.startingRoute) {
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
    go = (delta: number) =>{
        if(delta > 0){
            this.setState((prevState)=>({
                currentPosition: Math.min(prevState.currentPosition+delta, prevState.history.length)
            }));
        }else if(delta < 0){
            this.setState((prevState)=>({
                currentPosition: Math.max(prevState.currentPosition-delta, 0)
            }));
        }
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
            this.setState((prevState: BrowserRouterState) => ({
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
    _replaceState = (editedNode: string) => {
        console.log('editing current state');
        if (editedNode !== this.location()) {
            this.setState((prevState: BrowserRouterState) => {
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
            go: this.go,
            pushState: this.pushState,
            location: this.location,
            replaceState: this._replaceState
        }
    }
    componentWillReceiveProps(nextProps: BrowserRouterProps) {
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


export interface WithHistoryContextFunction {
    (props: any): React.SFC<any>
}

export const WithHistoryContext: WithHistoryContextFunction = (Component: React.ComponentClass<any> | React.SFCFactory<any>) => {
    return (props: any) => (
        <BrowserHistoryContext.Consumer>
            {history => <Component history={history} {...props} />}
        </BrowserHistoryContext.Consumer>
    )
}

export interface BrowserRouteProps {
    history: BrowserHistory,
    path: string,
    exact: boolean,
    component?: React.ComponentClass<any> | React.SFCFactory<any> | any,
    children?: any

}

const _BrowserRoute: React.SFC<BrowserRouteProps> = (props: BrowserRouteProps) => {
    console.log(props);
    if (props.children) {
        return _BrowserRoute({
            history: props.history,
            path: props.path,
            exact: props.exact,
            component: (
                <div>
                    {props.children}
                </div>
            )
        })
    } else if (props.component) {
        return <props.component history={props.history} path={props.path} exact={props.exact} />;
    }
}
export const BrowserRoute = WithHistoryContext(_BrowserRoute);

export default BrowserRouter;