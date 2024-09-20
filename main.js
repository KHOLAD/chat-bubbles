const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");
const REMOVE_TIMEOUT = 7000;

let typingBubble;

function createTypingBubble(text) {
  if (!typingBubble) {
    typingBubble = document.createElement("div");
    typingBubble.classList.add("chat-bubble", "typing-bubble");
    typingBubble.innerText = text;
    chatBox.appendChild(typingBubble);
  } else {
    typingBubble.innerText = text;
  }
}

function createChatBubble(text, isTyping = false) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");
  bubble.innerText = text;

  if (isTyping) {
    bubble.classList.add("typing-bubble");
  }

  setTimeout(() => bubble.classList.add("show"), 10);

  return bubble;
}

function updateTypingBubble(text) {
  if (!typingBubble) {
    typingBubble = createChatBubble(text, true);
    chatBox.appendChild(typingBubble);
  } else {
    typingBubble.innerText = text;
  }
}

chatInput.addEventListener("input", (event) => {
  const text = event.target.value;

  if (text.trim() !== "") {
    updateTypingBubble(text);
  } else if (typingBubble) {
    chatBox.removeChild(typingBubble);
    typingBubble = null;
  }
});

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && chatInput.value.trim() !== "") {
    const text = chatInput.value.trim();

    if (typingBubble) {
      typingBubble.innerText = text;
      typingBubble.classList.remove("typing-bubble");
      typingBubble.classList.add("show");
      typingBubble = null;
    } else {
      const bubble = createChatBubble(text);
      chatBox.appendChild(bubble);
    }

    chatInput.value = "";

    setTimeout(() => {
      const bubbleToRemove = document.querySelector('.chat-bubble.show:not(.typing-bubble)'); if (bubbleToRemove) {
        bubbleToRemove.classList.remove('show');
        bubbleToRemove.classList.add('fade-out');
        setTimeout(() => {
          chatBox.removeChild(bubbleToRemove);
        }, 300);
      }
    }, REMOVE_TIMEOUT);
  }
});
