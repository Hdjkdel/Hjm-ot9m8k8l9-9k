let selectedCoins = [];

function toggleOption(element, coin) {
  const circle = element.querySelector('.circle');
  
  if (selectedCoins.includes(coin)) {
    selectedCoins = selectedCoins.filter(c => c !== coin);
    circle.classList.remove('selected');
  } else {
    selectedCoins.push(coin);
    circle.classList.add('selected');
  }
}

function startSelection() {
  if (selectedCoins.length === 0) {
    alert("Please select at least one coin.");
  } else {
    window.location.href = "indexx.html";
  }
}