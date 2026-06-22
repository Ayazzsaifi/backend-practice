function task(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            return resolve("task Done")
        },1000)
    })
}

function task2(){
    return new Promise (function(resolve,reject){
        setTimeout(function(){
            const maths=Math.random() >0.5
            if (maths){
                resolve("task success");
            }
            else{
                reject ("task fail");
            }
        },1000)
    })
}


async function main (){
    const result= await task();
    console.log(result);
    
}

async function main2 (){
    try{
    const result=await task2();
    console.log(result)}

    catch(e){
        console.log(e)
    }
}

async function main3() {
    try{
    const allpromises=await Promise.all([task(),task2()]);
    console.log(allpromises)}

    catch(e){
        console.log(e)
    }

}

main3();