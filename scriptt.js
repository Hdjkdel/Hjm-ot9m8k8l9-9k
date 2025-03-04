document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(image => imageObserver.observe(image));
});

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});

document.addEventListener('copy', function(e) {
  e.preventDefault();
  alert('Copying is not allowed!');
});

let running = false;
let checked = 0;

// Array of English words to simulate wallet addresses
const englishWords = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine",
  "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "xigua", "yam", "zucchini"
];

function generateWallet() {
  const randomWords = [];
  for (let i = 0; i < 12; i++) {
    const randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];
    randomWords.push(randomWord);
  }
  return randomWords;
}

function addMessage() {
  if (!running) return;
  
  const walletWords = generateWallet(); // Generate a wallet address as 12 words
  const displayWords = walletWords.slice(0, 4).join(' ') + '...'; // Show only the first two words followed by '...'

  const div = document.createElement('div');
  div.textContent = `∆*seed* ${displayWords}`;
  document.getElementById('output').appendChild(div);
  document.getElementById('output').scrollTop = document.getElementById('output').scrollHeight;
  checked++;
  document.getElementById('checked').textContent = checked;
  setTimeout(addMessage, 20); // Speed adjustment (every 50ms)
}

document.getElementById('start').onclick = function() {
  running = true;
  addMessage();
};

document.getElementById('stop').onclick = function() {
  running = false;
};