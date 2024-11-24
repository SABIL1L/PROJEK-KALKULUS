/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)


/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '30px',
    duration: 1800,
    reset: true,
});

sr.reveal(`.home__data, .home__img, 
           .decoration__data,
           .accessory__content,
           .footer__content`, {
    origin: 'top',
    interval: 200,
})

sr.reveal(`.share__img, .send__content`, {
    origin: 'left'
})

sr.reveal(`.share__data, .send__img`, {
    origin: 'right'
})

/*==================== KALKULATOR INTEGRAL TAK TENTU ====================*/
function calculateIntegral() {
    const input = document.getElementById('functionInput').value.trim();
    const terms = input.split('+').map(term => term.trim());
    let result = "";

    try {
        terms.forEach(term => {
            const regex = /^(\d*)x\^(\d+)$/; // Format ax^n
            const constantRegex = /^\d+$/; // Format untuk konstanta

            if (regex.test(term)) {
                const match = term.match(regex);
                const a = match[1] === "" ? 1 : parseInt(match[1]);
                const n = parseInt(match[2]);
                const newCoefficient = a / (n + 1);
                const newPower = n + 1;
                result += `${newCoefficient}x^${newPower} + `;
            } else if (constantRegex.test(term)) {
                const constant = parseInt(term);
                result += `${constant}x + `;
            } else {
                throw new Error("Format tidak valid");
            }
        });

        result += "C";
        document.getElementById('result').innerHTML = `Hasil: ∫(${input}) dx = ${result}`;
    } catch (error) {
        document.getElementById('result').innerHTML = "Error: Masukkan fungsi dalam format yang valid.";
    }
}

/*==================== KALKULATOR INTEGRAL TAK TENTU ====================*/
function parseTerm(term) {
    term = term.trim(); // Menghapus spasi ekstra
    const match = term.match(/^([+-]?\d*\.?\d*)x(?:\^(\d+))?$/);
    if (match) {
        const coefficient = match[1] === "-" ? -1 : match[1] === "+" || match[1] === "" ? 1 : parseFloat(match[1]);
        const power = match[2] ? parseInt(match[2]) : 1;
        return { coefficient, power };
    }
    if (/^[+-]?\d+(\.\d+)?$/.test(term)) {
        return { coefficient: parseFloat(term), power: 0 }; // Jika hanya konstanta
    }
    throw new Error("Format input tidak valid: " + term);
}

function integrateTerm({ coefficient, power }) {
    const newPower = power + 1;
    const newCoefficient = coefficient / newPower;
    return `${newCoefficient.toFixed(2)}x^${newPower}`;
}

function calculateIntegral() {
    const input = document.getElementById("functionInput").value.trim();
    try {
        // Membersihkan spasi ekstra di sekitar operator
        const cleanInput = input.replace(/\s+/g, ""); // Menghapus semua spasi
        // Memecah input menjadi suku-suku berdasarkan operator + dan -
        const terms = cleanInput.split(/(?=[+-])/).map(term => term.trim());
        const parsedTerms = terms.map(parseTerm);

        // Proses hasil integral
        let result = "";
        parsedTerms.forEach((term, index) => {
            const { coefficient, power } = term;
            const integralTerm = integrateTerm({ coefficient, power });

            // Operator di depan suku
            if (index > 0) {
                result += (coefficient < 0 ? " - " : " + ");
            } else if (coefficient < 0) {
                result += "-";
            }

            // Tambahkan suku integral
            result += integralTerm.replace(/^\-/, ""); // Hapus `-` ganda jika ada
        });

        result += " + C";

        // Menampilkan hasil
        document.getElementById("result").textContent = `∫ ${input} dx = ${result}`;
    } catch (error) {
        document.getElementById("result").textContent = "Error: " + error.message;
    }
}
/*==================== KALKULATOR INTEGRAL TENTU ====================*/
function calculateDefiniteIntegral() {
    const input = document.getElementById('functionInputCertain').value.trim();
    const lowerBound = parseFloat(document.getElementById('lowerBound').value);
    const upperBound = parseFloat(document.getElementById('upperBound').value);

    if (isNaN(lowerBound) || isNaN(upperBound)) {
        document.getElementById('resultCertain').innerHTML = "Error: Masukkan batas atas dan bawah yang valid.";
        return;
    }

    // Menghapus spasi ekstra dan mengganti tanda minus jika perlu
    let cleanInput = input.replace(/\s+/g, ''); // Hapus semua spasi
    cleanInput = cleanInput.replace(/([-+]?)\(/g, '$1 ('); // Menjaga tanda + atau - tetap ada sebelum tanda kurung

    // Memisahkan input menjadi suku-suku berdasarkan operator + atau -
    const terms = cleanInput.split(/(?=[+-])/).map(term => term.trim());
    let integralFunction = "";

    try {
        terms.forEach((term, index) => {
            const regex = /^([+-]?\d*)x\^(\d+)$/; // Format ax^n
            const constantRegex = /^[+-]?\d+$/; // Format untuk konstanta

            if (regex.test(term)) {
                const match = term.match(regex);
                const a = match[1] === "" || match[1] === "+" ? 1 : (match[1] === "-" ? -1 : parseInt(match[1]));
                const n = parseInt(match[2]);
                const newCoefficient = a / (n + 1);
                const newPower = n + 1;
                integralFunction += `${newCoefficient} * Math.pow(x, ${newPower})`;

                if (index < terms.length - 1) {
                    integralFunction += " + "; // Menambahkan spasi + untuk suku berikutnya
                }
            } else if (constantRegex.test(term)) {
                const constant = parseInt(term);
                integralFunction += `${constant} * x`;

                if (index < terms.length - 1) {
                    integralFunction += " + "; // Menambahkan spasi + untuk suku berikutnya
                }
            } else {
                throw new Error("Format tidak valid");
            }
        });

        // Hapus spasi + di akhir jika ada
        integralFunction = integralFunction.replace(/\s\+$/, "");

        // Buat fungsi evaluasi integral
        const evaluate = new Function("x", `return ${integralFunction};`);

        // Hitung integral tentu
        const upperValue = evaluate(upperBound);
        const lowerValue = evaluate(lowerBound);
        const result = upperValue - lowerValue;

        document.getElementById('resultCertain').innerHTML = `Hasil: ∫(${input}) dx dari ${lowerBound} ke ${upperBound} = ${result}`;
    } catch (error) {
        document.getElementById('resultCertain').innerHTML = "Error: Masukkan fungsi dalam format yang valid.";
    }
}
