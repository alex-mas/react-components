


export const doParamsMatch = (desiredPath: string, givenPath: string) => {
    if (desiredPath === givenPath) { return true; }
    const firstParamIndex = desiredPath.indexOf(':');
    let desiredParams: string[] = []
    let givenParams: string[] = []
    desiredParams = desiredPath.split(':').slice(1);
    givenParams = givenPath.substr(firstParamIndex).split('&');
    givenParams = givenParams.filter((param)=>{
        return param.length > 0;
    });
    return givenParams.length === desiredParams.length;
};