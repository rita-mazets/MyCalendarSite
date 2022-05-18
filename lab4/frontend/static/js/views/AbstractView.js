export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async changeActiveLink(id) {
        const actives = document.getElementsByClassName('nav_link active');
        Array.from(actives).forEach(element => {
            element.classList.remove("active");
        });
        const about = document.getElementById(id);
        about.classList.add("active");
    }

    async getHtml() {
        return "";
    }

    async addHandlers(){
    }
}