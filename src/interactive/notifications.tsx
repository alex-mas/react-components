import React, {SyntheticEvent} from 'react';
import uuid from 'uuid/v4';



export interface CustomNotificationProps {
    message: string,
    className: string
}
export interface _Notification {
    id: string,
    message: string,
    className?: string,
    component?: React.ComponentClass<CustomNotificationProps, any>
}

export interface Notifications {
    notify(message: string, className?: string, component?: React.ComponentClass<CustomNotificationProps, any>): void
    removeNotification(id): (evt: React.SyntheticEvent<HTMLElement>)=>void
}



export interface NotificationComponentProps{
    notification: _Notification,
    dismiss(id: string): (evt: React.SyntheticEvent<HTMLElement>)=>void

}
export const NotificationComponent = (props: NotificationComponentProps) => {
    if (props.notification.component) {
        return <props.notification.component message={props.notification.message} className={props.notification.className} />;
    } else {
        return (
            <div className={props.notification.className ? props.notification.className : 'axc__notification'}>
                <span className={props.notification.className? props.notification.className + '__message' : 'axc__notification__message'}>
                    {props.notification.message}
                </span>
                <button onClick={props.dismiss(props.notification.id)}>dismiss</button>
            </div>
        );
    }

}

export const Notification: React.Context<Notifications> = React.createContext(undefined);



export interface NotificationSystemProps {

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
    onDismissNotification = (id:string): (evt: any)=>void=> {
        return (evt: SyntheticEvent<HTMLButtonElement>)=>{
            this.setState((prevState)=>{
                return{
                    currentNotifications:prevState.currentNotifications.filter((not: _Notification)=>{
                        not.id !== id;
                    })
                }
            });
        }
    }
    onNotify = (message: string, className?: string, component?: React.ComponentClass<CustomNotificationProps, any>):void =>{
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
            removeNotification: this.onDismissNotification
        }
    }
    render() {
        return (
            <Notification.Provider value={this.getNotificationContext()}>
                {this.props.children}
                {this.state.currentNotifications.map((notification: _Notification)=>{
                    return(
                        <NotificationComponent notification={notification} dismiss={this.onDismissNotification}/>
                    );
                })}
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
            {notification=> <Component notify={notification.notify} removeNotfication={notification.removeNotification} {...props} />}
        </Notification.Consumer>
    )
}

export default NotificationSystem;