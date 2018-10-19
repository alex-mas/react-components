import React from 'react';



export interface ProgressBarProps {
    containerClass?: string,
    barClass?: string,
    progress: number,
}

export interface ProgressBarState {

}

export class ProgressBar extends React.PureComponent<ProgressBarProps, ProgressBarState>{
    render() {
        let progress = this.props.progress;
        if(progress < 0){progress = 0;}
        if(progress > 100){progress = 100;}
        return (
            <div
                className={this.props.containerClass ?
                    this.props.containerClass :
                    'axc-progress-bar__container'
                }
                style={{}}
            >
                <div
                    className={
                        this.props.barClass ? 
                        this.props.barClass : 
                        'axc-progress-bar'
                    }
                    style={{width: `${progress}%`}}
                >
                </div>
                {this.props.children}
            </div>
        )
    }
}


export default ProgressBar;