const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");
const REMOVE_TIMEOUT = 7000;

let typingBubble; // To keep track of the current typing bubble

function createTypingBubble(text) {
  if (!typingBubble) {
    typingBubble = document.createElement("div");
    typingBubble.classList.add("chat-bubble", "typing-bubble");
    typingBubble.innerText = text;
    chatBox.appendChild(typingBubble);
  } else {
    typingBubble.innerText = text; // Update existing typing bubble
  }
}

// Function to create a chat bubble
function createChatBubble(text, isTyping = false) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");
  bubble.innerText = text;

  if (isTyping) {
    bubble.classList.add("typing-bubble"); // Add class for typing bubbles if needed
  }

  // Add the 'show' class after a short delay to trigger the fade-in effect
  setTimeout(() => bubble.classList.add("show"), 10);

  return bubble;
}

// Function to update the typing bubble
function updateTypingBubble(text) {
  if (!typingBubble) {
    typingBubble = createChatBubble(text, true); // Create typing bubble if it doesn't exist
    chatBox.appendChild(typingBubble);
  } else {
    typingBubble.innerText = text; // Update existing typing bubble
  }
}

// Event listener for typing (input event)
chatInput.addEventListener("input", (event) => {
  const text = event.target.value;

  if (text.trim() !== "") {
    updateTypingBubble(text); // Update or create typing bubble with user input
  } else if (typingBubble) {
    chatBox.removeChild(typingBubble); // Remove the typing bubble if input is cleared
    typingBubble = null;
  }
});

// Event listener for Enter key
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && chatInput.value.trim() !== "") {
    const text = chatInput.value.trim();

    // Convert the typing bubble into a regular bubble
    if (typingBubble) {
      typingBubble.innerText = text;
      typingBubble.classList.remove("typing-bubble");
      typingBubble.classList.add("show"); // Trigger fade-in animation
      typingBubble = null; // Reset typing bubble for new typing actions
    } else {
      // If no typing bubble exists (edge case), just create a new one
      const bubble = createChatBubble(text);
      chatBox.appendChild(bubble);
    }

    // Clear the input field
    chatInput.value = "";

    // Remove the bubble after timeout with a fade-out effect
    setTimeout(() => {
      const bubbleToRemove = document.querySelector('.chat-bubble.show:not(.typing-bubble)'); // Select finalized bubble
      if (bubbleToRemove) {
        bubbleToRemove.classList.remove('show');  // Start fade-out by removing 'show'
        bubbleToRemove.classList.add('fade-out'); // Trigger fade-out animation
        setTimeout(() => {
          chatBox.removeChild(bubbleToRemove);   // Remove the element after fade-out completes
        }, 300); // Match the fade-out duration in CSS
      }
    }, REMOVE_TIMEOUT);
  }
});
