// ---------Login Create Variables----------

const userLoginEmail = document.getElementById("loginEmail");
// console.log(loginEmail);
const userLoginPassword = document.getElementById("loginPassword");
// console.log(loginPassword);
const userLoginBtn = document.querySelector(".loginBtn");
// console.log(loginBtn);


// ---------Signup Create Variables----------

const userFirstName = document.querySelector("#userFirstName");
// console.log(userFirstName);
const userSurName = document.querySelector("#userSurName");
// console.log(userSurName);
const userSignUpEmail = document.querySelector("#userSignUpEmail");
// console.log(userSignUpEmail);
const userSignUpMob = document.querySelector("#userSignUpMob");
// console.log(userSignUpMob);
const userSignUpPassword = document.querySelector("#userSignUpPassword");
// console.log(userSignUpPassword);
const userShowPassword = document.querySelector(".showPassword");
// console.log(userShowPassword);
const userProfileImg = document.querySelector("#file");
// console.log(userProfileImg);
const signUpBtn = document.querySelector("#signUpBtn");
// console.log(signUpBtn);
const signUpDateBtn = document.querySelector("#dropdownDateBtn");
// console.log(signUpDateBtn);
const signUpMonthBtn = document.querySelector("#dropdownMonthBtn");
// console.log(signUpMonthBtn);
const signUpYearBtn = document.querySelector("#dropdownYearBtn");
// console.log(signUpYearBtn);
let signUpDate;
let signUpMonth;
let signUpYear;
let signUpGender;


// ---------Date\Month\Year Function----------

function getDateHandler(date) {
    // console.log("date worked", date)
    signUpDate = date
    signUpDateBtn.innerHTML = date

}
function getMonthHandler(month) {
    // console.log("month worked", month)
    signUpMonth = month
    signUpMonthBtn.innerHTML = month
}
function getYearHandler(year) {
    // console.log("year worked", year)
    signUpYear = year
    signUpYearBtn.innerHTML = year
}

function getGenderHandler(gender) {
    // console.log("gender worked", gender)
    signUpGender = gender
}

function showPassword() {
    // console.log(userSignUpPassword.value);
    // console.log(userLoginPassword.value);

    if (userSignUpPassword.type === "password" || userLoginPassword.type === "password") {
        userSignUpPassword.type = "text"
        userLoginPassword.type = "text"

    } else {
        userSignUpPassword.type = "password"
        userLoginPassword.type = "password"
    }

}

// ---------ourUsers Local Storage----------

const ourUsers = JSON.parse(localStorage.getItem('users')) || [];

console.log(ourUsers);


// ---------Signup Function----------

function signUpHandler() {
    // console.log(userSignUpEmail.value)

    if (userFirstName.value !== "" && userSurName.value !== "" && userSignUpEmail.value !== "" && userSignUpMob.value !== "" && userSignUpPassword.value !== "" && userProfileImg.value !== "" && signUpDate !== undefined && signUpMonth !== undefined && signUpYear !== undefined && signUpGender !== undefined) {
        if (userSignUpPassword.value.length < 8) {
            return Swal.fire({
                icon: 'warning',
                title: 'Password should be contain 8 characters'
            })
        }

        const usersObject = {
            userFirstName: userFirstName.value,
            userSurName: userSurName.value,
            userEmail: userSignUpEmail.value,
            userMobileNum: userSignUpMob.value,
            userPassword: userSignUpPassword.value,
            userProfilePic: userProfileImg.value,
            userDate: new Date(`${signUpYear}-${signUpMonth}-${signUpDate}`),
            gender: signUpGender
        }

        // console.log(usersObject);


        ourUsers.push(usersObject)

        // console.log(ourUsers);

        localStorage.setItem('users', JSON.stringify(ourUsers))

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Signup Successful',
            showConfirmButton: false,
            timer: 2500
        })

        userFirstName.value = ""
        userSurName.value = ""
        userSignUpEmail.value = ""
        userSignUpMob.value = ""
        userSignUpPassword.value = ""
        userProfileImg.value = ""
        signUpDateBtn.innerHTML = "Date"
        signUpMonthBtn.innerHTML = "Month"
        signUpYearBtn.innerHTML = "Year"



        const modal = document.querySelector('#staticBackdrop').classList.remove('show');
        const overlay = document.querySelector('body').classList.remove('modal-open');
        const mdbackdrop = document.querySelector('.modal-backdrop');
        if (mdbackdrop) {
            mdbackdrop.classList.remove('modal-backdrop', 'show');
        }


    } else {
        Swal.fire({
            icon: 'error',
            title: 'Shabash Bacha Saari Feilds Fill Karo'
        })
    }
}



// ---------Login Function----------

function loginHandler() {
    // console.log(userLoginEmail.value)
    // console.log(userLoginPassword.value)

    if (!userLoginEmail.value || !userLoginPassword.value) {
        return Swal.fire({
            icon: 'error',
            title: 'Shabash Bacha Email or password dono likho'
        })
    }

    const userFound = ourUsers.filter((user) => {
        // console.log(user.userEmail);

        return user.userEmail === userLoginEmail.value
    })

    // console.log(userFound);

    if (!userFound.length) {
        return Swal.fire({
            icon: 'error',
            title: 'This user is not registered, kindly create an account first'
        })
    }

    // console.log(userLoginPassword.value)
    // console.log(userFound[0].password)

    if (userFound[0].userPassword == userLoginPassword.value) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${userFound[0].userFirstName} ${userFound[0].userSurName} Logged In Successful`,
            showConfirmButton: false,
            timer: 2500
        })

        localStorage.setItem('isLoggedInUser', JSON.stringify(userFound[0]))

        setTimeout('window.location.href="./Dashboard/index.html"', 2600)



    } else {
        Swal.fire({
            icon: 'error',
            title: 'Password is incorrect'
        })
    }
}



// ---------Forget Password Function----------

function ForgetPassword() {
    // console.log("FORGET PASSWORD");

    (async () => {

        const { value: email } = await Swal.fire({
            title: 'Input email address',
            input: 'email',
            inputLabel: 'Your email address',
            inputPlaceholder: 'Enter your email address'
        })

        if (email) {
            Swal.fire(`Entered email: ${email}
             Password has been sent to your email address`)
        }

    })()
}

// ---------Signup addEventListener----------

signUpBtn.addEventListener('click', signUpHandler);
userLoginBtn.addEventListener('click', loginHandler);
