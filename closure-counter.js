function counting(){
    let x=0;
    return function(){
        return x++
    }
}

const ans=counting();
console.log(ans());
console.log(ans());
console.log(ans());
console.log(ans());