import AbstractView from "./AbstractView.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import { User } from "../User.js";
import { setUser } from "../fdatabase.js";
import { navigateTo } from "../index.js";
import { auth } from "../firebase.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Sing Up");
    this.changeActiveLink("singIn");
  }

  async addHandlers() {
    document.getElementById("sing-up").addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;

      const firstname = document.getElementById("name").value;
      const day = document.getElementById("sdate-day").value;
      const month = document.getElementById("sdate-month").value;
      const year = document.getElementById("sdate-year").value;

      if (confirm !== password) {
        alert("Confirm password is not equal password!");
        return;
      }

      if (firstname == null || !firstname.length) {
        alert("Name can't be empty!");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password).then(() => {
        console.log(year);
        const user = auth.currentUser;
        const localUser = new User();
        localUser.email = email;
        localUser.id = user.uid;
        localUser.name = firstname;
        localUser.year = year;
        localUser.month = month;
        localUser.day = day;
        localStorage.setItem("User", JSON.stringify(localUser));

        setUser(localUser).catch((error) => {
          console.log("Sign Up:", error.message);
        });
        navigateTo("/myCalendar");
      });
    });
  }

  async getHtml() {
    let innerDay = ``;
    for (var i = 1; i < 32; i++) {
      innerDay += `<option value="${i}">${i}</option>`;
    }

    let now = new Date();
    let nowYear = now.getFullYear();
    let innerYear = ``;
    for (let i = nowYear; i > 1940; i--) {
      innerYear += `<option value="${i}">${i}</option>`;
    }

    return `
        <div class="intro">
		<div class="container">
			<div class="intro_inner marg">
				<main>
					<div class="sign_in">
						<span>Sign up with your email and password</span>
						<form>
							<div class="group">
								<label for="name" class="form-input-label">Name</label>
								<input id="name" class="form-input" name='name' type='text' required/>	
							</div>
							<div class="group">
								<label for="email" class="form-input-label">Email</label>
								<input id="email" class="form-input" name='email'type='email' required/>	
							</div>
							<div class="group">
								<label for="password" class="form-input-label">Password</label>
								<input id="password" class="form-input" name='password' type='password' required/>	
							</div>
                            <div class="group">
								<label for="confirm" class="form-input-label">Confirm Password</label>
								<input id="confirm" class="form-input" name='password' type='password' required/>	
							</div>
                            <div class="group">
								<label for="date" class="form-input-label">Date of birthday:</label>
								<div id="date" class="form-block-select w30">
									<select id="sdate-day" class="form-select">
										<option value="0" id="day" disabled>Day</option>
										${innerDay}
									</select>
                                </div>
                                <div class="form-block-select w40">
									<select id="sdate-month" class="form-select">
										<option value="0" id="month" disabled>Month</option>
										<option value="1">January</option>
										<option value="2">February </option>
										<option value="3">March </option>
										<option value="4">April </option>
										<option value="5">May </option>
										<option value="6">June </option>
										<option value="7">July</option>
										<option value="8">August </option>
										<option value="9">September </option>
										<option value="10">October </option>
										<option value="11">November </option>
										<option value="12">December </option>
									</select>
                                </div>
                                <div  class="form-block-select w30">
									<select id="sdate-year" class="form-select" >
										<option value="0" id="year" disabled>Year</option>
										${innerYear}
									</select>
                                </div>
							</div>
                            <div class="buttons mt5">
								<button id="sing-up"  type="submit" class="custom-button">SIGN UP</button>
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
