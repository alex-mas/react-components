import React, { Provider, Consumer, ReactChild } from 'react';
import Router, { RouterContext } from './router';
//@ts-ignore
import cloneDeep from 'lodash.clonedeep';


export interface MemoryLinkProps {
    to: string,
    text?: string
}


export interface MemoryHistory {
    back(): void;
    forward(): void;
    go(delta: number): void;
    pushState(newNode: string): void;
    location(): void;
    replaceState(replacedNode: string): void;
}




export const MemoryHistoryContext: React.Context<MemoryHistory> = React.createContext({
    back: () =>{},
    forward: () =>{},
    go: (delta:number) =>{},
    pushState: (newNode: string) =>{},
    location: ()=>{},
    replaceState: (replacedNMode: string)=>{}
});

export class MemoryLink extends React.Component<MemoryLinkProps, any>{
    render() {
        return (
            <MemoryHistoryContext.Consumer>
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
            </MemoryHistoryContext.Consumer>
        )
    }
}

export interface MemoryRouterProps {
    history?: string[],
    startingRoute?: string
    children?: any
}

export interface MemoryRouterState {
    history: string[];
    currentPosition: number;
}

/**
 * Simple specialization of Router who's route management emulates HTML5 history api. Keep in mind that this router doesn't use or alter the Memory history, instead it keeps it state separate from it.
 * 
 */
export class MemoryRouter extends React.Component<MemoryRouterProps, MemoryRouterState>{
    constructor(props: MemoryRouterProps) {
        super(props);
        let startingRoute = window.location.pathname;
        if (props.startingRoute) {
            startingRoute = props.startingRoute;
        }

        let history: string[];
        let currentPosition = 0;
        if (props.history) {
            history = props.history;
            if (history.indexOf(startingRoute) > -1) {
                currentPosition = history.indexOf(startingRoute);
            }
        } else {
            history = [startingRoute];
        }
        this.state = {
            history,
            currentPosition
        };
    }
    go = (delta: number) => {
        if (delta > 0) {
            this.setState((prevState) => ({
                currentPosition: Math.min(prevState.currentPosition + delta, prevState.history.length)
            }));
        } else if (delta < 0) {
            this.setState((prevState) => ({
                currentPosition: Math.max(prevState.currentPosition - delta, 0)
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
            this.setState((prevState: MemoryRouterState) => ({
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
        if (editedNode !== this.location()) {
            this.setState((prevState: MemoryRouterState) => {
                const newState = cloneDeep(prevState);
                newState.history[prevState.currentPosition] = editedNode;
                return newState;
            });
        }
    }
    getMemoryHistory = (): MemoryHistory => {
        return {
            back: this.back,
            forward: this.forward,
            go: this.go,
            pushState: this.pushState,
            location: this.location,
            replaceState: this._replaceState
        }
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
            <MemoryHistoryContext.Provider value={this.getMemoryHistory()}>
                <Router
                    strategy={this.strategy}
                    bootstrapProps={false}
                >
                    {React.Children.map(this.props.children, (child: ReactChild, index: number) => {
                        if (typeof child === 'object') {
                            return React.cloneElement(child, { history: this.getMemoryHistory() });
                        } else {
                            return child;
                        }
                    })}
                </Router>
            </MemoryHistoryContext.Provider>
        )
    }
}



//export type WithHistoryContextFunction<P = any> = (props: Pick<P, Exclude<keyof P, 'history'>>) => JSX.Element;

//export type WithHistoryContextFunction<P = any> = (props: Pick<P, Exclude<keyof P, 'history'>>) => React.ReactElement<Pick<P, Exclude<keyof P, 'history'>>>;
//React.SFC<Pick<P, Exclude<keyof P, 'history'>>>

export function withHistoryContext<P extends any>(Component: React.ComponentClass<P> | React.SFC<P>): React.SFC<Pick<P, Exclude<keyof P, 'history'>>>{
    return (props: Pick<P, Exclude<keyof P, 'history'>>) => (
        <MemoryHistoryContext.Consumer>
            {history => <Component history={history} {...props} />}
        </MemoryHistoryContext.Consumer>
    );

}

export interface MemoryRouteProps {
    history: MemoryHistory,
    path: string,
    exact: boolean,
    component?: React.ComponentClass<any> | React.SFC<any> | string | any,
    children?: any
}

export const _MemoryRoute: React.SFC<MemoryRouteProps> = (props: MemoryRouteProps) => {
    //if route has children recurse and embedd them into the component prop
    if (props.children) {
        return _MemoryRoute({
            history: props.history,
            path: props.path,
            exact: props.exact,
            component: () => (
                <div>
                    {props.children}
                </div>
            )
        });
        //if route has no children and has a component defined render the component with the props bootstrapped to it
    } else if (props.component) {
        const C = props.component;
        return <C history={props.history} path={props.path} exact={props.exact} />;
        //handle incorrect props input
    } else {
        console.error('The Memory route must be provided a component prop or children, else nothing will be rendered');
        return null;
    }
}

export const MemoryRoute = withHistoryContext<MemoryRouteProps>(_MemoryRoute);

export default MemoryRouter;

