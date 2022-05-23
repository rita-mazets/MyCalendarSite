export async function changeSign(deleteId, textContent, newId, href) {
  let sign = document.getElementById("header_signin");
  let singIn = document.getElementById(deleteId);
  sign.removeChild(singIn);
  let signOutA = document.createElement("a");
  signOutA.classList.add("nav_link");
  signOutA.classList.add("active");
  signOutA.textContent = textContent;
  signOutA.id = newId;
  signOutA.href = href;
  sign.insertAdjacentElement("afterbegin", signOutA);
}
