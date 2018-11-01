import React from 'react'
import { shallow, render, mount } from 'enzyme'
import I18String, { I18nSystem } from '../../dist/display/i18string';





test('I18String should throw if instantiated outside an I18nSystem',()=>{
    const MyComponent = () => {
        return (
            <div id='traduction'>
                <I18String text='hello' />
            </div>
        );
    }

    expect(()=>{
        const wrapper = mount(<MyComponent/>);
    }).toThrow();
});


test('I18String should properly traduce hello to spanish while instantiated inside a I18nSystem that provides that translation', () => {
    const MyComponent = () => {
        return (
            <div id='traduction'>
                <I18String text='hello' />
            </div>

        )
    }

    const languages = ['es','fr','de','ca']
    const localeData = { 
        locale: 'es', 
        locales: { 
            es: { 
                hello: 'hola' 
            },
            fr: {
                hello: 'bonjour'
            },
            de: {hello:'Hallo'},
            ca: {hello: 'hola'},
            ja: {hello: 'こんにちは'}
            
        } 
    }

    const MyApp = () => {
        return (
            <I18nSystem localeData={localeData}>
                <MyComponent />
            </I18nSystem >
        );
    }

    for(let language of languages){
        localeData.locale = language;
        const wrapper = mount(<MyApp />);
        expect(wrapper.find('#traduction').text()).toEqual(localeData.locales[language].hello);
    }
});


