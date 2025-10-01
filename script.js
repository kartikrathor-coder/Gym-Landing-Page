console.log("JS Loaded");

/*Navbar Functionality*/
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('#hamburger-menu');
//Adding click event//
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    console.log("Hamburger clicked");
});

/*Contact Form Submission*/
const contactForm = document.getElementById("contact-form");
let formMessage = document.getElementById("form-msg");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent page reload
        console.log("Form Submitted");

        // Getting Values from User //
        let userName = document.getElementById("user-name").value.trim();
        let userEmail = document.getElementById("user-email").value.trim();
        let phone = document.getElementById("user-number").value.trim();
        let message = document.getElementById("user-message").value.trim();

        let msgDiv = document.getElementById("form-msg");

        console.log("Name:", userName);
        console.log("Email:", userEmail);
        console.log("Phone:", phone);
        console.log("Message:", message);

        // Validation //
        if (userName === "" || userEmail === "" || phone === "" || message === "") {
            msgDiv.style.color = "red";
            msgDiv.textContent = "Please fill all the Details."
        } else {
            msgDiv.style.color = "green";
            msgDiv.textContent = "Message sent successfully.";
            console.log("Form Submitted");
        }

        // Name Validation //
        if (userName.length < 3) {
            formMessage.innerHTML = "⚠️ Name must be at least 3 characters long.";
            formMessage.style.color = "red";
            return;
        }

        // Email Validation //
       let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log("Email:", userEmail);
        if (!userEmail.match(emailPattern)) {
            formMessage.innerHTML = "⚠️ Enter a valid email address.";
            formMessage.style.color = "red";
            return;
        }

        // Phone Number Validation //
        if (!/^\d{10}$/.test(phone)) {
            formMessage.innerHTML = "⚠️ Enter a valid 10-digit number.";
            formMessage.style.color = "red";
            return;
        }

        // Saving Values in LocalStorage //
        let contactData = {
            name: userName,
            email: userEmail,
            number: phone,
            message: message,
            date: new Date().toLocaleString()
        };

        console.log(contactData);

        let savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        savedContacts.push(contactData);
        localStorage.setItem("contacts", JSON.stringify(savedContacts));

        // Success Message //
        formMessage.innerHTML = "✅ Thank you! Your message has been saved.";
        formMessage.style.color = "green";

        // Reset Form //
        contactForm.reset();
    });
}
