import React from "react";

interface P {
    onClickOutside: (event: MouseEvent) => void;
}


export class HandleClickOutside extends React.PureComponent<P, any> {
    ref: React.Ref<HTMLDivElement>;
    constructor(props: P) {
        super(props);
        this.ref = React.createRef();
    }
    componentDidMount() {
        window.addEventListener("click", this.handleClicksOutside);
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.handleClicksOutside);
    }
    handleClicksOutside = (event: MouseEvent) => {
        if (this.ref) {
            //@ts-ignore
            const isOutsideClick = !this.ref.current.contains(event.target);
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