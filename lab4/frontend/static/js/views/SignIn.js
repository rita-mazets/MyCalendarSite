import {signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js"
import AbstractView from "./AbstractView.js"
import {getUser} from "../fdatabase.js"
import { navigateTo } from "../index.js"
import {auth} from "../firebase.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sing In");
		this.changeActiveLink("singIn");
    }

	async addHandlers(){
		document.getElementById('sign-in').addEventListener('click', function(e){
			e.preventDefault()
			const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		if((email=== null || !email.length) &&(password === null || !password.length)){
			alert('Enter email and password!')
			return
		}

		signInWithEmailAndPassword(auth, email, password)
		.then(async () =>{
			await getUser()
			document.getElementById('mycalendar').classList.remove('disabled')		
        })
		.then(() => {
			var sign = document.getElementById('header_signin')
			var singIn = document.getElementById('singIn')
			sign.removeChild(singIn)
			var signOutA = document.createElement('a')
			signOutA.classList.add('nav_link')
			signOutA.classList.add('active')
			signOutA.textContent = 'Sign Out'
			signOutA.id = "signOut"
			signOutA.href = '/singIn'
			sign.insertAdjacentElement('afterbegin', signOutA)

			const signOutHandler = () => {
				signOut(auth).then((e) => {
				localStorage.clear()
				console.log('Sign out:','Success')
				localStorage.clear()
			})              
			.catch((error) => {
				console.log("Sign out error:",error.message)
			});
			}
			signOutA.addEventListener('click', signOutHandler) 
			navigateTo('/')
		})
		.catch((error) => {
			console.log("Sign in error:",error.message)
			alert('You are not logged in')
			navigateTo('/singIn')
		});
		
		})
	}

    async getHtml() {
        return `
        <div class="intro">
		<div class="container">
			<div class="intro_inner">
				<main>
					<div class="sign_in">
						<span>Sign in with your email and password</span>
						<form id="auth-form" onsubmit="return false;">
							<div class="group">
								<label for="email" class="form-input-label">Email</label>
								<input id="email" class="form-input" name='email'type='email' required/>	
							</div>
							<div class="group">
								<label for="password" class="form-input-label">Password</label>
								<input id="password" class="form-input" name='password' type='password' required/>	
							</div>
							<a id="singUp" href="/singUp" class="sign-mini-text" data-link>I don't have an account</a>
							<div class="buttons">
								<button id="sign-in" type="submit" class="custom-button">SIGN IN</button>
							</div>
						</form>
					</div>
				</main>
			</div>
		</div>
	</div>
        `;
    }
}