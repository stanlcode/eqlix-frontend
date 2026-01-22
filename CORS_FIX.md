# 🔧 Résolution de l'Erreur CORS - Frontend EQLIX

## 🚨 Problème Identifié

```
Access to fetch at 'http://localhost:5000/api/contact' from origin 'null' 
has been blocked by CORS policy
```

**Cause** : Le site est ouvert via `file://` au lieu de `http://localhost:5500`

## ✅ Solution : Démarrer un Serveur HTTP Local

### Option 1 : Live Server (VS Code) - **RECOMMANDÉ**

1. **Installer l'extension Live Server** dans VS Code
   - Ouvrir VS Code
   - Aller dans Extensions (Ctrl+Shift+X)
   - Chercher "Live Server"
   - Installer l'extension de Ritwick Dey

2. **Démarrer le serveur**
   - Ouvrir le dossier `EQX SITE` dans VS Code
   - Clic droit sur `index.html`
   - Sélectionner **"Open with Live Server"**
   - Le site s'ouvrira sur `http://localhost:5500` ou `http://127.0.0.1:5500`

3. **Tester le formulaire**
   - Le formulaire de contact fonctionnera maintenant !

---

### Option 2 : Python HTTP Server

```bash
# Aller dans le dossier du site
cd "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

# Démarrer le serveur Python
python -m http.server 5500
```

Puis ouvrir http://localhost:5500 dans le navigateur.

---

### Option 3 : Node.js HTTP Server

```bash
# Installer http-server globalement (une seule fois)
npm install -g http-server

# Aller dans le dossier du site
cd "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

# Démarrer le serveur
http-server -p 5500
```

Puis ouvrir http://localhost:5500 dans le navigateur.

---

## 🧪 Vérification

Une fois le serveur démarré :

1. ✅ URL devrait être : `http://localhost:5500` (pas `file://`)
2. ✅ Ouvrir la console (F12)
3. ✅ Remplir le formulaire de contact
4. ✅ Cliquer sur "Envoyer la demande"
5. ✅ Vous devriez voir : "Votre message a été envoyé avec succès !"

### Logs Attendus dans la Console

```
✅ API Configuration loaded - Backend: http://localhost:5000/api
✅ EQLIX MEDIA CREATION - Website loaded successfully! 🚀
```

Et après soumission :
```
POST http://localhost:5000/api/contact 201 (Created)
```

---

## 📝 Pourquoi ça ne marchait pas ?

| Méthode | Origine | Backend CORS | Résultat |
|---------|---------|--------------|----------|
| `file://` | `null` | ❌ Rejeté | Erreur CORS |
| `http://localhost:5500` | `http://localhost:5500` | ✅ Autorisé | Fonctionne ! |

Le backend est configuré pour accepter uniquement les requêtes de `http://localhost:5500` pour des raisons de sécurité.

---

## 🎯 Prochaines Étapes

1. **Démarrer Live Server** (Option 1 recommandée)
2. **Tester le formulaire de contact**
3. **Vérifier l'email** - Un email devrait être envoyé à `toussaintstanley11@gmail.com`
4. **Vérifier MongoDB** - Le contact sera sauvegardé dans la base de données

---

**Une fois le serveur démarré, tout fonctionnera parfaitement !** 🚀
