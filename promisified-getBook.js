function getBook(){
    fetch('http://localhost:3000/books')
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(function(err){
        console.log(err)
    })

}

getBook();