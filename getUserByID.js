const users = [
    { id: 1, name: "Ayaz" },
    { id: 2, name: "Ali" },
    { id: 3, name: "Sara" }
];

async function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);
            if (user){
            resolve (user);}

            else{
                reject("user not found");
            }
        },2000)

    })
}

async function main() {
    try {
        const user = await getUser(99);
        console.log(user);
    } catch (err) {
        console.log(err);
    }
}

main();