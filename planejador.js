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

async function gerarPlanejamento() {
  const tema = document.getElementById("tema").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Gerando planejamento...";

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
        content: `Crie um planejamento semanal de posts para o nicho: "${tema}", com 7 ideias criativas e impactantes para Instagram.`
      }],
      temperature: 0.8
    })
  });

  const data = await response.json();
  const plano = data.choices?.[0]?.message?.content || "Erro ao gerar.";
  resultado.innerText = plano;

  await setDoc(doc(db, "planejamentos", userId + "_" + Date.now()), {
    usuario: userId,
    tema: tema,
    planejamento: plano,
    data: new Date().toISOString()
  });
}
window.gerarPlanejamento = gerarPlanejamento;