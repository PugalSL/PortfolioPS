// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
};

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    

    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);

    // Close Navbar on Scroll
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
};

// Scroll Reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skill-container, .project-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ********************** Email send *******************

let fullname = document.getElementById('fname');
let email = document.getElementById('Email_Address');
let mobile = document.getElementById('mobilenumber');
let subject = document.getElementById('subject');
let msg = document.getElementById('message');

function sendMail() {
    // Fetch and trim values inside the function
    let fullnameVal = fullname.value.trim();
    let emailVal = email.value.trim();
    let mobileVal = mobile.value.trim();
    let subjectVal = subject.value.trim();
    let msgVal = msg.value.trim();

    if (!fullnameVal) {
        showError("Full Name is required!");
        return;
    }
    if (!validateEmail(emailVal)) {
        showError("Please enter a valid Email Address!");
        return;
    }
    if (!validateMobile(mobileVal)) {
        showError("Please enter a valid Mobile Number!");
        return;
    }
    if (!subjectVal) {
        showError("Subject is required!");
        return;
    }
    if (!msgVal) {
        showError("Message is required!");
        return;
    }

    let params = {
        from_name: fullnameVal,
        email_id: emailVal,
        mobile_number: mobileVal,
        email_subject: subjectVal,
        message: msgVal
    }

    // Send the email using EmailJS
    emailjs.send("service_ja19vaz", "template_o2vybri", params)
        .then(() => {
            showSuccess(successMsg);
            setContactDetails();
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            showError("Failed to send email. Please try again.");
        });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

function setContactDetails() {
    fullname.value = "";
    email.value = "";
    mobile.value = "";
    subject.value = "";
    msg.value = "";
}

let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-regular fa-circle-check"></i> Successfully Submitted !!!';

function showSuccess(message) {
    let popup = document.createElement('div');
    popup.classList.add("pop");
    popup.innerHTML = message;
    toastBox.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 4000);
}

function showError(message) {
    let popup = document.createElement('div');
    popup.classList.add("pop","error");
    popup.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${message}`;
    toastBox.appendChild(popup);
    popup.style.animation = "errorAnimation 0.5s linear forwards"; 
    setTimeout(() => {
        popup.remove();
    }, 4000);
}
