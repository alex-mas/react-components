import React, { StatelessComponent, ReactNode } from 'react';
import Modal from '../layout/modal';


export type PromptContext<T> = (component: ReactNode) => Promise<T>;

export const Prompt: React.Context<PromptContext<any>> = React.createContext(undefined);

export function getPromptContext<T>(defualtContext?: T): React.Context<PromptContext<T>> {
    return React.createContext(undefined);
}

type ReactCallable = React.ComponentClass<any> | React.SFCFactory<any>;



export type PromptFunction =  (data: any)=>void

interface PromptComponentProps{
    title: string;
    onSubmit: PromptFunction;
}

interface PromptComponentState{
    isOpen: boolean,
    value: string
}
class PromptComponent extends React.PureComponent<PromptComponentProps,PromptComponentState>{
    constructor(props){
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



export interface PromptSystemState{
    promptComponent: ReactCallable | string;
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
    prompt = (component: ReactCallable | string) => {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this.setState(()=>({
                promptComponent: component
            }));
        });
    }
    onSubmitPrompt = (data:any)=>{
        this._resolve(data);
        this.setState(()=>({
            promptComponent: null
        }));
    }
    renderPrompt = (props)=>{
        if(props.component){
            if(typeof props.component === 'string'){
                return(
                    <PromptComponent title={props.component} onSubmit={this.onSubmitPrompt}/>
                )
            }else{
                return(
                    <props.component
                        onSumbit={this.onSubmitPrompt}
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





export type WithPromptProps<T> = {prompt:PromptFunction} & T;
export function withPrompt<T extends {prompt:any}>(Component: React.ComponentClass<T> | React.StatelessComponent<T>): React.SFC<Exclude<T,'prompt'>> {
    return (props: Exclude<T,'prompt'>)=> (
        <Prompt.Consumer>
            {prompt => <Component prompt={prompt} {...props} />}
        </Prompt.Consumer>
    )
}


export default PromptSystem;