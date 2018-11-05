import React from 'react'
import { shallow, render, mount } from 'enzyme'
import I18String, { I18nSystem } from '../../dist/display/i18string';





test('I18String should properly traduce hello to spanish while instantiated inside a I18nSystem that provides that translation', () => {
    const MyComponent = () => {
        return (
            <div id='traduction'>
                <I18String text='hello' />
            </div>

        )
    }

    const languages = ['es', 'fr', 'de', 'ca', 'ja'];
    const allLocalesData = {
            es: {
                hello: 'hola'
            },
            fr: {
                hello: 'bonjour'
            },
            de: { hello: 'Hallo' },
            ca: { hello: 'hola' },
            ja: { hello: 'こんにちは' }
    };


    const MyApp = (props) => {
        return (
            <I18nSystem context={{
                ...props
            }}>
                <MyComponent />
            </I18nSystem >
        );
    }

    for (let language of languages) {
        const wrapper = mount(<MyApp locale={language} localeData={allLocalesData[language]}/>);
        expect(wrapper.find('#traduction').text()).toEqual(allLocalesData[language].hello);
    }
});



test('I18String should call the custom function provided to the I18nSystem', () => {
    const MyComponent = () => {
        return (
            <div id='traduction'>
                <I18String text='hello' />
            </div>

        )
    }

    const languages = ['es', 'fr', 'de', 'ca']
    const allLocalesData = {
            es: {
                hello: 'hola'
            },
            fr: {
                hello: 'bonjour'
            },
            de: { hello: 'Hallo' },
            ca: { hello: 'hola' },
            ja: { hello: 'こんにちは' }
    };

    const myTranslator = (text)=>'only Khlav Kalash';

    const MyApp = (props) => {
        return (
            <I18nSystem context={{
                ...props,
                translator: myTranslator
            }}>
                <MyComponent />
            </I18nSystem >
        );
    }

    for (let language of languages) {
        const wrapper = mount(<MyApp locale={language} localeData={allLocalesData[language]}/>);
        expect(wrapper.find('#traduction').text()).toEqual(myTranslator());
    }
});


