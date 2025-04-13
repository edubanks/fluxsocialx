
const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  postList.innerHTML = "";
  posts.forEach((post, index) => {
    const li = document.createElement("li");
    li.innerHTML = \`
      <strong>\${post.title}</strong><br/>
      \${post.content}<br/>
      <em>\${post.hashtags}</em><br/>
      <button onclick="copyPost(\${index})">Copiar</button>
    \`;
    postList.appendChild(li);
  });
}

function copyPost(index) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const post = posts[index];
  const temp = document.createElement("textarea");
  temp.value = post.title + "\n" + post.content + "\n" + post.hashtags;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Post copiado!");
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const hashtags = document.getElementById("hashtags").value;
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.push({ title, content, hashtags });
  localStorage.setItem("posts", JSON.stringify(posts));
  postForm.reset();
  loadPosts();
});

loadPosts();
