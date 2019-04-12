import React from "react";
import { canUseDOM } from "./utils/env";

interface P {
    onClickOutside: (event: MouseEvent) => void;
}


export class HandleClickOutside extends React.PureComponent<P, any> {
    ref: React.RefObject<HTMLDivElement>;
    constructor(props: P) {
        super(props);
        this.ref = React.createRef();
    }
    componentDidMount() {
        if(canUseDOM){
            window.addEventListener("click", this.handleClicksOutside);
        }
    }
    componentWillUnmount() {
        if(canUseDOM){
            window.removeEventListener("click", this.handleClicksOutside);
        }
    }
    handleClicksOutside = (event: MouseEvent) => {
        if (this.ref && this.ref.current) {
            const isOutsideClick = !this.ref.current.contains(event.target as Node);
            if (isOutsideClick) {
                this.props.onClickOutside(event);
            }
        }
    }
    render() {
        return (
            <div ref={this.ref}>
                {this.props.children}
            </div>
        )
    }
}


export default HandleClickOutside;