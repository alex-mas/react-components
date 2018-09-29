import React, { ReactChild, ReactElement, } from 'react';



export interface RouterState {
}

export interface RouterProps {
    children?: any,
    strategy?(childProps: any, routerContext: RouterContext, index: number): boolean,
    bootstrap?(child: React.ReactElement<any>, routerContext: RouterContext, index: number): React.ReactElement<any>,
    activeRoute?: string,
    className?: string,
    bootstrapProps?: boolean
}

export interface RouterContext {
    state: RouterState;
    props: RouterProps;
};


export class Router extends React.Component<RouterProps, RouterState>{
    state: RouterState
    static defaultProps: Partial<RouterProps> = {
        bootstrapProps: true
    }
    constructor(props: RouterProps) {
        super(props);
    }
    changeRoute = (newRoute: string): void => {
        this.setState((prevState: RouterState) => ({
            activeRoute: newRoute
        }));
    }
    bootstrapProps = (elmnt: React.ReactElement<any>): React.ReactElement<any> => {
        if(this.props.bootstrapProps && typeof elmnt === 'object'){
            return React.cloneElement(elmnt, { changeRoute: this.changeRoute });
        }else{
            return elmnt;
        }
    }
    render() {
        console.log('route re-rendered');
        return (
            <div className={this.props.className ? this.props.className : "axc-router__route"}>
                {React.Children.map(this.props.children, (child: ReactChild, i: number) => {
                    if (typeof child === 'object') {
                        const routertContext = {state: this.state, props: this.props};
                        if(this.props.bootstrap){
                            child = this.props.bootstrap(child, routertContext, i);
                        }
                        if (this.props.strategy) {
                            const strategyOutput = this.props.strategy(child.props, routertContext, i);
                            if (strategyOutput) {
                                return child;
                            }
                        } else if (this.props.activeRoute) {
                            if (!child.props || !child.props.match) {
                                return this.bootstrapProps(child);
                 
                            } else if (child.props.match === this.props.activeRoute) {
                                return this.bootstrapProps(child);
                            }
                        }
                        else {
                            return child;
                        }
                    } else {
                        return child;
                    }

                })}
            </div>
        )
    }
}


export default Router;





