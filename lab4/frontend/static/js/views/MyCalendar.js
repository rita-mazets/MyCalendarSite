import AbstractView from "./AbstractView.js";
import { Title } from "../components/Title.js";
import { Assessment } from "../components/Assessment.js";
import { getAssesmentInfo, setAssessmentInfo } from "../fdatabase.js";
import { SetAssessmentPicture } from "../storage.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("My Calendar");
    this.changeActiveLink("mycalendar");
  }

  async addBirthDate(name, year, month, day) {
    document.getElementById("birthdate").textContent =
      name + ", You were born " + day + "." + month + "." + year;
  }

  async changeActiveButton(birthdate) {
    let now = new Date();
    let diff = (now - birthdate) / 1000 / 60 / 60 / 24 / 7;
    let i = 1;
    while (i < diff) {
      var link = document.getElementById(i++);
      link.classList.add("calendar-button-active");
    }

    document.getElementById(i).classList.add("calendar-button-now");
  }

  async addHandlers() {
    const user = JSON.parse(localStorage.getItem("User"));

    this.changeActiveButton(new Date(user.year, user.month, user.day));
    this.addBirthDate(user.name, user.year, user.month, user.day);
    const week = document.getElementById("button-weeks");
    week.addEventListener("click", async (event) => {
      if (!event.target.id) {
        return;
      }

      const { id } = event.target;
      localStorage.setItem("weekId", id);
      await getAssesmentInfo(id);
    });
    this.upload("addPictures");
  }

  element(tag, classes = [], content) {
    const node = document.createElement(tag);

    if (classes.length) {
      node.classList.add(...classes);
    }

    if (content) {
      node.textContent = content;
    }

    return node;
  }

  upload(selector) {
    let files = [];
    let input = document.getElementById(selector);
    if (input === null) {
      return;
    }

    const preview = document.getElementById("preview");
    const open = this.element(
      "button",
      ["custom-button", "accesmant-button"],
      "Add pictures"
    );
    open.id = "add_btn";
    const upload = document.getElementById("save-button");

    input.insertAdjacentElement("afterend", open);

    const triggerInput = (event) => {
      event.preventDefault();
      input.click();
    };

    const changeHandler = (event) => {
      if (!event.target.files.length) {
        return;
      }

      files = Array.from(event.target.files);
      upload.style.display = "inline";

      files.forEach((file) => {
        if (!file.type.match("image")) {
          return;
        }

        const reader = new FileReader();

        reader.onload = (ev) => {
          console.log(preview);
          const src = ev.target.result;
          preview.insertAdjacentHTML(
            "afterbegin",
            `
                <div class="preview-image">
                <div class="preview-remove" data-name="${file.name}">&times;</div>
                <img src="${src}" alt="${file.name}" />
                </div>
            `
          );
        };
        localStorage.removeItem("files");
        localStorage.setItem("files", JSON.stringify(files));
        reader.readAsDataURL(file);
      });
    };

    const removeHandler = (event) => {
      if (!event.target.dataset.name) {
        return;
      }

      const { name } = event.target.dataset;
      files = files.filter((file) => file.name !== name);

      const block = preview
        .querySelector(`[data-name="${name}"]`)
        .closest(".preview-image");

      block.classList.add("removing");
      setTimeout(() => block.remove(), 300);
    };

    const uploadHandler = (e) => {
      e.preventDefault();
      let mood = document.getElementById("mood");
      const text = document.getElementById("textarea").value;
      const id = localStorage.getItem("weekId");

      if (mood === null) {
        mood = JSON.parse(localStorage.getItem("data")).mood;
      } else {
        mood = mood.value;
      }

      let filenamestring = "";
      files.forEach((file) => {
        filenamestring += file.name + ",";
      });

      setAssessmentInfo(id, mood, text, filenamestring);
      SetAssessmentPicture(files, id);
      alert("The data has been saved");
    };

    open.addEventListener("click", triggerInput);
    input.addEventListener("change", changeHandler);
    preview.addEventListener("click", removeHandler);
    upload.addEventListener("click", uploadHandler);
  }

  async getHtml() {
    const inner = `<h1 class="intro_title">Calendar Of Life</h1>
        <h2 class="intro_suptitle">In Weeks</h2>`;

    let result = "";
    let week = 1;
    let years = 5;
    const calendarten = `<div class="calendar-ten">`;
    const calendarrow = `<div class="row">`;
    const div = `</div>`;

    for (var l = 0; l < 18; l++) {
      for (var k = 0; k < 5; k++) {
        result += calendarrow;
        for (var j = 0; j < 5; j++) {
          result += calendarten;
          for (var i = 0; i < 10; i++) {
            result += `<a id="${week++}" href="#assessment" class="calendar-button"></a>`;
          }
          result += div;
        }
        result += `
                    <div class="calendar-ten">
                        <a id="${week++}" href="#assessment" class="calendar-button" ></a>
                        <a id="${week++}" href="#assessment" class="calendar-button" ></a>
                    </div>`;

        result += div;
      }
      result += `<div class="year">${years}</div>`;
      years += 5;
    }

    return `
        ${Title(inner)}
            <main>
                <div class="article_container">
                    <div class="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                        
                    <div class="main-text margin-bot">
                        <span id="birthdate"></span>
                    </div>
                    <div class="calendar">
                        <section id="button-weeks"class="life-grid">
                            ${result}
                        </section>
                    </div>
                </div>
                <div id="assessment-section" class="accesmant article_container">
                    ${await Assessment()}
                </div>
            </main>
        `;
  }
}
