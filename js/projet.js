const url = new URLSearchParams(location.search);
const idProjet = url.get("id")
//console.log(idProjet)


window.onload = () => { 

  getProjetDetail(idProjet)


}



function getProjetDetail(idProjet) {
  //console.log(idProjet)
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

        let projet = projets.find(projet => projet.id == idProjet);

        let contexte = projet.content[0]
        //console.log(contexte)
        let titreContexte = contexte.title
        let paragraphe1 = contexte.paragraphe1
        let paragraphe2 = contexte.paragraphe2
        let paragraphe3 = contexte.paragraphe3

        let etape = projet.content[1]
        let titreEtape = etape.title
        let sousTitreEtape1 = etape.sousTitre1
        let sousTitreEtape2 = etape.sousTitre2
        let sousTitreEtape3 = etape.sousTitre3
        let paragraphe1Etape = etape.paragraphe1
        let paragraphe2Etape = etape.paragraphe2
        let paragraphe3Etape = etape.paragraphe3
        let paragraphe4Etape = etape.paragraphe4
        let image1 = etape.image1
        let image2 = etape.image2
        let image3 = etape.image3
        let image4 = etape.image4
        let image5 = etape.image5
        let image6 = etape.image6
        let image7 = etape.image7


        let impressions = projet.content[2]
        let titreImpressions = impressions.title
        let paragraphe1Impressions = impressions.paragraphe1
        let paragraphe2Impressions = impressions.paragraphe2

        let projetDetail = document.querySelector(".right");
        projetDetail.innerHTML = ''
        projetDetail.innerHTML += `
      <div class="titre-right" id="titre-projet">
                    <div class="center flex">
                        <h1>${projet.title}</h1>
                    </div>
                    <div class="img-right center flex">
                        <img src="${projet.image}" alt="${projet.commentsImage}">
                    </div>
                </div>
                
                <div class="flex center space-around" style="margin: 38px 0;">
                <div class="flex align-center flex-direction-columns"><a href="${projet.linkSite}" target="_blank" class="btn-site" >${projet.linkName}</a></div>
                <div><a href="${projet.linkGithub}" target="_blank" class="btn-site">${projet.linkGithubName}</a></div>
                  
                  
                </div>
                
                <div class="contexte">
                        <h2>${titreContexte}</h2>
                </div>
                <div class="contexte-content flex align-center" id="contexte">
                
                <div class="flex flex-direction-columns align-start">
                    <p>
                        ${paragraphe1}
                    </p>
                    <p>
                        ${paragraphe2}
                    </p>
                    <p>
                        ${paragraphe3}
                    </p>
                </div>
                <div class="flex center">
                 <img class="projet-logo" src="${projet.logo}" alt="${projet.logoAlt}"> 
                </div>
                    
                </div>
                <div class="etape-content" id="etape">
                    <div class="etape flex start">
                        <h2>${titreEtape}</h2>
                    </div>
                    <h3>${sousTitreEtape1}</h3>
                      <p>
                        ${paragraphe1Etape}
                    </p>
                    
                    <div class="etape-1 flex align-center flex-wrap center" style="margin-top: 16px;">
                        <img src="${image1}" alt="">
                    </div>
                    <h3>
                        ${sousTitreEtape2}
                    </h3>
                    <p>
                            ${paragraphe2Etape}
                        </p>
                    <div class="etape-2 flex align-center center flex-wrap " style="margin-top: 16px;">
                        
                    
                        <div>
                            <img src="${image2}" alt="">
                            <img src="${image3}" alt="">
                        </div>
                    </div>
                      
                        <p>
                            ${paragraphe3Etape}
                        </p>
                      
                        <div class="etape-2 flex align-center center flex-wrap " style="margin-top: 16px;">
                        
                    
                        <div>
                            <img src="${image4}" alt="">
                            <img src="${image5}" alt="">
                        </div>
                    </div>

                    
                    <h3>
                        ${sousTitreEtape3}
                    </h3>
                    <p>
                      ${paragraphe4Etape}
                    </p>
                    <div class="etape-2 flex align-center center flex-wrap" style="margin-top: 16px;">
                        
                        <div>
                            <img src="${image6}" alt="">
                            <img src="${image7}" alt="">
                        </div>
                    </div>
                    <div class="mes-impressions-content" id="contexte">
                        <div class="mes-impressions flex start">
                            <h2>${titreImpressions}</h2>
                        </div>
                        <p>
                           ${paragraphe1Impressions}
                        </p>
                        <p>
                            ${paragraphe2Impressions}
                        </p>
                    </div>
                </div>
      `;
        resolve();
      })
      .catch(error => {
        console.error(error);
        reject();
      });
  })
}








