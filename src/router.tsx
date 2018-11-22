import React, { ReactChild, ReactElement, } from 'react';




export interface RouterProps {
    strategy(childProps: any, routerContext: RouterContext, index: number): boolean,
    bootstrap?(child: React.ReactElement<any>, routerContext: RouterContext, index: number): React.ReactElement<any>,
    singleRoute?: boolean
}

export interface RouterContext extends RouterProps {
};


export class Router extends React.PureComponent<RouterProps, any>{
    constructor(props: RouterProps) {
        super(props);
    }
    render() {
        const matchingChildren = React.Children.map(this.props.children, (child: ReactChild, i: number) => {
            if(typeof child !== 'object'){
                return child;
            }
            const routertContext = { ...this.props };
            if (this.props.bootstrap) {
                child = this.props.bootstrap(child, routertContext, i);
            }
            const isMatch = this.props.strategy(child.props, routertContext, i);
            if (isMatch) {
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





