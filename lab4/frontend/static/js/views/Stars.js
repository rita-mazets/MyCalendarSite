import AbstractView from "./AbstractView.js";
import {Title} from "../components/Title.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Stars");
		this.changeActiveLink("stars");
    }

	async addHandlers(){
		return
    }

    async getHtml() {
		const inner = `<h2 class="intro_suptitle" style="font-family: 'Montserrat', sans-serif;">А что по знаменитостям?</h2>`
        return `
		${Title(inner)}
		<main>
			<article>
				<div class="article_container">
					<p class="intro_littletitle">На этой странице вы можете посмотреть на некоторые достижения Альберта Эйнштейна и Исаака Ньютона</p>
					<img src="static/images/starsa.png" alt="stars calendar" title="" width="90%"><br>
				</div>	
			</article>
		</main>
        `;
    }
}