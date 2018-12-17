
if(!process || !process.env || !process.env.NODE_ENV){
    
    if(!(window as any).process){
        (window as any).process = {};
    }
    if(!(window as any).process.env){
        (window as any).process.env = {

        }
    }
    if(!(window as any).process.env.NODE_ENV){
        (window as any).process.env.NODE_ENV = "production";
    }
}