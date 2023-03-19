const usersBlock = document.getElementById('usersBlock')
function loadAndAppendUsers() {
    fetchJson('https://jsonplaceholder.typicode.com/users')
        .then(users => {
            usersBlock.append(...users.map(user=>createUserBlock(user)));
        })
}
async function fetchJson(link) {
    return await fetch(link)
        .then(response => response.json())
}
function createUserBlock(item) {
    const userBlock =  document.createElement('div');
    userBlock.classList.add('userBlock');
    const a = document.createElement('a')
    a.href = 'user-details.html?data=' + JSON.stringify(item);
    a.setAttribute('target', '_blank');
    a.classList.add('a')
    userBlock.innerHTML = `<h1>${item.id}:  ${item.name}</h1>`
    a.innerText = 'detail...';
    userBlock.appendChild(a);
    return userBlock;
}
loadAndAppendUsers();
