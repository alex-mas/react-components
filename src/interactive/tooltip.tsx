import React from 'react';

export interface TooltipProps {
    text: string,
    isVisible: boolean,
    className?: string,
    onMouseLeave?: React.EventHandler<React.MouseEvent>
}

export class Tooltip extends React.Component<TooltipProps, any> {
    constructor(props) {
        super(props);
    }
    getTooltipClassName = (): string => {
        let tooltip = 'axc-tooltip';
        if (!this.props.isVisible) {
            tooltip += '--hidden';
        }
        if (this.props.className) {
            tooltip += ' ' + this.props.className;
        }
        console.log(tooltip, this.props.isVisible, this.props.className);
        return tooltip;
    }
    render() {
        return (
            <div className='axc-tooltip__wrapper'>
                <div
                    className={this.getTooltipClassName()}
                    onMouseLeave={this.props.onMouseLeave}
                >
                    {this.props.text}
                </div>
            </div>

        )

    }
}

export interface TooltippedComponentState {
    isTooltipVisible: boolean
}

export const withTooltip = (Component) => {
    return class TooltippedComponent extends React.Component<any, TooltippedComponentState>{
        constructor(props) {
            super(props);
            this.state = {
                isTooltipVisible: this.isMouseInsideComponent()
            };
        }
        //TODO: implement
        isMouseInsideComponent = () => {
            return false;
        }
        onMouseEnter = (event: React.MouseEvent) => {
            this.setState(() => ({
                isTooltipVisible: true
            }));
        }
        onMouseLeave = (event: React.MouseEvent) => {
            this.setState(() => ({
                isTooltipVisible: false
            }));
        }
        render() {
            return (
                <React.Fragment>
                    <Component {...this.props} onMouseLeave={this.onMouseLeave} />
                    <Tooltip
                        text={this.props.tooltip}
                        isVisible={this.state.isTooltipVisible}
                        onMouseLeave={this.onMouseLeave}
                        className={this.props.className}
                    />
                </React.Fragment>

            )
        }
    }
}


export default withTooltip;