const users = [
    { id: 1, name: "Ayaz" },
    { id: 2, name: "Ali" },
    { id: 3, name: "Sara" }
];

async function getUser(id) {
    const user = users.find(u => u.id === id);
    return user;
}

async function main() {
    try {
        const user = await getUser(1);
        console.log(user);
    } catch(err) {
        console.log(err);
    }
}

main();