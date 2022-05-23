import {
  set,
  ref,
  get,
  child,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
import { User } from "./User.js";
import { auth, database } from "./firebase.js";
import { navigateTo } from "./index.js";
import { GetAssessmentPicture } from "./storage.js";

async function addPictures(id) {
  const data = localStorage.getItem("data");

  if (data === "null") {
    return;
  }
  const files = JSON.parse(data).files;

  if (files) {
    const filesName = files.split(",");
    for (var i = 0; i < filesName.length - 1; i++) {
      await GetAssessmentPicture(id, filesName[i]);
    }
  }
}

export const getAssesmentInfo = async (weekId) => {
  const user = auth.currentUser;
  const userRef = ref(database);
  get(child(userRef, `discription/${user.uid}/${weekId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        console.log("No data available");
        localStorage.setItem("data", null);
      }
    })
    .then(() => {
      addPictures(weekId).then(() => navigateTo("/myCalendar"));
    });
};

export async function setAssessmentInfo(id, mood, text, files) {
  const user = auth.currentUser;
  let userRef = ref(database, `discription/${user.uid}/${id}`);
  set(userRef, {
    mood: mood,
    text: text,
    files: files,
  }).catch((error) => {
    console.log("Assessment Info:", error.message);
    alert("Assessment info was not saved!");
  });
}

export async function getUser() {
  const user = auth.currentUser;
  const userRef = ref(database, `users/${user.uid}`);
  const localUser = new User();
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();

    localUser.name = data.name;
    localUser.id = user.uid;
    localUser.year = data.year;
    localUser.month = data.month;
    localUser.day = data.day;
    localStorage.setItem("User", JSON.stringify(localUser));
  });
}

export async function setUser(user) {
  const us = auth.currentUser;
  let userRef = ref(database, `users/${us.uid}`);
  set(userRef, {
    email: user.email,
    name: user.name,
    year: user.year,
    month: user.month,
    day: user.day,
  }).catch((error) => {
    console.log("Sign Up:", error.message);
  });
}
