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
        //console.log(projet)
        
        

        let projetDetail = document.querySelector(".right");
        projetDetail.innerHTML = ''
        projetDetail.innerHTML += `
        <div class="gauche">
                    <h1>${projet.title}</h1>
                    <div class="description flex flex-direction-rows">
                        <div>
                            <p>${projet.text}</p>
                        </div>
                        <div class="technologies">
                            <h2>Technologies</h2>
                        <ul class="competences flex align-center">
                            
                        </ul>
                        <h2>Autres informations</h2>
                        <ul class="informations flex align-center">
                            
                        </ul>
                        </div>
                    </div>
                    <div class="link flex align-center">
                        
                    </div>   
                </div>
                <div class="droite">
                    <div class="image">
                    
                    </div>
                </div>`
      
      ;

      projet.images.forEach(imageTab => {
       let image = imageTab.image
       let imagealt = imageTab.alt
       //console.log(image)
       document.querySelector('.image').innerHTML += ` 
               
                   <img src="${image}" alt="${imagealt}">
               
       `;
   })


   projet.links.forEach(linkTab => {
         let link = linkTab.linksite
         let linkText = linkTab.linkname
         //console.log(link)
         document.querySelector('.link').innerHTML += ` 
                <a target="_blank" href="${link}">${linkText}</a>
         `;
   })

   projet.competences.forEach(technoTab => {
    let techno = technoTab.competence
    
    //console.log(techno)
    document.querySelector('.competences').innerHTML += ` 
            <li>${techno}</li>
            
    `;
   })

   projet.divers.forEach(diversTab => {
    let quand = diversTab.quand
    let quoi = diversTab.quoi
    //console.log(quand)
    document.querySelector('.informations').innerHTML += ` 
            <li>${quand}</li>
            <li>${quoi}</li>
    `;
   })



        resolve();
      })
      .catch(error => {
        console.error(error);
        reject();
      });
  })
}








