export const skin = (op:string)=>{
    if(op == 'light'){
        console.log('light');
        document.documentElement.style.setProperty('--backgroundBtn', `rgba(255, 255, 255, .6)`);
        document.documentElement.style.setProperty('--backgroundModle', `rgba(255, 255, 255, .3)`);
        document.documentElement.style.setProperty('--fontColor', `#000`);
        document.documentElement.style.setProperty('--backgroundColor', `#f4f5f5`);
    }else if(op == 'dark'){
        document.documentElement.style.setProperty('--backgroundBtn', `rgba(0, 0, 0, .6)`);
        document.documentElement.style.setProperty('--backgroundModle', `rgba(0, 0, 0, .3)`);
        document.documentElement.style.setProperty('--fontColor', `#bebebe`);
        document.documentElement.style.setProperty('--backgroundColor', `#333333`);
        console.log('dark');
    }
}