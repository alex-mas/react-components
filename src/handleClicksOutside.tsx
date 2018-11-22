import React from "react";


interface P {
    onClickOutside: (event: MouseEvent)=>void;
}


export class HandleClicksOutside extends React.PureComponent<P, any> {
    childrenRefs: React.Ref<HTMLElement>[] = [];
    componentDidMount(){
        window.addEventListener("click",this.handleClicksOutside);
       
    }
    componentWillUnmount(){
        window.removeEventListener("click",this.handleClicksOutside);
    }
    handleClicksOutside(event:MouseEvent){
        const match = this.childrenRefs.find((ref: React.Ref<HTMLElement>, index)=>{
            //@ts-ignore
            if(ref.current.contains(event.target)){
                return true;
            }else{
                return false;
            }
        });
        if(!match){
            this.props.onClickOutside(event);
        }
    }
    render(){
        this.childrenRefs = [];
        //get the refs of the children components
        return React.Children.map(this.props.children,(child,index)=>{
            //@ts-ignore
            this.childrenRefs.push(child.ref);
            return child;
        })
    }
}