// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length'); 
const upperCaseEl = document.getElementById('uppercase'); 
const lowerCaseEl = document.getElementById('lowercase'); 
const numbersEl = document.getElementById('numbers'); 
const symbolsEl = document.getElementById('symbols'); 
const generateEl = document.getElementById('generate'); 
const clipboardEl = document.getElementById('clipboard');

// key value pair for random functions
const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber, 
    symbol: getRandomSymbol
};


// Generate event listen

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; //+ converts string type to number
    const hasUpper = upperCaseEl.checked;
    const hasLower = lowerCaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol,
        length
    );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Copied to clipboard');
})


// Generate password function
function generatePassword(upper, lower, number, symbol, length) {
    let generatedpassword = '';
    const typesCount = upper + lower + number + symbol
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter
    (
      item => Object.values(item)[0]
    )

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedpassword += randomFunc[funcName]();
        });    
    }
    const finalPassword = generatedpassword.slice(0, length);

    return finalPassword;
}


// Generator functions
// For char codes refer - http://www.net-comber.com/charset.html

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 97 = a
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65); // 65 = A
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 48 = 0
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length )]; 
}