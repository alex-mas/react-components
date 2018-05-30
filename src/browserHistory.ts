import React from 'react';

export interface BrowserHistoryNode {
    path: string,
    title: string
}

export interface BrowserHistoryNodeEdit {
    path?:string,
    title?:string
}

export class BrowserHistory {
    values: BrowserHistoryNode[];
    currentPosition: number;
    constructor(initialValue: BrowserHistoryNode){
        this.values = [initialValue];
        this.currentPosition = 0;
    }
    back = ()=>{
        if(this.currentPosition > 0){
            this.currentPosition--;
        }
    }
    forward = ()=>{
        if(this.currentPosition < this.values.length -1){
            this.currentPosition++;
        }
    }
    pushState = (newNode:BrowserHistoryNode)=>{
        console.log('pushing new state');
        this.values.push(newNode);
        this.currentPosition = this.values.length-1;
        console.log(this.location());
    }
    location = ()=>{
        return this.values[this.currentPosition];
    }
    editState = (editedNode: BrowserHistoryNodeEdit)=>{
        this.values[this.values.length-1] = {
            ...this.values[this.values.length-1],
            ...editedNode
        };
    }

}

export const History = React.createContext(new BrowserHistory({path:'/',title: document.title}));


export default BrowserHistory;