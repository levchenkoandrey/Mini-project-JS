const detailsBlock = document.getElementById('detailsBlock');

function loadAndAppendUserDetails() {
    const user = getUser();
    createUserDetails(user);
    createButton('post of current user');
}
function getUser() {
    const urlDetails = new URL(location.href);
    const data = urlDetails.searchParams.get('data');
    return JSON.parse(data);

}
async function fetchJson(link) {
    return await fetch(link)
        .then(response => response.json());
}

function createUserDetails(user) {
    const {id,name,username,email,address:{street,suite,city,zipcode,geo},phone,website,company} = user;
    return detailsBlock.innerHTML = ` <h1>${id} : ${name}</h1>
                                   <h2>userName: ${username}</h2>
                                   <h2>email: ${email} </h2>
                                   <h3>address: ${street} ${suite}, ${city}, ${zipcode}</h3>
                                   <h3>geolocation: ${geo.lat} / ${geo.lng}</h3>
                                   <h2>phone: ${phone} </h2>
                                   <h2>website: ${website} </h2>
                                   <h2>company: ${company.name}</h2>
                                   <h3>catchPhrace: ${company.catchPhrase}</h3>
                                   <h3>bs: ${company.bs}</h3>`;
}
function createButton(text) {
    const btn = document.createElement('button');
    btn.setAttribute('id','btn');
    btn.classList.add('a','show_posts');
    btn.setAttribute('onclick', 'showPosts()');
    btn.innerText = text;
    detailsBlock.appendChild(btn);
}
// function showPosts() {
//     const btn = document.getElementById('btn');
//     btn.disabled = true;
//     const user = getUser();
//     fetchJson(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
//         .then(value => {
//             postsBlock.append(...value.map(post=>createPost(post)));
//         })
//     detailsBlock.appendChild(postsBlock);
// }
function createPost(post) {
    const postBlock = document.createElement('div');
    postBlock.classList.add('userBlock', 'position');
    const title = document.createElement('div');
    const link = document.createElement('a');
    link.classList.add('a');
    link.href = 'post-details.html?postData=' + JSON.stringify(post);
    link.setAttribute('target', '_blank');
    link.innerText = 'detail...';
    title.innerText = post.title.charAt(0).toUpperCase() + post.title.slice(1);
    postBlock.append(title,link);
    return postBlock;
}
loadAndAppendUserDetails();

// function showPosts() {
//     const btn = document.getElementById('btn');
//     btn.disabled = true;
//     const user = getUser();
//
//     let currentPage = 1;
//     const userPerPage = 5;
//
//     const postsBlock = document.createElement("div");
//     postsBlock.classList.add('flex', 'postsBlock');
//
//     const prevButton = document.createElement("button");
//     const nextButton = document.createElement("button");
//
//     prevButton.classList.add('prevPost');
//     nextButton.classList.add('nextPost');
//
//     prevButton.innerText='prev Post';
//     nextButton.innerText='next Post';

//     fetchJson(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
//         .then(posts => {
//             console.log(posts);
//
//             prevButton.addEventListener("click", () => {
//                 if (currentPage > 1) {
//                     postsBlock.innertext = "";
//                     currentPage--;
//                     displayPage(currentPage,posts);
//                 }
//             });
//
//             nextButton.addEventListener("click", () => {
//                 if (currentPage < Math.ceil(posts.length / userPerPage)) {
//                     postsBlock.innertext = "";
//                     currentPage++;
//                     displayPage(currentPage,posts);
//
//                 }
//             });
//             displayPage(currentPage, posts);
//             detailsBlock.append(postsBlock,prevButton, nextButton);
//
//         })
//
//     function displayPage(page, arr) {
//         const startIndex = (page - 1) * userPerPage;
//         const endIndex = startIndex + userPerPage - 1;
//         for (let i = startIndex; i <= endIndex; i++) {
//             if (arr[i]) {
//                 // createPost(arr[i]);
//                 postsBlock.append(createPost(arr[i]));
//             }
//         }
//     }
//
// }

function showPosts() {
    const btn = document.getElementById('btn');
    btn.disabled = true;
    const user = getUser();
    const postsBlock = document.createElement("div");
    postsBlock.classList.add('flex', 'postsBlock');
    const prev = document.createElement("button");
    const next = document.createElement("button");
    prev.classList.add('prevPost');
    next.classList.add('nextPost');
    prev.innerText = 'Show prev Post';
    next.innerText = 'Show next Post';

    fetchJson(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(posts => {
            console.log(posts);
            let page = 1;
            prev.addEventListener('click', () => handler(posts, page -= 1));
            next.addEventListener('click', () => handler(posts, page += 1));
            handler(posts, page);
        })

    function handler(arr, page, limit = 5) {
        const newArr = [];
        const startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        if (endIndex < arr.length) {
            next.removeAttribute('disabled');
        } else {
            next.setAttribute('disabled', 'disabled');
            endIndex = arr.length;
        }
        if (startIndex > 0) {
            prev.removeAttribute('disabled');
        } else {
            prev.setAttribute('disabled', 'disabled');
        }
        for (let i = startIndex; i < endIndex; i++) {
            newArr.push(createPost(arr[i]));
        }
        postsBlock.replaceChildren(...newArr);
    }
        detailsBlock.append(postsBlock, prev, next);
    }