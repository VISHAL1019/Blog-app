const API_URL = "http://localhost:5000/api/posts";


// PROTECT PAGE
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// LOAD POSTS
async function loadPosts() {

    try {

        const response = await fetch(API_URL);

        const posts = await response.json();

        const postsDiv = document.getElementById("posts");

        postsDiv.innerHTML = "";

        posts.forEach(post => {

            postsDiv.innerHTML += `
            
                <div class="post">

                    <h3>${post.title}</h3>

                    <p>${post.content}</p>

                    <small>By ${post.author}</small>

                    <br><br>

                    <button onclick="deletePost('${post._id}')">
                        Delete
                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}


// CREATE POST
async function createPost() {

    try {

        const title = document.getElementById("title").value;

        const content = document.getElementById("content").value;

        const author = document.getElementById("author").value;

        if (!title || !content || !author) {

            alert("Please fill all fields");

            return;

        }

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                content,
                author
            })

        });

        // CLEAR INPUTS
        document.getElementById("title").value = "";

        document.getElementById("content").value = "";

        document.getElementById("author").value = "";

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}


// DELETE POST
async function deletePost(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadPosts();

    } catch (error) {

        console.log(error);

    }

}


// LOGOUT
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}


// LOAD POSTS ON PAGE LOAD
loadPosts();