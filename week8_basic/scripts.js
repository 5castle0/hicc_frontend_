document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    document.getElementById('new-post-button').addEventListener('click', showForm);
    document.getElementById('save-button').addEventListener('click', addPost);
    document.getElementById('cancel-button').addEventListener('click', hideForm);
    // 하나 예시로 주고 나머지 쓰게 하는게 어떨까,,
    
});

function showForm() { // 함수 이름은 주고 아래것 힌트를 주고 쓰게하기
    document.getElementById('post-form').style.display = 'block';
}

function hideForm() {
    document.getElementById('post-form').style.display = 'none';
}

//서버 필요
function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    if (title && content) {
        const post = { title, content };
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('new-post-form').reset();
        hideForm();
        loadPosts();
    } else {
        alert('제목과 내용을 입력하세요.');
    }
}

//서버 필요
function loadPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="edit-button">수정</button>
            <button class="delete-button">삭제</button>
        `;
        li.querySelector('.edit-button').addEventListener('click', () => editPost(index));
        li.querySelector('.delete-button').addEventListener('click', () => deletePost(index));
        postList.appendChild(li);
    });
}

//서버필요
function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    showForm();
    deletePost(index);
}

//서버필요
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}
