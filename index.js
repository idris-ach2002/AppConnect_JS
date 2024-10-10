const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

const form = document.querySelector('form');
let pseudo, mail, password, confirmPass, flag = [];

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");
    if(!valid) {
        container.classList.add('error');
        span.textContent = message;
    }else {
        container.classList.remove('error');
        span.textContent = message;
    }
}

const pseudoChecker = (value) => {
    pseudo = null;
    if(value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay('pseudo', 'Le pseudo doit faire entre 3 et 20 caractères');
    }else if(!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('pseudo', 'Le pseudo ne doit pas contenir de caractères spéciaux');
    }else {
        errorDisplay('pseudo', '', true);
        pseudo = value;
    }
};

const emailChecker = (value) => {
    mail = null;
    if(!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay('email', 'Le mail n\'est pas valide');
    }else {
        errorDisplay('email', '', true);
        mail = value;
    }
};

const animText = (label) => {
    const lab = document.querySelector('label[for="' + label + '"]');
    lab.classList.add('enter');
}

const resetText =  (label) => {
    const lab = document.querySelector('label[for="' + label + '"]');
    lab.classList= "";
}

const passwordChecker = (value) => {
    password = null;
    /*progressBar.classList.remove('progressBlue');
    progressBar.classList.remove('progressRed');
    progressBar.classList.remove('progressGreen');*/

    progressBar.classList = "";
    
    if(!value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
        errorDisplay('password', 'Minimum 8 caractères, une Majuscule, une miniscule, un chiffre et un caractère spécial');
        progressBar.classList.add('progressRed');
    }else if(value.length < 12) {
        progressBar.classList.add('progressBlue');
        errorDisplay('password', '', true);
        password = value;
    }else {
        progressBar.classList.add('progressGreen');
        errorDisplay('password', '', true);
        password = value;
    }
   if(confirmPass) 
    confirmChecker(flag[0]);
};

const confirmChecker = (value) => {
    if(password != null && value !== password) {
        errorDisplay('confirm', 'les mots de passe ne coresspondent pas');
    }else {
        clear(flag);
        flag.push(value);
        errorDisplay('confirm', '', true);
        confirmPass = true;
    }
};


const clear = (tab) => {
    while ((i = tab.shift()) !== undefined);
}

inputs.forEach((inp) => {
    inp.addEventListener("input" , (e) => {
        switch(e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;

            case "email":
                emailChecker(e.target.value);
                break;

            case "password":
                passwordChecker(e.target.value);
                break;

            case "confirm":
                confirmChecker(e.target.value);
                break;
            default:
                null;
        }
    })
});


//en java script si en test sur une var si y'a quel que chose
//dedans c'est true si elle est vide donc false default

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(pseudo && mail && password && confirmPass) {
        const data = {
            pseudo: pseudo,
            email: mail,
            password: password
        };
        console.log(data);
        //vider tous après la soumission du form
        pseudo = mail = password = confirmPass  = null;

        inputs.forEach((input) => {
            input.value = "";
        });


        progressBar.classList = "";

        confirm('inscription validé');

    }else {
        window.confirm('Veuillez remplir correctement les champs');
    }
});


inputs.forEach((inp) => {
    inp.addEventListener("mouseenter" , (e) => {
        animText(e.target.id);    
    })
});

inputs.forEach((inp) => {
    inp.addEventListener("mouseout" , (e) => {
        resetText(e.target.id);    
    })
});


