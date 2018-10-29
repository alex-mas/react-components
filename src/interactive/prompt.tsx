import React from 'react';


export type PromptContext<T> = (component: any) => Promise<T>;

export const Prompt: React.Context<PromptContext<any>> = React.createContext(undefined);

export function getPromptContext<T>(defualtContext?: T): React.Context<PromptContext<T>> {
    return React.createContext(undefined);
}



export class PromptSystem extends React.Component<any, any>{
    _resolve: Function;
    _reject: Function
    constructor(props: any) {
        super(props);
        this._resolve = undefined;
        this._reject = undefined;
        this.state = {
            promptComponent: null
        }
    }
    prompt = (component: any) => {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.setState(()=>{
            promptComponent: component
        });
    }
    onSubmitPrompt = (e: any,data:any)=>{
        e.preventDefault();
        this._resolve(data);
    }
    renderPrompt = ()=>{
        return(
            <this.state.promptComponent
                onSumbit={this.onSubmitPrompt}
            />
        ); 
    }
    render() {
        return (
            <React.Fragment>
                <Prompt.Provider value={this.prompt}>
                    {this.props.children}
                </Prompt.Provider>
                <this.renderPrompt/>
            </React.Fragment>
        );
    }
}




export default PromptSystem;