import React, { ReactChild, ReactElement, } from 'react';



export interface RouterState {
}

export interface RouterProps {
    children?: any,
    strategy?(childProps: any, routerContext: RouterContext, index: number): boolean,
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
    bootstrapProps = (elmnt: ReactElement<any>): ReactElement<any> => {
        if(this.props.bootstrapProps){
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





