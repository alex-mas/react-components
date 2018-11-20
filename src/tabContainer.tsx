import React from 'react';
import Router, {RouterContext} from './router';

export interface TabProps {
    title: string
    children?: any,
    titleComponent?: React.ComponentClass<any> | React.SFCFactory<any>

}

export class Tab extends React.Component<TabProps, any>{
    render() {
        return this.props.children;
    }
}

interface TabLinkProps {
    title: string,
    component?: React.ComponentClass<any> | React.SFCFactory<any>,
    onClick(title: string): any,
    className: string
}
class TabLink extends React.Component<TabLinkProps, any>{
    onClick = (event) => {
        this.props.onClick(this.props.title);
    }
    render() {
        return (
            <div className={this.props.className} onClick={this.onClick}>
                {this.props.component ?
                    <this.props.component />
                    :
                    this.props.title
                }
            </div>
        );
    }
}

export interface TabContainerProps {
    children?: Tab[] | Tab,
    initialTab: string,
    className?: string
}
export interface TabContainerState {
    activeTab: string
}
export class TabContainer extends React.Component<TabContainerProps, TabContainerState>{
    constructor(props: TabContainerProps) {
        super(props);
        this.state = {
            activeTab: props.initialTab
        }
    }
    onTabLinkClick = (title: string) => {
        this.setState((prevState: TabContainerState) => ({
            activeTab: title
        }));
    }
    shouldRenderTab = (childProps: TabProps, routerContext: RouterContext, index: number) =>{
        if(childProps.title === this.state.activeTab){
            return true;
        }else{
            return false;
        }
    }
    render() {
        return (
            <div className={'axc-tab-container'+ (this.props.className ? ' '+this.props.className : '')}>
                <div className='axc-tab-container__links'>
                    {React.Children.map(this.props.children, (child: any, index: number) => {
                        let className: string = 'axc-tab-link';    
                        if(child.props.title === this.state.activeTab){
                            className = 'axc-tab-link--active'
                        }
                        return (
                            <TabLink
                                title={child.props.title}
                                component={child.props.titleComponent}
                                onClick={this.onTabLinkClick}
                                className={className}
                            />
                        )
                    })}
                </div>
                <div className='tab-container__tab'>
                    <Router
                        strategy={this.shouldRenderTab}
                    >
                        {this.props.children}
                    </Router>
                </div>
            </div>
        )
    }
}



export default {
    TabContainer,
    Tab
}