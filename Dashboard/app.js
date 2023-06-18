const isLoggedInUser = JSON.parse(localStorage.getItem("isLoggedInUser"))


if (!isLoggedInUser) {
    window.location.href = "../index.html";
}

const userPosts = JSON.parse(localStorage.getItem('posts')) || []


const userName = document.querySelector('#userName');
// console.log(userName);
const userEmailAddress = document.querySelector('#userEmailAddress');
// console.log(userEmailAddress);
const userDescription = document.querySelector('#userDescription');
// console.log(userDescription);


const userFullName = `${isLoggedInUser.userFirstName} ${isLoggedInUser.userSurName}`;

userName.innerText = userFullName;
userEmailAddress.innerText = isLoggedInUser.userEmail;
userDescription.innerText = isLoggedInUser.description || `HTML | CSS | Bootstrap | JavaScript`
















function logoutHandler() {
    localStorage.removeItem('isLoggedInUser')
    window.location.href="../index.html"
}