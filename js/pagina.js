        import { db, auth } from "./js/firebase-config.js";
        import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
        import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

        onAuthStateChanged(auth, async user => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    document.getElementById("userDisplay").innerText = userDoc.data().nomeCompleto || "Usuário";
                }
            } else { window.location.href = "index.html"; }
        });

        document.getElementById("btnLogout").onclick = () => auth.signOut().then(() => window.location.href = "index.html");

        // PWA Install Logic
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('pwa-install-container').style.display = 'block';
        });

        document.getElementById('btnInstall')?.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt = null;
                document.getElementById('pwa-install-container').style.display = 'none';
            }
        });
