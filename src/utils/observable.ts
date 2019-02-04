

export interface Subscription {
    revoke():void;
}



export class Observable {
    private subscriptions: Function[] =[];
    subscribe = (callback)=>{
        this.subscriptions.push(callback);
        return{
            revoke: ()=>{this.subscriptions = this.subscriptions.filter((subscription)=>subscription !== callback)}
        }
    }
}