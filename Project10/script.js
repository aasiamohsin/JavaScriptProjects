const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');

limit = 10;
page = 1;

// Get post from the API

async function getPosts() {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
};

// Function to show posts After fetching

async function showPosts() {

    const posts = await getPosts();

    posts.forEach( post => {

        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">

            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>

        </div>
        `
        postContainer.appendChild(postElement);
        
    });
}

function showLoader(){

    loader.classList.add('show');

    setTimeout( () => {
        loader.classList.remove('show');

        setTimeout( () => {
            page++;
            showPosts();
        }, 300 );
    }, 1000);
}

// Function to display filtered posts

function filterPost(e) {

    const filterTerm = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach( post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if( title.indexOf(filterTerm) > -1 || body.indexOf(filterTerm) > -1 ) {
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
    });
}

// Display the Fetched posts 

showPosts();

// Event Handlers

// Event listener for scrolling

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if( scrollTop + clientHeight === scrollHeight ){

    showLoader();
}
});

// Event listener to filter post

filter.addEventListener('input', filterPost);




