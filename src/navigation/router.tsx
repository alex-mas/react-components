import React, { ReactChild, ReactElement, } from 'react';



export interface RouterState {
    activeRoute: string
}

export interface RouterProps {
    children?: any,
    strategy?(childProps: any, routerContext: RouterContext, index: number): boolean,
    bootstrap?(child: React.ReactElement<any>, routerContext: RouterContext, index: number): React.ReactElement<any>,
    activeRoute?: string,
    className?: string,
    singleRoute?: boolean
}

export interface RouterContext {
    state: RouterState;
    props: RouterProps;
};


export class Router extends React.Component<RouterProps, RouterState>{
    state: RouterState
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            activeRoute: this.props.activeRoute
        };
    }
    changeRoute = (newRoute: string): void => {
        this.setState((prevState: RouterState) => ({
            activeRoute: newRoute
        }));
    }
    bootstrapProps = (elmnt: React.ReactElement<any>): React.ReactElement<any> => {
        if (typeof elmnt === 'object') {
            return React.cloneElement(elmnt, { changeRoute: this.changeRoute });
        } else {
            return elmnt;
        }
    }
    render() {
        console.log('routes re-rendered');
        const matchingChildren = React.Children.map(this.props.children, (child: ReactChild, i: number) => {
            if (typeof child === 'object') {
                const routertContext = { state: this.state, props: this.props };
                if (this.props.bootstrap) {
                    child = this.props.bootstrap(child, routertContext, i);
                }
                if (this.props.strategy) {
                    const strategyOutput = this.props.strategy(child.props, routertContext, i);
                    if (strategyOutput) {
                        return child;
                    }
                } else if (this.state.activeRoute) {
                    if (!child.props || !child.props.match) {
                        return this.bootstrapProps(child);

                    } else if (child.props.match === this.state.activeRoute) {
                        return this.bootstrapProps(child);
                    }
                }
                else {
                    return child;
                }
            } else {
                return child;
            }

        });
        if (this.props.singleRoute) {
            return React.Children.map(matchingChildren, (child: ReactChild, i: number) => {
                if (i === 0) {
                    return child;
                } else {
                    return null;
                }
            });
        }else{
            return  matchingChildren;
        }
    }
}


export default Router;





