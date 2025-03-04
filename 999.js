// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyB9z_DMGLF4KGfE573PTkc_2f86GlwEMjg",
    authDomain: "softv-a62b4.firebaseapp.com",
    projectId: "softv-a62b4",
    storageBucket: "softv-a62b4.appspot.com",
    messagingSenderId: "976431864674",
    appId: "1:976431864674:web:d3a52ccf8c13c45a146a3b"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database(); 

// Hata mesajı gösterme fonksiyonu
function showError(msg) {
    let errorMessage = document.getElementById("error-message");
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
}

// Key kontrol fonksiyonu (Optimize Edildi)
function checkKey() {
    let key = document.getElementById("key-input").value.trim();

    if (!key) {
        showError("Lütfen bir key girin.");
        return;
    }

    // 🔥 HIZLI SORGULAMA: Girilen key'i doğrudan Firebase'den çek
    database.ref("keys").orderByChild("value").equalTo(key).once("value").then(snapshot => {
        if (!snapshot.exists()) {
            showError("Geçersiz veya pasif key!");
            return;
        }

        let keyData = Object.values(snapshot.val())[0]; // İlk eşleşen key’i al
        let { page, expiry } = keyData;

        // Süresi dolmuş mu?
        if (expiry && expiry !== "Sonsuz" && Date.now() > expiry) {
            showError("Bu key'in süresi dolmuş!");
            return;
        }

        // Key geçerliyse oturum kaydet ve yönlendir
        sessionStorage.setItem("savedKey", JSON.stringify({ key, page, expiry }));
        window.location.href = page;
    }).catch(error => {
        console.error("Firebase hatası:", error);
        showError("Bir hata oluştu. Lütfen tekrar deneyin.");
    });
}

// **🔥 Süresi dolmuş key'leri Firebase'den otomatik silen fonksiyon**
function clearExpiredKeys() {
    database.ref("keys").once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
            let keyData = childSnapshot.val();
            if (keyData.expiry && keyData.expiry !== "Sonsuz" && Date.now() > keyData.expiry) {
                database.ref("keys/" + childSnapshot.key).remove()
                    .then(() => console.log(`⏳ Süresi dolan key silindi: ${keyData.value}`))
                    .catch(err => console.error("Key silme hatası:", err));
            }
        });
    });
}

// Sayfa açıldığında eski key'leri temizle
window.onload = function() {
    clearExpiredKeys();

    let savedData = sessionStorage.getItem("savedKey");

    if (savedData) {
        let { key, page, expiry } = JSON.parse(savedData);

        // Eğer key’in süresi geçtiyse, kaydı sil
        if (expiry && expiry !== "Sonsuz" && Date.now() > expiry) {
            sessionStorage.removeItem("savedKey");
            console.log("Kaydedilmiş key'in süresi doldu.");
            return;
        }

        // Eğer key geçerliyse, yönlendir
        if (page) {
            window.location.href = page;
        }
    }
};