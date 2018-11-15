import React, { SFC } from 'react';
import { titleCase, capitalizeFirst } from '../utils/wordUtils';



export interface I18nContextData {
    locale: ISO639Locale,
    localeData: LocaleLayout,
    translator?: (text:string, locale: ISO639Locale)=>string
}

export const I18nContext = React.createContext<I18nContextData>(undefined);

export interface I18nSystemProps {
    context: I18nContextData
}

/**
 * . . .
 * @example
 * I18nSystem provides context that allows I18String to fetch the traductions, it Must be placed wrapping all components that use I18String, 
 * since useing I18String outside an I18nSystem will result in errors.
 * 
 * Example is assuming you use redux to store locales, however, this is not mandatory, you can manage your state in any way you want as long as 
 * it 
 * 
 * ```javascript
 * 
 * const myLocaleData = store.getState().localeData;
 * 
 * const yourApp = ()=>{
 *      return(
 *          <I18nSystem value={myLocaleData}>
 *             <AppRouter/>
 *          </I18nSystem> 
 *      )
 * }
 * 
 * ```
 * 
 * Multiple I18n:
 * 
 * You might want to keep a separate set of traductions for a part of the app, if that is the case, you can instantiate a I18nSystem wrapping 
 * the section of the app you want with another I18nSystem as follows:
 * 
 * 
 * ```javascript
 * 
 * const myLocaleData = store.getState().localeData;
 * 
 * const myPluginLocale = store.getState().pluginLocales;
 * 
 * const yourApp = ()=>{
 *      return(
 *          <I18nSystem value={myLocaleData}>
 *              <AppRoutes/>
 *              <I18nSystem value={myPluginLocale}>
 *                  <PluginRoutes/>
 *              </I18nSystem
 *          </I18nSystem> 
 *      )
 * }
 * 
 * ```
 * . . .
 */
export class I18nSystem extends React.PureComponent<I18nSystemProps, any>{
    render() {
        return (
            <I18nContext.Provider value={this.props.context}>
                {this.props.children}
            </I18nContext.Provider>
        )
    }
}

// from https://stackoverflow.com/questions/49564342/typescript-2-8-remove-properties-in-one-type-from-another
type Diff<T, U> = T extends U ? never : T;
type ObjectDiff<T, U> = Pick<T, Diff<keyof T, keyof U>>;


export function withI18n<T extends I18nContextData>(Component: React.ComponentClass<T> | React.StatelessComponent<T>): React.SFC<ObjectDiff<T, I18nContextData>> {
    return (props: ObjectDiff<T, I18nContextData>) => (
        <I18nContext.Consumer>
            {localeContext => <Component {...localeContext} {...props} />}
        </I18nContext.Consumer>
    )
}

export interface LocaleLayout {
    [prop: string]: string
}

export enum I18StringFormat {
    CAPITALIZE_FIRST = 'capitalizeFirst',
    UPPERCASE = 'uppercase',
    LOWERCASE = 'lowercase',
    TITLECASE = 'titlecase'
}


/**
 * 
 * check https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes for more information
 * 
 * 
 */
