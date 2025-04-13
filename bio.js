import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userId = "usuario_demo";

async function gerarBio() {
  const descricao = document.getElementById("descricao").value;
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "Gerando bio...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer SUA_API_KEY_OPENAI"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Com base nesta descrição: "${descricao}", gere uma bio magnética e criativa para redes sociais com até 160 caracteres. Use emojis.`
      }],
      temperature: 0.85
    })
  });

  const data = await response.json();
  const bio = data.choices?.[0]?.message?.content || "Erro ao gerar.";
  resultadoDiv.innerText = bio;

  await setDoc(doc(db, "bios", userId + "_" + Date.now()), {
    usuario: userId,
    descricao: descricao,
    bio: bio,
    data: new Date().toISOString()
  });
}
window.gerarBio = gerarBio;