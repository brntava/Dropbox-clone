class DropBoxController {

    constructor(){

        this.btnSendFile = document.querySelector("#btn-send-file");
        this.inputFiles = document.querySelector('#files');
        this.snackModal = document.querySelector('#react-snackbar-root')

        this.initEvents();

    }

    initEvents(){

        this.btnSendFile.addEventListener('click', e => {

            this.inputFiles.click();

        });

        this.inputFiles.addEventListener('change', e =>{

            this.uploadTask(e.target.files);

            // Mostrar carregamento das imgs
            this.snackModal.style.display = "block";

        })
    }

    uploadTask(files){

        let promises = [];

        // Transforma em array

        [...files].forEach(file => {

            // Retorna uma promessa para cada file

            promises.push(new Promise ((resolve, reject) => {

                let ajax = new XMLHttpRequest;

                ajax.open('POST', '/upload')

                ajax.onload = event =>{

                    try{

                        resolve(JSON.parse(ajax.responseText));

                    } catch(e){

                        reject(e);

                    }

                };

                ajax.onerror = e =>{

                    reject(e);

                };

                let formData = new FormData();

                formData.append('input-file', file);

                ajax.send(formData)

            }))

        })

        // Retonar um array de promessas
        return Promise.all(promises)

    }

}