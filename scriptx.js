document.getElementById("hideButton").addEventListener("click", function () {
    let walletInput = document.getElementById("walletAddress");
    if (walletInput.type === "text") {
        walletInput.type = "password";
        this.textContent = "✅";
    } else {
        walletInput.type = "text";
        this.textContent = "❌";
    }
});

document.getElementById("withdrawBtn").addEventListener("click", function () {
    let walletAddress = document.getElementById("walletAddress").value;
    
    if (walletAddress.trim() === "") {
        alert("Lütfen cüzdan adresinizi girin!");
        return;
    }

    let overlay = document.getElementById("overlay");
    let warningImage = document.getElementById("warning-image");

    // GIF'i göster
    overlay.style.display = "flex";

    // 3 saniye sonra GIF'i gizle ve resmi göster
    setTimeout(() => {
        overlay.style.display = "none";
        warningImage.style.display = "block";

        // 2 saniye sonra resmi gizle ve bakiyeyi sıfırla
        setTimeout(() => {
            warningImage.style.display = "none";

            // Bakiyeleri sıfırla
            document.getElementById("total-balance").textContent = "0,00$";
            document.getElementById("btc").textContent = "0,0$";
            document.getElementById("eth").textContent = "0,0$";
            document.getElementById("bnb").textContent = "0,0$";
            document.getElementById("sol").textContent = "0,0$";
            document.getElementById("trx").textContent = "0,0$";
            document.getElementById("xpr").textContent = "0,0$";
            document.getElementById("usdt").textContent = "0,0$";
            document.getElementById("ltc").textContent = "0,0$";
        }, 2000);
    }, 3000);
});