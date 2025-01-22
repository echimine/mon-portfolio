window.onload = () => {

    getProjet().then(() => {
        const contenthPtojets = document.querySelectorAll(".contenth");
        contenthPtojets.forEach((contentProjet) => {
            contentProjet.addEventListener("click", (e) => {
                let idProjet = contentProjet.getAttribute("idProjet")
                                    console.log(idProjet)
                                    window.location.href = `projet.html?id=${idProjet}`;
            });
        });

        const contentProjets = document.querySelectorAll(".content");
        contentProjets.forEach((contentProjet) => {
            contentProjet.addEventListener("click", (e) => {
                let idProjet = contentProjet.getAttribute("idProjet")
                                    console.log(idProjet)
                                    window.location.href = `projet.html?id=${idProjet}`;
            });
        });

        
    });
};


function getProjet() {
    return new Promise((resolve, reject) => {
        fetch('json/projets.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                let projets = data.projets;
                //console.log(projets);
                const horizontal = document.querySelector('#horizontal');
                const vertical = document.querySelector('.vertical');
                projets.forEach((projet) => {
                    horizontal.innerHTML += `
                    <div idProjet="${projet.id}" class="contenth flex center">
                        <img src="${projet.image}" alt="${projet.commentsImage}">
                        <div class="overlay-2 flex center align-center flex-direction-columns">
                            <h1>${projet.title}</h1>
                            <p>${projet.description}</p>
                        </div>
                    </div>`;

                    vertical.innerHTML += `
                    <div idProjet="${projet.id}" class="content flex center">
                        <img src="${projet.image}" alt="${projet.commentsImage}">
                        <div class="overlay-2 flex center align-center flex-direction-columns">
                            <h1>${projet.title}</h1>
                            <p>${projet.description}</p>
                        </div>
                    </div>`;
                });

                resolve(); 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du fichier JSON :', error);
                reject(error); 
            });
    });
}

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});