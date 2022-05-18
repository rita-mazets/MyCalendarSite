import {uploadBytes, ref, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-storage.js"
import {auth, storage} from "./firebase.js"

export function SetAssessmentPicture(files, id){
    const user = auth.currentUser
    files.forEach(file => {
        const storageRef = ref(storage, `images/${user.uid}/${id}/${file.name}`);
        uploadBytes(storageRef, file).then(snapshot => {
        console.log('Uploaded a blob or file!');
        });
    })
}

export async function GetAssessmentPicture(weekId,fileName) {
    const user = auth.currentUser
    getDownloadURL(ref(storage, `images/${user.uid}/${weekId}/${fileName}`))
    .then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    const preview = document.getElementById('preview');
    preview.insertAdjacentHTML('afterbegin', `
                <div class="preview-image">
                <div class="preview-remove" data-name="${fileName}">&times;</div>
                <img src="${url}" alt="${fileName}" />
                </div>
            `)
    const upload = document.getElementById('save-button')
    upload.remove()
    const add = document.getElementById('add_btn')
    add.remove()
  })
  .catch((error) => {
    console.log('GetAssessmentPicture', error.message)
  });


}