function getFooter() {
    //console.log(idProjet)
    return new Promise((resolve, reject) => {
      fetch('json/footer.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          //console.log(data.footer)
        const footerHTML =  document.querySelector('.footer-ul')
            let footer = data.footer;
            
            footer.forEach(elementFooter => {
                //console.log(elementFooter.text)
                footerHTML.innerHTML += `
                <li id="footer-li">
                    <a class="flex center align-center flex-direction-columns"
                        href="${elementFooter.link}">
                        <i class="${elementFooter.iconclass}"></i>
                        <span>${elementFooter.text}</span>
                    </a>
                </li>
                `
            });
  
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject();
        });
    })
  }
  
  
  getFooter()
  
  
  
  
  
  