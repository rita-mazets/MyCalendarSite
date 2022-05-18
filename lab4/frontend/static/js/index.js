import About from "./views/About.js";
import MyCalendar from "./views/MyCalendar.js";
import Stars from "./views/Stars.js";
import SignIn from "./views/SignIn.js";
import SignUp from "./views/SignUp.js";

import {changeSign} from "./elements.js"
import {auth} from "./firebase.js"


window.addEventListener('load', () =>{
  const user = auth.currentUser
  if(user === null)
  {
    document.getElementById('mycalendar').classList.add('disabled')
    localStorage.clear()
  }
  if(auth.currentUser !== null)
  {
      changeSign('singIn', 'Sign Out', "signOut", '/singIn')
  }
})

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: About },
        { path: "/myCalendar", view: MyCalendar },
        { path: "/stars", view: Stars },
        { path: "/singIn", view: SignIn },
        { path: "/singUp", view: SignUp }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.addHandlers()    
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});