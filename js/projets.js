const projetsWrapper = document.querySelector(".projets-wrapper")


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
                console.log(projets);

                projets.forEach(projet => {
                    console.log(projet.title)

                    projetsWrapper.innerHTML +=
                    `<a href="#" class="projet-card">
                    <img class="projet-card-image" src="${projet.image}" alt="">
                    <div class="flex align-center center flex-wrap" style="margin: 15px 15px;">
                        <div class="projet-card-name"><h3>${projet.title}</h3></div>
                    <div class="projet-card-name"><p>${projet.description}</p></div>
                    </div>
                    <div class="end flex">
                        <span>Voir plus</span>  
                    </div> 
                    </a>`
                });



                resolve();
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du fichier JSON :', error);
                reject(error);
            });
    });
}

getProjet()