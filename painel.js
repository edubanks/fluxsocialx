import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

async function carregarBios() {
  const biosDiv = document.getElementById("bios");
  const biosSnapshot = await getDocs(collection(db, "bios"));
  biosSnapshot.forEach((doc) => {
    const data = doc.data();
    const bioHTML = `
      <div class="bio-card">
        <p><strong>Descrição:</strong> ${data.descricao}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><small>${new Date(data.data).toLocaleString()}</small></p>
      </div>
    `;
    biosDiv.innerHTML += bioHTML;
  });
}

carregarBios();