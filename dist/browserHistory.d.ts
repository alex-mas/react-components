/// <reference types="react" />
import React from 'react';
export interface BrowserHistoryNode {
    path: string;
    title: string;
}
export interface BrowserHistoryNodeEdit {
    path?: string;
    title?: string;
}
export declare class BrowserHistory {
    values: BrowserHistoryNode[];
    currentPosition: number;
    constructor(initialValue: BrowserHistoryNode);
    back: () => void;
    forward: () => void;
    pushState: (newNode: BrowserHistoryNode) => void;
    location: () => BrowserHistoryNode;
    editState: (editedNode: BrowserHistoryNodeEdit) => void;
}
export declare const History: React.Context<BrowserHistory>;
export default BrowserHistory;
