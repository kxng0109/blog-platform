fetch("/app/blog/")
    .then((res) => res.json())
    .then((data) => test(data))
    .catch((err) => console.log(err));

const test = (data) => {
    const postList = document.getElementById("post-list");
    data.blog.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postList.appendChild(postElement);
    });
};
