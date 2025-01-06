let password = [];
let firstName = '', uniId = '', character = '';

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    startTheProgram();
});

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key == 'Enter') {
        startTheProgram();
    }
})

function startTheProgram() {
    firstName = document.querySelector('#name-inp').value || '';
    uniId = document.querySelector('#uniId-inp').value || '';
    character = document.querySelector('input[name="char"]:checked').value || '';

    if (isNameValid(firstName) && isIdValid(uniId) && character) {
        generatePassword(firstName, uniId, character);
        displayPassword();
    }
}

function isAlpha(char) {
    return /^[A-Za-z]$/.test(char);
}

function isNameValid(firstName) {
    let length = firstName.length;
    if (length > 20) {
        document.querySelector('.name-msg').innerHTML = `
            <p>must be less than 20 characters</p>
        `
        setTimeout(() => {
            document.querySelector('.name-msg').innerHTML = '';
        }, 3000)
        return 0;
    }

    for (let i = 0; i < length; i++) {
        if (!isAlpha(firstName[i])) {
            document.querySelector('.name-msg').innerHTML = `
            <p>only characters A-Z or a-z</p>
        `
            setTimeout(() => {
                document.querySelector('.name-msg').innerHTML = '';
            }, 3000)

            return 0;
        }
    }
    return 1;
}

function isIdValid(uniId) {
    let length = uniId.length;
    if (length != 7) {
        document.querySelector('.uniId-msg').innerHTML = `<p>must be 7 digits</p>`
        setTimeout(() => {
            document.querySelector('.uniId-msg').innerHTML = '';
        }, 3000)
        return 0;
    }

    for (let i = 0; i < length; i++) {
        if (isAlpha(uniId[i])) {
            document.querySelector('.uniId-msg').innerHTML = `<p>only digits 0 - 9</p>`
            setTimeout(() => {
                document.querySelector('.uniId-msg').innerHTML = '';
            }, 3000)
            return 0;
        }
    }

    return 1;
}

function generatePassword(firstName, uniId, character) {
    password.length = 0;

    password.push(firstName[0].toUpperCase());
    password.push(firstName[1].toLowerCase());

    for (let i = 3; i <= 6; i++) {
        password.push(uniId[i]);
    }

    password.push(character);
    let randomNum = Math.floor(Math.random() * 10);
    password.push(randomNum);
}

function displayPassword() {

    document.querySelector('.js-text').innerHTML = `
        <div class="js-title">Generated Password</div>
        <div class="js-pass">${password.join('')}</div>
        <button class="btn btn-exit">Exit</button>
    `
    document.querySelector('.main-div').classList.add('hide');

    document.querySelector('.btn-exit').addEventListener('click', () => {
        console.log("clicked");
        reset();
    })
}

function reset() {
    document.querySelector('.js-text').innerHTML = '';
    document.querySelector('.main-div').classList.remove('hide');

    document.querySelector('#name-inp').value = '';
    document.querySelector('#uniId-inp').value = '';
}

