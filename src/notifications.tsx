import React, {SyntheticEvent} from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';


export interface _Notification {
    id: string,
    message: string,
    className?: string,
    component?: React.ComponentClass<NotificationComponentProps> | React.SFCFactory<NotificationComponentProps>
}

export interface Notifications {
    notify(message: string, className?: string, component?: React.ComponentClass<NotificationComponentProps>): void
    dismissNotification(id): void
}



export interface NotificationComponentProps{
    notification: _Notification,
    dismissNotification(id): void

}
export const NotificationComponent = (props: NotificationComponentProps) => {
    if (props.notification.component) {
        return <props.notification.component {...props} />;
    } else {
        const baseClass = props.notification.className ? props.notification.className : 'axc__notification';
        return (
            <div className={baseClass}>
                <div className={baseClass + '__message'}>
                    {props.notification.message}
                </div>
                <button className={baseClass +'__button'} onClick={props.dismissNotification.bind(undefined,props.notification.id)}>dismiss</button>
            </div>
        );
    }

}

export const Notification: React.Context<Notifications> = React.createContext(undefined);



export interface NotificationSystemProps {
    root?: Element
    notificationComponent?: React.ComponentClass<NotificationComponentProps> | React.SFCFactory<NotificationComponentProps>

}
export interface NotificationSystemState {
    currentNotifications: _Notification[];
}

export class NotificationSystem extends React.Component<NotificationSystemProps, NotificationSystemState> {
    constructor(props) {
        super(props);
        this.state = {
            currentNotifications: []
        };
    }
    onDismissNotification = (id:string):void=> {
        this.setState((prevState)=>{
            return{
                currentNotifications:prevState.currentNotifications.filter((notification: _Notification)=>{
                    notification.id !== id;
                })
            }
        });
    }
    onNotify = (message: string, className?: string, component?: React.ComponentClass<NotificationComponentProps>):void =>{
        this.setState((prevState)=>{
            return{
                currentNotifications: [...prevState.currentNotifications, {
                    id: uuid(),
                    message,
                    className,
                    component
                }]
            }
        });
    }
    getNotificationContext():Notifications{
        return{
            notify: this.onNotify,
            dismissNotification: this.onDismissNotification
        }
    }
    renderNotifications = () =>{
        if(this.props.root && this.props.notificationComponent){
            return ReactDOM.createPortal(
                this.state.currentNotifications.map((notification: _Notification)=>{
                    if(notification.component){
                        return <notification.component notification={notification} dismissNotification={this.onDismissNotification}/>
                    }else{
                        return <this.props.notificationComponent notification={notification} dismissNotification={this.onDismissNotification}/>
                    }
                 
                }),
                this.props.root
            );
        }else{
            return this.state.currentNotifications.map((notification: _Notification)=>{
                return(
                    <NotificationComponent notification={notification} dismissNotification={this.onDismissNotification}/>
                );
            })
        }
        

    }
    render() {
        return (
            <Notification.Provider value={this.getNotificationContext()}>
                {this.props.children}
                {this.renderNotifications()}
            </Notification.Provider>
        )
    }
}   


export interface WithNotificationsHOC {
    (props: any): React.SFC<any>
}


export const WithNotifications: WithNotificationsHOC = (Component: React.ComponentClass<any> | React.SFCFactory<any>) => {
    return (props: any) => (
        <Notification.Consumer>
            {notification=> <Component notify={notification.notify} dismissNotification={notification.dismissNotification} {...props} />}
        </Notification.Consumer>
    )
}

export default NotificationSystem;