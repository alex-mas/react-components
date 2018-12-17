import React from 'react';
import Router, { RouterContext } from './router';
import { doParamsMatch } from './utils/url';
import { MemoryHistory } from './memoryHistory';
import "./utils/configureEnv";


export interface HistoryNode {
    url: string,
    title: string,
    state: any
}

export interface History {
    back(): void;
    forward(): void;
    go(delta: number): void;
    pushState(newState: any, newTitle: string, newNode: string): void;
    location(): HistoryNode;
    replaceState(newState: any, newTitle: string, replacedNode: string): void;
}

export interface HistoryRouterProps {
    history: History,
    singleRoute: boolean,
    startingRoute?: string
}


export const createHistoryContext = <T extends History>(history: T) => React.createContext(history);
export const HistoryContext: React.Context<History> = React.createContext(undefined);


/**
 * 
 * Component that builds on top of the Router component and provides a strategy that looks for the path prop in its children
 * to decide if they should be rendered
 */
export class HistoryRouter extends React.Component<HistoryRouterProps, any>{
    history: History;
    constructor(props: HistoryRouterProps) {
        super(props);
        this.history = props.history || new MemoryHistory({
            url: props.startingRoute,
            title: document.title,
            state: undefined
        });
    }
    getUrlParams = (child: React.ReactElement<any>, routerContext: RouterContext, index: number) => {
        let routeParams = {};
        let childPath = child.props.path;
        if (childPath && childPath.split(':').length > 1) {
            let location = this.history.location().url;
            let routeParamValues = location.slice(location.lastIndexOf('/') + 1).split('&');
            let routeParamIndexes: string[] = child.props.path.slice(child.props.path.lastIndexOf('/') + 1).split(':').slice(1);
            routeParamIndexes.forEach((paramLabel: string, index: number) => {
                routeParams[paramLabel] = routeParamValues[index];
            });
            childPath = child.props.path.slice(0, child.props.path.lastIndexOf('/') + 1);
        }
        return routeParams;

    }
    bootstrap = (child: React.ReactElement<any>, routerContext: RouterContext, index: number) => {
        if (typeof child === "object") {
            const urlParams = this.getUrlParams(child, routerContext, index);
            return React.cloneElement(child, {
                history: this.history,
                urlParams
            });
        } else {
            return child;
        }
    }
    strategy = (childProps: any, routerContext: RouterContext, index: number) => {
        let { url, state } = this.history.location();
        let childPath: string = childProps.path;
        let hasParams = false;
        if (!childProps.path) {
            return true;
        }
        if (childProps.path.split(':').length > 1) {
            //route has params defined
            hasParams = true;
            //this might remove the last part of the route if it doesnt have params and it doesnt end with /
            url = url.slice(0, childProps.path.indexOf(':')); //location.slice(0, location.lastIndexOf('/') + 1);
            childPath = childProps.path.split(':')[0];
        }
        if (childProps.exact) {
            const routeMatches = childPath === url;
            const paramsMatch = doParamsMatch(childProps.path, this.history.location().url);
            if (childProps.exactParams) {
                return routeMatches && paramsMatch;
            } else {
                return routeMatches;
            }
        } else {
            if (url.includes(childPath)) {
                return true;
            } else {
                return false;
            }
        }
    }
    render() {
        return (
            <HistoryContext.Provider value={this.history}>
                <Router
                    strategy={this.strategy}
                    singleRoute={this.props.singleRoute}
                    bootstrap={this.bootstrap}
                >
                    {this.props.children}
                </Router>
            </HistoryContext.Provider>

        )
    }
}

/* - - - - - Auxiliar router components - - - - - */

export interface LinkProps {
    to: string,
    text?: string,
    children?: React.ReactNode
    className?: string,
    title?: string,
    state?: any
}

/**
 * On click navigates to url specified in to prop, you should provide text or children props but not both, 
 * if both are provided text will have preference
 */
export class Link extends React.Component<LinkProps, any>{
    onClick = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        history.pushState(this.props.state, this.props.title,this.props.to);
    }
    render() {
        if(process.env.NODE_ENV === "development"){
            if(this.props.text && this.props.children){
                console.warn(new Error("Link should onl be passed children or text, not both"));
            }
        }
        return (
            <HistoryContext.Consumer>
                {history => (
                    <a
                        className={this.props.className ? this.props.className : 'axc-link'}
                        href=""
                        onClick={this.onClick}
                    >
                        {this.props.text ? this.props.text : this.props.children}
                    </a>
                )
                }
            </HistoryContext.Consumer>
        )
    }
}


/**
 * 
 * Converts the provided component into a consumer of History context, the component will be passed a history prop.
 * 
 */
export function withHistory<P extends any>(Component: React.ComponentClass<P> | React.SFC<P>): React.SFC<Pick<P, Exclude<keyof P, 'history'>>> {
    return (props: Pick<P, Exclude<keyof P, 'history'>>) => (
        <HistoryContext.Consumer>
            {history => <Component history={history} {...props} />}
        </HistoryContext.Consumer>
    );

}




export interface RouteParams {
    [x: string]: string
}

export interface RouteProps {
    history: History,
    path: string,
    exact?: boolean,
    exactParams?: boolean,
    routeParams?: RouteParams
    component?: React.ComponentClass<any> | React.SFC<any> | string | any,
    children?: any
    className?: string
}

const _Route: React.SFC<RouteProps> = (props: RouteProps) => {
    //if route has children recurse and embedd them into the component prop
    if (props.children) {
        return _Route({
            history: props.history,
            path: props.path,
            exact: props.exact,
            exactParams: props.exactParams,
            routeParams: props.routeParams,
            component: () => (
                <div className={props.className ? props.className : 'axc-router__route'}>
                    {props.children}
                </div>
            )
        });
        //if route has no children and has a component defined render the component with the props bootstrapped to it
    } else if (props.component) {
        const C = props.component;
        return <C
            className={props.className ? props.className : ''}
            history={props.history}
            path={props.path}
            exact={props.exact ? props.exact : false}
            routeParams={props.routeParams}
        />;
    } else {
        if(process.env.NODE_ENV === "development"){
            console.warn('The route must be provided a component prop or children, else nothing will be rendered', new Error());
        }
        return null;
    }
}
/**
 * 
 * Component designed to be rendered as a direct child of a router component
 * 
 */
export const Route = withHistory<RouteProps>(_Route);