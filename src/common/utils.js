export function debounce(func,dely){
    let timer=null;
    // return function (...args){
    //     if(timer) clearTimeout(timer);
    //     timer=setTimeout(()=>{
    //         console.log(1);
            
    //         func.apply(this,args);
    //     },dely)
    // }
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this,args);
        }, dely);
      };
}