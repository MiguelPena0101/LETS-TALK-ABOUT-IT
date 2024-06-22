// Function to save posts to local storage
function savePosts(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Function to load posts from local storage
function loadPosts() {
    const posts = localStorage.getItem('blogPosts');
    return posts ? JSON.parse(posts) : [];
}

// Function to render posts
function renderPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-meta">Posted by ${post.author}</p>
            <div class="post-content">${post.content}</div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Initial load of posts
document.addEventListener('DOMContentLoaded', () => {
    const posts = loadPosts();
    renderPosts(posts);

    // Handle form submission
    document.getElementById('postForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const author = document.getElementById('postAuthor').value;
        const content = document.getElementById('postContent').value;
        const newPost = { title, author, content };
        const posts = loadPosts();
        posts.push(newPost);
        savePosts(posts);
        renderPosts(posts);
        document.getElementById('postForm').reset();
    });
});