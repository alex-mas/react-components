import React, { ReactChild, ReactElement, } from 'react';



export interface RouterState {
}

export interface RouterProps {
    children?: any,
    strategy?(childProps: any, routerContext: RouterContext, index: number): boolean,
    activeRoute?: string,
    className?: string
}

export interface RouterContext {
    state: RouterState;
    props: RouterProps;
};


export class Router extends React.Component<RouterProps, RouterState>{
    state: RouterState
    constructor(props: RouterProps) {
        super(props);
    }
    changeRoute = (newRoute: string): void => {
        this.setState((prevState: RouterState) => ({
            activeRoute: newRoute
        }));
    }
    bootstrapProps = (elmnt: ReactElement<any>): ReactElement<any> => {
        return React.cloneElement(elmnt, { changeRoute: this.changeRoute });
    }
    render() {
        console.log('route re-rendered');
        return (
            <div className={this.props.className ? this.props.className : "axc-router__route"}>
                {React.Children.map(this.props.children, (child: ReactChild, i: number) => {
                    if (typeof child === 'object') {
                        if (this.props.strategy) {
                            if (this.props.strategy(child.props, { state: this.state, props: this.props }, i)) {
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
                            React.cloneElement(child, {});
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





