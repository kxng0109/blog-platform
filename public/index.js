// Dummy data for now (you'll replace this with an API call)
const posts = [
    {
        title: "First Blog Post",
        content: "This is a short description of the first post.",
    },
    {
        title: "Second Blog Post",
        content: "Here is a preview of the second post.",
    },
    {
        title: "Third Blog Post",
        content: "Yet another exciting blog post!",
    },
];

// Function to display posts on the page
const displayPosts = () => {
    const postList = document.getElementById("post-list");
    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postList.appendChild(postElement);
    });
};

// Call the function to display posts
displayPosts();
