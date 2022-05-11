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

            console.log(e.target.files);
            this.snackModal.style.display = "block";

        })

    }

}