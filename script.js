// Accordion functionality for education page
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    var isOpen = panel.style.maxHeight;
    // Toggle the active state and aria-expanded attribute
    this.classList.toggle("active");
    this.setAttribute("aria-expanded", !isOpen);
    // Toggle maxHeight for smooth transition
    if (isOpen) {
      panel.style.maxHeight = null;
      panel.setAttribute("aria-hidden", "true");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute("aria-hidden", "false");
    }
  });
}

// Add click event for flip cards
document.addEventListener('DOMContentLoaded', function() {
  var flipCards = document.querySelectorAll('.flip-card');
  
  flipCards.forEach(function(card) {
    card.addEventListener('click', function() {
      // Toggle flip class
      const cardInner = this.querySelector('.flip-card-inner');
      cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });
    
    // For accessibility - handle keyboard events
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cardInner = this.querySelector('.flip-card-inner');
        cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
      }
    });
    
    // Add tabindex for keyboard navigation
    card.setAttribute('tabindex', '0');
  });
});

// Utility function to get a readable timestamp
function getTimestamp() {
  return new Date().toLocaleString(); // e.g., "4/13/2025, 5:45:23 PM"
}

// Utility function to classify the clicked/viewed element
function getElementType(element) {
  const tag = element.tagName.toLowerCase();

  if (tag === "img") return "image";
  if (tag === "button" || element.classList.contains("nav-button")) return "button";
  if (tag === "select") return "dropdown";
  if (tag === "a") return "link";
  if (tag === "input") return "input field";
  if (tag === "textarea") return "textarea";
  if (["h1", "h2", "h3", "p", "span", "div"].includes(tag)) return "text";
  
  return "other";
}

// Log page view
window.addEventListener("load", () => {
  const timestamp = getTimestamp();
  console.log(`${timestamp} , view , page`);
});

// Log all clicks
document.addEventListener("click", (event) => {
  const target = event.target;
  const timestamp = getTimestamp();
  const elementType = getElementType(target);

  console.log(`${timestamp} , click , ${elementType}`);
});


// Show/Hide Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("analyzerModal");
  const btn = document.getElementById("analyzerBtn");
  const span = document.querySelector(".close");

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
});

function analyzeText() {
  const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their"];
  const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "for", "of", "off", "over", "under"];
  const articles = ["a", "an", "the"];

  const text = document.getElementById("inputText").value;
  
  const words = text.trim().split(/\s+/);
  // Check if the word count is less than 10,000
  if (words.length < 10000) {
    alert("Please enter more words. Your current word count is less than 10,000.");
    return; // Exit the function if the word count is less than 10,000
  }

  const letters = text.match(/[a-zA-Z]/g) || [];
  const spaces = text.match(/ /g) || [];
  const newlines = text.match(/\n/g) || [];
  const specialSymbols = text.match(/[^\w\s]/g) || [];
  const wordCounts = text.toLowerCase().match(/\b[a-z']+\b/g) || [];

  const countOccurrences = (list) => {
    const countMap = {};
    for (const word of wordCounts) {
      if (list.includes(word)) {
        countMap[word] = (countMap[word] || 0) + 1;
      }
    }
    return countMap;
  };

  const pronounCounts = countOccurrences(pronouns);
  const prepositionCounts = countOccurrences(prepositions);
  const articleCounts = countOccurrences(articles);

  document.getElementById("results").innerHTML = `
    <h3>Basic Stats</h3>
    <p><strong>Letters:</strong> ${letters.length}</p>
    <p><strong>Words:</strong> ${words.length}</p>
    <p><strong>Spaces:</strong> ${spaces.length}</p>
    <p><strong>Newlines:</strong> ${newlines.length}</p>
    <p><strong>Special Symbols:</strong> ${specialSymbols.length}</p>

    <h3>Pronouns</h3><pre>${JSON.stringify(pronounCounts, null, 2)}</pre>
    <h3>Prepositions</h3><pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>
    <h3>Indefinite Articles</h3><pre>${JSON.stringify(articleCounts, null, 2)}</pre>
  `;
}


