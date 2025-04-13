async function enviarMensagem() {
  const input = document.getElementById("mensagem");
  const chat = document.getElementById("chat");
  const userMsg = input.value.trim();
  if (!userMsg) return;

  const userDiv = document.createElement("div");
  userDiv.innerHTML = "<strong>Você:</strong> " + userMsg;
  chat.appendChild(userDiv);
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

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
        content: userMsg
      }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const botMsg = data.choices?.[0]?.message?.content || "Erro ao responder.";

  const botDiv = document.createElement("div");
  botDiv.innerHTML = "<strong>Bot:</strong> " + botMsg;
  chat.appendChild(botDiv);
  chat.scrollTop = chat.scrollHeight;
}