

export const Error = (passedfunction) =>(req , res , next)=>{

    Promise.resolve(passedfunction(req , res , next)).catch(next);

}