
const form = document.getElementById("postForm");
const temaInput = document.getElementById("tema");
const output = document.getElementById("output");
const postList = document.getElementById("postList");

const exemplos = [
  tema => `Transforme seu look com estilo e autenticidade. Dica de hoje sobre ${tema}: aposte em peças leves e tons neutros! #Estilo #${tema.replace(/\s/g, '')}`,
  tema => `Você sabia que ${tema} pode valorizar sua imagem nas redes? Teste agora mesmo e surpreenda-se. #DicaDeHoje #${tema.replace(/\s/g, '')}`,
  tema => `Conecte-se com sua audiência através de conteúdos sobre ${tema}. Estratégia certeira para engajamento! #Marketing #Conteúdo`
];

function gerarPost() {
  const tema = temaInput.value.trim();
  if (!tema) return alert("Digite um tema para gerar o post.");
  const modelo = exemplos[Math.floor(Math.random() * exemplos.length)];
  output.value = modelo(tema);
}

function salvarPost(e) {
  e.preventDefault();
  const texto = output.value.trim();
  if (!texto) return alert("Gere um post antes de salvar.");
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.unshift(texto);
  localStorage.setItem("posts", JSON.stringify(posts));
  output.value = "";
  temaInput.value = "";
  carregarPosts();
}

function carregarPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  postList.innerHTML = "";
  posts.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = \`\${p}<br/><button onclick="copiarPost(\${i})">Copiar</button>\`;
    postList.appendChild(li);
  });
}

function copiarPost(index) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const temp = document.createElement("textarea");
  temp.value = posts[index];
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Post copiado!");
}

form.addEventListener("submit", salvarPost);
carregarPosts();
