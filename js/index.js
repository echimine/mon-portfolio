let formulaire = [];
const form = document.querySelector("form");
const loadingOverlay = document.getElementById("loading-overlay");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  let nom = formData.get("nom");
  let prenom = formData.get("prenom");
  let message = formData.get("message");
  let email = formData.get("email");
  let objet = formData.get("object");

  formulaire.push({ "nom": nom, "prenom": prenom, "object": objet, "email": email, "message": message });
  console.log(formulaire);

  try {

    loadingOverlay.style.display = "flex";


    const response = await axios({
      method: 'post',
      url: 'php/mail.php',
      data: {
        formulaire: formulaire
      },
    });

    console.log("Réponse du serveur:", response.data);

    if (response.status === 200) { // Si la réponse est un succès
      //alert("Email envoyé avec succès !");
      form.reset(); // Réinitialiser le formulaire
      formulaire = []
    } else {
      alert("L'email n'a pas été envoyé, veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);

    // Afficher un message d'erreur
    alert("Une erreur s'est produite lors de l'envoi de l'email.");
  } finally {
    // Toujours cacher l'écran de chargement, succès ou erreur
    loadingOverlay.style.display = "none";
  }
});
