function first(){

    let count =0;
    return function(){
        count++;
        console.log(count);
    }
}

first();



function square(x){
    return function(){
        return x*x;
    }
}
const ans=square(3);
console.log(ans());