export enum ISO639Locale {
    aa = "aa",
    ab = "ab",
    ae = "ae",
    af = "af",
    ak = "ak",
    am = "am",
    an = "an",
    ar = "ar",
    as = "as",
    av = "av",
    ay = "ay",
    az = "az",
    ba = "ba",
    be = "be",
    bg = "bg",
    bh = "bh",
    bi = "bi",
    bm = "bm",
    bn = "bn",
    bo = "bo",
    br = "br",
    bs = "bs",
    ca = "ca",
    ce = "ce",
    ch = "ch",
    co = "co",
    cr = "cr",
    cs = "cs",
    cu = "cu",
    cv = "cv",
    cy = "cy",
    da = "da",
    de = "de",
    dv = "dv",
    dz = "dz",
    ee = "ee",
    el = "el",
    en = "en",
    eo = "eo",
    es = "es",
    et = "et",
    eu = "eu",
    fa = "fa",
    ff = "ff",
    fi = "fi",
    fj = "fj",
    fo = "fo",
    fr = "fr",
    fy = "fy",
    ga = "ga",
    gd = "gd",
    gl = "gl",
    gn = "gn",
    gu = "gu",
    gv = "gv",
    ha = "ha",
    he = "he",
    hi = "hi",
    ho = "ho",
    hr = "hr",
    ht = "ht",
    hu = "hu",
    hy = "hy",
    hz = "hz",
    ia = "ia",
    id = "id",
    ie = "ie",
    ig = "ig",
    ii = "ii",
    ik = "ik",
    io = "io",
    is = "is",
    it = "it",
    iu = "iu",
    ja = "ja",
    jv = "jv",
    ka = "ka",
    kg = "kg",
    ki = "ki",
    kj = "kj",
    kk = "kk",
    kl = "kl",
    km = "km",
    kn = "kn",
    ko = "ko",
    kr = "kr",
    ks = "ks",
    ku = "ku",
    kv = "kv",
    kw = "kw",
    ky = "ky",
    la = "la",
    lb = "lb",
    lg = "lg",
    li = "li",
    ln = "ln",
    lo = "lo",
    lt = "lt",
    lu = "lu",
    lv = "lv",
    mg = "mg",
    mh = "mh",
    mi = "mi",
    mk = "mk",
    ml = "ml",
    mn = "mn",
    mr = "mr",
    ms = "ms",
    mt = "mt",
    my = "my",
    na = "na",
    nb = "nb",
    nd = "nd",
    ne = "ne",
    ng = "ng",
    nl = "nl",
    nn = "nn",
    no = "no",
    nr = "nr",
    nv = "nv",
    ny = "ny",
    oc = "oc",
    oj = "oj",
    om = "om",
    or = "or",
    os = "os",
    pa = "pa",
    pi = "pi",
    pl = "pl",
    ps = "ps",
    pt = "pt",
    qu = "qu",
    rm = "rm",
    rn = "rn",
    ro = "ro",
    ru = "ru",
    rw = "rw",
    sa = "sa",
    sc = "sc",
    sd = "sd",
    se = "se",
    sg = "sg",
    si = "si",
    sk = "sk",
    sl = "sl",
    sm = "sm",
    sn = "sn",
    so = "so",
    sq = "sq",
    sr = "sr",
    ss = "ss",
    st = "st",
    su = "su",
    sv = "sv",
    sw = "sw",
    ta = "ta",
    te = "te",
    tg = "tg",
    th = "th",
    ti = "ti",
    tk = "tk",
    tl = "tl",
    tn = "tn",
    to = "to",
    tr = "tr",
    ts = "ts",
    tt = "tt",
    tw = "tw",
    ty = "ty",
    ug = "ug",
    uk = "uk",
    ur = "ur",
    uz = "uz",
    ve = "ve",
    vi = "vi",
    vo = "vo",
    wa = "wa",
    wo = "wo",
    xh = "xh",
    yi = "yi",
    yo = "yo",
    za = "za",
    zh = "zh",
    zu = "zu",
}



export interface I18StringOwnProps {
    text: string,
    format?: I18StringFormat
}
export interface I18StringContextProps  extends I18nContextData{
}
export type I18StringProps = I18StringOwnProps & I18StringContextProps;

export interface I18StringState {
}



export class _I18String extends React.PureComponent<I18StringProps, I18StringState> {
    constructor(props) {
        super(props);

    }
    searchTraduction(text: string, locale: ISO639Locale, localeData?: LocaleLayout): string {
        if(this.props.translator){ return this.props.translator(text, locale);}
        if (locale === 'en') { return text; }
        if (
            localeData && typeof localeData === 'object' &&
            localeData[text] && typeof localeData[text] === 'string'
        ) {
            return localeData[text];
        } else {
            return text;
        }
    }
    getString() {
        let string = this.props.text.toLocaleLowerCase();
        string = this.searchTraduction(this.props.text, this.props.locale, this.props.localeData);
        if (this.props.format) {
            switch (this.props.format) {
                case 'capitalizeFirst':
                    string = capitalizeFirst(string);
                    break;
                case 'uppercase':
                    string = string.toUpperCase();
                    break; 
                case 'lowercase':
                    string = string.toLowerCase();
                    break;
                case 'titlecase':
                    string = titleCase(string);
                    break;
                default:
                    break;
            }
        }
        return string;

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.text === this.props.text && 
            this.props.locale === nextProps.locale && 
            this.props.format === nextProps.format
        ) {
            return false;
        } else {
            return true;
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const string = this.getString();
        if (string !== prevState.string) {
            this.setState(() => ({ string }));
        }

    }
    render() {
        return this.getString();
    }

}

/**
 * . . . 
 * @example
 * Usage of I18String is simple, after you have wrapped your app in the I18nSystem you can use them in place of regular strings
 * 
 * Note: I18String assumes the values provided and the keys of the locales are in english.
 * 
 * 
 * 
 * 
 * ```javascript
 * import I18String, {I18nSystem} from '@axc/react-components/display/i18string'
 * 
 * 
 * 
 * 
 * const MyComponent = ()=>{
 *      return( 
 *         <I18String text='hello'/>
 *      )
 * }
 * 
 * 
 * const MyApp = ()=>{
 *      return(
 *          <I18nSystem localeData={locale: 'es', locales:{es:{hello:'hola'}}}>
 *              <MyComponent/>
 *          </I18nSystem>
 *      )
 * }
 * 
 * ReactDOM.render(<MyApp/>, document.getElementById('app'));
 * 
 * (locale): output:
 *  -----------------
 * 
 * (en): 'hello'
 * 
 * (es): 'hola'
 * 
 * 
 * ```
 * 
 * 
 * . . . 
 */
export const I18String = withI18n(_I18String);

export default I18String;