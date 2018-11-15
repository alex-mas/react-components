import React, { StatelessComponent, ReactNode } from 'react';
import Modal from '../layout/modal';


export type PromptContext<T> = (component: ReactNode) => Promise<T>;

export const Prompt: React.Context<PromptContext<any>> = React.createContext(undefined);

export function getPromptContext<T>(defualtContext?: T): React.Context<PromptContext<T>> {
    return React.createContext(undefined);
}

type ReactCallable<T> = React.ComponentClass<T> | React.SFCFactory<T>;



export type PromptFunction =  (data: any)=>void

export interface PromptComponentProps{
    onSubmit: PromptFunction;
    [x:string]: any;
}

interface PromptComponentState{
    isOpen: boolean,
    value: string
}
class PromptComponent extends React.PureComponent<PromptComponentProps,PromptComponentState>{
    constructor(props: PromptComponentProps){
        super(props);
        this.state = {
            isOpen: true,
            value: ''
        }
    }
    closeModal = ()=>{
        this.setState(()=>({
            isOpen: false
        }))
    }
    onCancel = (e)=>{
        this.closeModal();
        this.props.onSubmit(undefined);
    }
    onConfirm = ()=>{
        this.closeModal();
        this.props.onSubmit(this.state.value);
    }
    onChangeValue= (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        this.setState(()=>({
            value
        }));
    }
    render(){
        return (
            <Modal
                isOpen={this.state.isOpen}
                delay
                onClose={this.onCancel}
                className='axc-prompt__modal'
            >
                <div className='axc-prompt__title'>
                    {this.props.title}
                </div>
                <input value={this.state.value} onChange={this.onChangeValue} />
                <div className='axc-prompt__options'>
                    <button type='button' onClick={this.onConfirm}>Confirm</button>
                    <button type='button' onClick={this.onCancel}>Cancel</button>
                </div>
            </Modal>
        );
    }
}



export type PromptSystemCallable = ReactCallable<PromptComponentProps>;


export interface PromptSystemState{
    promptComponent: PromptSystemCallable | string;
    componentProps?: any;
}


export class PromptSystem extends React.Component<any, PromptSystemState>{
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
    prompt = (component: PromptSystemCallable  | string, componentProps?: any) => {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this.setState(()=>({
                promptComponent: component,
                componentProps
            }));
        });
    }
    onSubmitPrompt = (data:any)=>{
        this._resolve(data);
        this.setState(()=>({
            promptComponent: null,
            componentProps: undefined
        }));
    }
    renderPrompt = (props: {component: PromptSystemCallable | string})=>{
        if(props.component){
            if(typeof props.component === 'string'){
                return(
                    <PromptComponent title={props.component} onSubmit={this.onSubmitPrompt}/>
                )
            }else{
                return(
                    <props.component
                        onSumbit={this.onSubmitPrompt}
                        {...this.state.componentProps}
                    />
                ); 
            }
  
        }else{
            return null;
        }

    }
    render() {
        return (
            <React.Fragment>
                <Prompt.Provider value={this.prompt}>
                    {this.props.children}
                </Prompt.Provider>
                <this.renderPrompt component={this.state.promptComponent}/>
            </React.Fragment>
        );
    }
}






export function withPrompt<T extends {prompt: PromptFunction}>(Component: React.ComponentClass<T> | React.StatelessComponent<T>): React.SFC<Exclude<T,'prompt'>> {
    return (props: Exclude<T,'prompt'>)=> (
        <Prompt.Consumer>
            {prompt => <Component prompt={prompt} {...props} />}
        </Prompt.Consumer>
    )
}


export default PromptSystem;