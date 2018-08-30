import React from 'react';


export interface PhoneNumberProps {
    number: number | string,
    method: 'spaces' | 'dashes' | string
}


export class PhoneNumber extends React.PureComponent<PhoneNumberProps> {
    constructor(props) {
        super(props);
    }
    renderPhoneNumber(separator: string, customSeparator?: string) {
        if(!this.props.number){
            return null;
        }else{
            let first = true;
            return (
                <span className='axc__phone'>
                    {
                        this.props.number.toString().match(/.{3}/g).map((numbers, index) => {
                            if (first) {
                                first = false;
                                return <span className='axc__phone__numbers' key={`phoneNumKey_${index}`}>{numbers}</span>;
                            } else {
                                return [
                                    <span className={customSeparator? customSeparator :'axc__phone__separator'} key={`phoneNumKey_${index}`}>{customSeparator ? undefined : separator}</span>,
                                    <span className='axc__phone__numbers' key={`phoneNumKey_${index}b`}>{numbers}</span>
                                ]
                            }
                        })
                    }
                </span>
            );
        }
    }
    render() {
        if (!this.props.method || this.props.method === 'spaces') {
            return this.renderPhoneNumber(' ');
        } else if (this.props.method === 'dashes') {
            return this.renderPhoneNumber('-');
        } else if (this.props.method) {
            return this.renderPhoneNumber('', this.props.method);
        }
    }
}

export default PhoneNumber;