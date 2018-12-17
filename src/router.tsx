import React, { ReactChild, ReactElement, } from 'react';




export interface RouterProps {
    strategy(childProps: any, routerContext: RouterContext, index: number): boolean,
    bootstrap?(child: React.ReactElement<any>, routerContext: RouterContext, index: number): React.ReactElement<any>,
    singleRoute?: boolean
}

export interface RouterContext extends RouterProps {
};

/**
 * This class:
 * 1- conditionally renders children based on the output of strategy prop function and singleRoute prop
 * 2- if boostrap is provided it is called for each children, allowing the user of router to modify children
 * 
 * 
 */
export class Router extends React.PureComponent<RouterProps, any>{
    constructor(props: RouterProps) {
        super(props);
    }
    render() {
        let firstMatch = false;
        return React.Children.map(this.props.children, (child: ReactChild, i: number) => {
            if (typeof child !== 'object') {
                return child;
            }
            const routertContext = { ...this.props };
            const isMatch = this.props.strategy(child.props, routertContext, i);
            if (isMatch &&
                (
                    !this.props.singleRoute ||
                    (this.props.singleRoute && !firstMatch)
                )
            ) {
                firstMatch = true;
                if (this.props.bootstrap) {
                    return this.props.bootstrap(child, routertContext, i);
                } else {
                    return child;
                }
            }
        });
    }
}


export default Router;





