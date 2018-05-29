import React, { ReactChild, ReactElement, } from 'react';

export interface RouterState {
}

export interface RouterProps {
    children?: any,
    strategy?(childProps: any, routerState: RouterState, index: number): boolean,
    activeRoute?: string,
    className?: string
}

export class Router extends React.Component<RouterProps, RouterState>{
    state: RouterState
    constructor(props: RouterProps) {
        super(props);
    }
    render() {
        //TODO: Pass the utility functions and data to the children so that they can activate changes of routes and such
        return (
            <div className={this.props.className ? this.props.className : "axc-router__route"}>
                {React.Children.map(this.props.children, (child: ReactElement<any> | any, i: number) => {
                    if (this.props.strategy) {
                        if (this.props.strategy(child.props, this.state, i)) {
                            return React.cloneElement(child, {});
                        }
                    } else if (this.props.activeRoute) {
                        if (!child.props || !child.props.match) {
                            return React.cloneElement(child, {});
                        }else if (child.props.match === this.props.activeRoute) {
                            return React.cloneElement(child, {});
                        }
                    }
                    else {
                        React.cloneElement(child, {});
                    }
                })}
            </div>
        )
    }
}


export default Router;





