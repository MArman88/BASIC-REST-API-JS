let userData = document.getElementById('userData');
let postSection = document.getElementById('posts');
let commentsSection = document.getElementById('comments');


let userSelected, postSelected;

function fetchUsers() {

    get(ENDPOINT_USERS, (data) => {
        for (const user of data) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.innerText = user.username;
            li.appendChild(a);
            li.addEventListener('click', () => {
                selectAUser(user);
            });
            userData.appendChild(li);
        }
        if (data.length > 0) {
            selectAUser(data[0]);
        }
    }, (error) => {
        console.log(error.message)
    })
}

function selectAUser(user) {
    removeAllChildren(postSection);
    if (userSelected) {
        postSection.classList.toggle('postSection');
        if (postSelected) {
            postSelected = undefined;
            removeAllChildren(commentsSection);
            commentsSection.classList.toggle('commentSection');
        }
        userSelected = user;
        fetchPosts(user);
    } else {
        userSelected = user;
        fetchPosts(user);
    }
}

function fetchPosts(user) {
    postSection.classList.toggle('postSection');
    get(ENDPOINT_POSTS_OF_USER(user.id), (data) => {
        for (const post of data) {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="card mt-2">
                <div class="card-body">
                    <label class="card-title fw-bold">${post.title}</label>
                    <p class="card-text">${post.body}</p>
                </div>
                <div class="card-footer">
                    ${user.email}
                </div>
            </div>
            `;

            div.addEventListener('click', () => {
                selectAPost(post);
            });
            postSection.appendChild(div);
        }
        if (data.length > 0) {
            selectAPost(data[0]);
        }
    }, (error) => {
        console.log(error.message)
    })
}

function selectAPost(post) {
    removeAllChildren(commentsSection);
    if (postSelected) {
        commentsSection.classList.toggle('commentSection');
        postSelected = post;
        fetchComments(post.id);
    } else {
        postSelected = post;
        fetchComments(post.id);
    }
}

function fetchComments(postId) {
    commentsSection.classList.toggle('commentSection')
    get(ENDPOINT_COMMENTS_OF_POST(postId), (data) => {
        for (const comment of data) {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="card mt-2">
                <div class="card-body">
                    <label class="card-title fw-bold">${comment.name}</label>
                    <p class="card-text">${comment.body}</p>
                </div>
                <div class="card-footer">
                    ${comment.email}
                </div>
            </div>
            `;
            commentsSection.appendChild(div);
        }
    }, (error) => {
        console.log(error.message)
    })
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

fetchUsers();
