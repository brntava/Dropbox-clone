class DropBoxController {

    constructor(){

        this.btnSendFile = document.querySelector("#btn-send-file");
        this.inputFiles = document.querySelector('#files');
        this.snackModal = document.querySelector('#react-snackbar-root');
        this.progressBar = document.querySelector('.mc-progress-bar-fg');
        this.nameFile = document.querySelector('.filename');
        this.timeLeftEl = document.querySelector('.timeleft')

        this.initEvents();

    }

    initEvents(){

        this.btnSendFile.addEventListener('click', e => {

            this.inputFiles.click();

        });

        this.inputFiles.addEventListener('change', e =>{

            this.uploadTask(e.target.files);

            // Mostrar carregamento das imgs
            this.modalShow();

            this.inputFiles.value = '';

        })
    }

    modalShow(show = true){

        this.snackModal.style.display = (show) ? 'block' : 'none'

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

                    this.modalShow(false)

                    try{

                        resolve(JSON.parse(ajax.responseText));

                    } catch(e){

                        reject(e);

                    }

                };

                ajax.onerror = e =>{

                    this.modalShow(false)

                    reject(e);

                };

                ajax.upload.onprogress = e =>{

                    this.uploadProgress(e, file)

                }

                let formData = new FormData();

                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                ajax.send(formData)

            }))

        })

        // Retonar um array de promessas
        return Promise.all(promises)

    }

    uploadProgress(event, file){

        // Dados ja carregados

        let timeSpent = Date.now() - this.startUploadTime;

        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 100);

        let timeLeft = ((100 - porcent) * timeSpent) / porcent

        this.progressBar.style.width = `${porcent}%`;

        this.nameFile.innerHTML = file.name;
        this.timeLeftEl.innerHTML = this.formatTime(timeLeft);

    }

    formatTime(duration){

        let ss = parseInt((duration / 1000) % 60);
        let mm = parseInt((duration / (1000 * 60)) % 60);
        let hh = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hh > 0) {
            return `${hh} horas, ${mm} minutos e ${ss} segundos`;
        }
        if(mm > 0) {
            return `${mm} minutos e ${ss} segundos`;
        }
        if(ss > 0) {
            return `${ss} segundos`;
        }

        return '';
        
    }

}