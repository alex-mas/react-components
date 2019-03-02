import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { isUndefined } from 'util';
import { type } from 'os';


export interface TooltipProps {
    container: Element,
    text: string,
    isVisible: boolean,
    component: Element | Text,
    className?: string,
    onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
}

export class Tooltip extends React.Component<TooltipProps, any> {
    tooltip: React.Ref<HTMLDivElement>;
    constructor(props) {
        super(props);
        this.tooltip = React.createRef();
    }
    getTooltipClassName = (): string => {
        let tooltip = 'axc-tooltip';
        if (!this.props.isVisible) {
            tooltip += '--hidden';
        }
        if (this.props.className) {
            tooltip += ' ' + this.props.className;
        }
        return tooltip;
    }
    getTooltipStyles = (): CSSProperties => {
        const styles: CSSProperties = {};
        if (
            typeof this.props.component === 'object' &&
            typeof this.tooltip === 'object' &&
            this.tooltip.current
        ) {
            //@ts-ignore
            const compDimensions = this.props.component.getBoundingClientRect();
            const tooltipDimensions = this.tooltip.current.getBoundingClientRect();
            const top = this.props.container ? this.props.container.getBoundingClientRect().top : window.innerHeight;
            const right = this.props.container ? this.props.container.getBoundingClientRect().right : window.innerWidth;
            if (compDimensions.bottom + tooltipDimensions.height > top) {
                styles.bottom = `${compDimensions.height - 1}px`;
            } else {
                styles.top = `-1px`;
            }
            if (compDimensions.right + tooltipDimensions.width > right) {
                if (compDimensions.left - tooltipDimensions.width < 0) {
                    styles.left = `-${compDimensions.left}px`;
                } else {
                    styles.right = `${tooltipDimensions.width - compDimensions.width / 2 - 1}px`;
                }
            } else {
                styles.left = `${compDimensions.width / 2 - 1}px`;
            }
        }
        return styles;
    }
    render() {
        return (
            <div className='axc-tooltip__wrapper'>
                <div
                    ref={this.tooltip}
                    style={this.getTooltipStyles()}
                    className={this.getTooltipClassName()}
                    onMouseLeave={this.props.onMouseLeave}
                >
                    {this.props.text}
                </div>
            </div>

        )

    }
}

export interface TooltippedComponentProps{
    tooltip: string,
    tooltipClass: string,
    containerRef?: React.Ref<HTMLElement>
}

export interface TooltippedComponentState {
    isTooltipVisible: boolean
}

export const withTooltip = <T extends any>(Component: React.ComponentType<T>, ) => {
    return class TooltippedComponent extends React.Component<T & TooltippedComponentProps, TooltippedComponentState>{
        component: React.Ref<HTMLElement>;
        componentDOM: Element | Text;
        tooltip: React.Ref<Tooltip>;
        tooltipDOM: Element | Text;
        containerDOM: Element;
        constructor(props: T & TooltippedComponentProps) {
            super(props);
            this.state = {
                isTooltipVisible: false
            };
            this.component = React.createRef();
            this.tooltip = React.createRef();
        }
        onMouseEnter = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
            this.setState(() => ({
                isTooltipVisible: true
            }));
        }
        onMouseLeave = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
            if (this.tooltipDOM && typeof this.tooltipDOM === 'object') {
                //@ts-ignore
                const tooltipArea = this.tooltipDOM.getBoundingClientRect();
                //mouse is outside the tooltip
                if (
                    event.clientX < tooltipArea.left ||
                    event.clientX > tooltipArea.right ||
                    event.clientY < tooltipArea.top - 1 ||
                    event.clientY > tooltipArea.bottom + 1
                ) {
                    this.setState(() => ({
                        isTooltipVisible: false
                    }));
                }

            }

        }
        componentDidMount() {
            if (typeof this.component === 'object' && this.component.current) {
                this.componentDOM = ReactDOM.findDOMNode(this.component.current);
                //@ts-ignore
                this.componentDOM.addEventListener('mouseenter', this.onMouseEnter);
                //@ts-ignore
                this.componentDOM.addEventListener('mouseleave', this.onMouseLeave);
            }
            if (typeof this.tooltip === 'object' && this.tooltip.current) {
                this.tooltipDOM = ReactDOM.findDOMNode(this.tooltip.current);
            }
            if(typeof this.props.containerRef === 'object' && this.props.containerRef.current){
                this.containerDOM =  ReactDOM.findDOMNode(this.props.containerRef.current) as Element;
            }
        }
        componentWillUnmount() {
            if (typeof this.component === 'object' && this.component.current) {
                //@ts-ignore
                this.componentDOM.removeEventListener('mouseenter', this.onMouseEnter);
                //@ts-ignore
                this.componentDOM.removeEventListener('mouseleave', this.onMouseLeave);
            }
        }
        render() {
            return (
                <React.Fragment>
                    <div style={{ display: 'inlineBlock' }}>
                        <Component
                            ref={this.component}
                            {...this.props}
                            onMouseLeave={this.onMouseLeave}
                        />
                    </div>
                    <Tooltip
                        container={this.containerDOM}
                        ref={this.tooltip}
                        component={this.componentDOM}
                        text={this.props.tooltip}
                        isVisible={this.state.isTooltipVisible}
                        onMouseLeave={this.onMouseLeave}
                        className={this.props.tooltipClass}
                    />
                </React.Fragment>
            )
        }
    }
}


export default withTooltip;