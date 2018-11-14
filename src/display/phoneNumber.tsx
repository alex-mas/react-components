import React from 'react';


export interface PhoneNumberProps {
    number: number | string,
    separator?: string,
    separatorClass?: string

}


export class PhoneNumber extends React.PureComponent<PhoneNumberProps> {
    constructor(props) {
        super(props);
    }
    renderPhoneNumber(separator: string, separatorClass?: string) {
        if (!this.props.number) {
            return null;
        } else {
            let first = true;
            return (
                <span className='axc__phone-num'>
                    {
                        this.props.number.toString().match(/.{3}/g).map((numbers, index) => {
                            if (first) {
                                first = false;
                                return <span className='axc__phone-num__numbers' key={`phoneNumKey_${index}`}>{numbers}</span>;
                            } else {
                                return [
                                    <span
                                        className={
                                            separatorClass ?
                                                separatorClass
                                                :
                                                'axc__phone-num__separator'
                                        }
                                        key={`phoneNumKey_${index}`}
                                    >
                                        {separator}
                                    </span>,
                                    <span className='axc__phone-num__numbers' key={`phoneNumKey_${index}b`}>{numbers}</span>
                                ]
                            }
                        })
                    }
                </span>
            );
        }
    }
    render() {
        if (!this.props.separator) {
            return this.renderPhoneNumber(' ', this.props.separatorClass)
        } else {
            return this.renderPhoneNumber(this.props.separator, this.props.separatorClass);
        }
    }
}

export default PhoneNumber;