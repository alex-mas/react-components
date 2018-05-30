import React from 'react';
import { History } from './browserHistory';


export interface LinkProps {
    children: React.ReactNode,
    to: string,
    text?: string
}


export class Link extends React.Component<LinkProps, any>{
    render() {
        return (
            <History.Consumer>
                {history => (
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            history.pushState({ path: this.props.to, title: document.title })
                        }}
                    >
                        {this.props.text}
                    </a>
                )
                }
            </History.Consumer>
        )
    }
}


export default Link;