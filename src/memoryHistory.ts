import { History, HistoryNode } from "./historyRouter";




export class MemoryHistory implements History{
    history: HistoryNode[];
    currentPosition: number;
    constructor(initialHistory: HistoryNode | HistoryNode[] | undefined, initialPosition?: number){
        this.history = [];
        if (initialHistory) {
            if (Array.isArray(initialHistory)) {
                this.history = this.history.concat(initialHistory);
            } else {
                this.history.push(initialHistory)
            }
        }
        this.currentPosition = initialPosition | 0;
    }
    back = () => {
        if (this.currentPosition > 0) {
            this.currentPosition--;
        } else {
            this.currentPosition = 0;
        }
    }
    forward = () => {
        if (this.currentPosition < history.length - 1) {
            this.currentPosition++;
        } else {
            this.currentPosition = history.length - 1;
        }
    }
    go = (delta: number) => {
        if (delta >= history.length) {
            this.currentPosition = history.length - 1;
        } else if (delta <= 0) {
            this.currentPosition = 0;
        } else {
            this.currentPosition = delta;
        }
    }
    pushState = (newNode: string| HistoryNode) => {
        if(typeof newNode === "string"){
            newNode = {
                url: newNode,
                title: undefined,
                state: undefined
            }
        }
        this.history.push(newNode);
    }
    location = () => {
        return this.history[this.currentPosition];
    }
    replaceState = (replacedNode: string | HistoryNode) => {
        if(typeof replacedNode === "string"){
            this.history[this.history.length-1] = {
                title: undefined,
                url: replacedNode,
                state: undefined
            }
        }else{
            this.history[this.history.length-1] = replacedNode;
        }
    }
}
