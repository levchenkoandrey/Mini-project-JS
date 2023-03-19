const postBlock = document.getElementById('postBlock');
const commentsBlock = document.getElementById('commentsBlock');
function loadAndAppendPostDetails() {
    const post = getPost();
    createPostDetails(post);
    CreateButton('Show comments');
}
function getPost() {
    const urlDetails = new URL(location.href);
    const data = urlDetails.searchParams.get('postData');
    return JSON.parse(data);
}
function createPostDetails(post) {
    const {userId,id,title,body} = post;
    return postBlock.innerHTML = `<h2>userID: ${userId}</h2>
                               <h2>ID: ${id}</h2>
                               <h1>${title.charAt(0).toUpperCase() + title.slice(1)}</h1>
                               <p>${body.charAt(0).toUpperCase() + body.slice(1)}</p>`
}
async function fetchJson(link) {
    return await fetch(link)
        .then(response => response.json())
}
function CreateButton(text) {
    const btn = document.createElement('button');
    btn.setAttribute('id', 'btn');
    btn.classList.add('a','show_posts');
    btn.setAttribute('onclick', 'showComments()')
    btn.innerText = text;
    postBlock.appendChild(btn);
}
loadAndAppendPostDetails();

function showComments() {
    const btn = document.getElementById('btn');
    btn.disabled = true;
    const post = getPost();
    const prev = document.createElement("button");
    const next = document.createElement("button");
    prev.classList.add('prevPost');
    next.classList.add('nextPost');
    prev.innerText = 'Show prev Post';
    next.innerText = 'Show next Post';

    fetchJson(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then(comments => {
            console.log(comments)
            let page = 1;
            prev.addEventListener('click', () => handler(comments, page -= 1));
            next.addEventListener('click', () => handler(comments, page += 1));
            handler(comments, page);
        })
    function handler(arr, page, limit = 4) {
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
            newArr.push(createComment(arr[i]));
        }
        commentsBlock.replaceChildren(...newArr);
    }
    postBlock.append(commentsBlock, prev, next);
}
function createComment(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('userBlock', 'comment');
    commentElement.innerHTML = comment.body.charAt(0).toUpperCase() + comment.body.slice(1);
    return commentElement;
}