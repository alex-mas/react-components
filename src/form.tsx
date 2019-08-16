import React from 'react';

export enum FieldType{
    Input,
    Dropdown
}

export interface FieldDefinition{
    type: FieldType,
    renderer: React.ReactElement<any>
}

export interface FormProps<T>{
    className: string,
    fields: FieldDefinition[]
}

export interface FormState<T>{

}


class Form<T extends any> extends React.Component<FormProps<T>, FormState<T>>{
    render(){
        return(
            <form className={this.props.className}>

            </form>
        )
    }
}