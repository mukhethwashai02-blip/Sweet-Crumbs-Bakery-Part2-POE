
/* Part 3 - Sweet Crumbs Bakery */


// 1. PRODUCT SEARCH

const searchBox = document.getElementById("productSearch");
const productList = document.getElementById("productList");
const searchMessage = document.getElementById("searchMessage");

if (searchBox && productList && searchMessage) {

    const products = productList.querySelectorAll("td");

    searchBox.addEventListener("input", function () {

        const searchText = searchBox.value.toLowerCase().trim();
        let found = 0;

        products.forEach(function (product) {

            const productText = product.textContent.toLowerCase();

            if (productText.includes(searchText)) {
                product.hidden = false;
                product.style.display = "";
                found++;
            } else {
                product.hidden = true;
                product.style.display = "none";
            }

        });

        if (found === 0) {
            searchMessage.textContent = "No products found.";
        } else {
            searchMessage.textContent = "";
        }

    });
}


// 2. GALLERY LIGHTBOX

const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const closeLightbox = document.getElementById("closeLightbox");

if (lightbox && largeImage && closeLightbox) {

    const galleryImages = document.querySelectorAll(".product-layout img");

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {
            largeImage.src = image.src;
            largeImage.alt = image.alt;
            lightbox.style.display = "flex";
        });

    });

    closeLightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });

}


// 3. ENQUIRY FORM VALIDATION

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    const orderDate = document.getElementById("orderDate");
    const orderResponse = document.getElementById("orderResponse");

    // Set today's date as the minimum date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    orderDate.min = year + "-" + month + "-" + day;

    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        const fullname = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const product = document.getElementById("product").value;
        const quantity = Number(document.getElementById("quantity").value);
        const location = document.getElementById("location").value;
        const selectedDate = orderDate.value;

        if (!/^0[0-9]{9}$/.test(phone)) {
            orderResponse.textContent =
                "Please enter a valid 10-digit phone number.";
            orderResponse.style.color = "red";
            return;
        }

        if (selectedDate < orderDate.min) {
            orderResponse.textContent =
                "Please select today or a future date.";
            orderResponse.style.color = "red";
            return;
        }

        // Product prices
        const prices = {
            "Cake": 180,
            "Fresh Bread": 25,
            "Pastries": 20
        };

        let message = "";

        if (product === "Custom Order") {

            message = "Thank you, " + fullname +
                "! Your custom order enquiry for " + quantity +
                " item(s) at " + location +
                " on " + selectedDate +
                " has been checked. Please contact the bakery " +
                "to confirm the price and availability.";

        } else {

            const total = prices[product] * quantity;

            message = "Thank you, " + fullname +
                "! Your enquiry for " + quantity + " " + product +
                " item(s) has been checked. Estimated total: R" +
                total.toFixed(2) +
                ". Collection location: " + location +
                ". Requested date: " + selectedDate +
                ". Please contact the bakery to confirm availability.";
        }

        orderResponse.textContent = message;
        orderResponse.style.color = "#7b1734";
        orderResponse.style.fontWeight = "bold";

    });

    orderForm.addEventListener("reset", function () {
        orderResponse.textContent = "";
    });

}


// 4. CONTACT FORM - EMAILJS

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const contactResponse = document.getElementById("contactResponse");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (name.length < 2 || message.length < 10) {
            contactResponse.textContent =
                "Please enter a valid name and a message of at least 10 characters.";
            contactResponse.style.color = "red";
            return;
        }

        if (typeof emailjs === "undefined") {
            contactResponse.textContent =
                "Email service is unavailable. Please try again later.";
            contactResponse.style.color = "red";
            return;
        }

        const submitButton = contactForm.querySelector('input[type="submit"]');
        submitButton.disabled = true;

        contactResponse.textContent = "Sending your message...";
        contactResponse.style.color = "#7b1734";

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        emailjs.send(
            "service_zacyls4",
            "template_fc8urv3",
            templateParams,
            {
                publicKey: "LJH5N9RhoXdGvHYvS"
            }
        ).then(function () {

            contactResponse.textContent =
                "Your message has been sent successfully! Please check your email for confirmation.";
            contactResponse.style.color = "green";

            contactForm.reset();

        }).catch(function (error) {

            console.error("EmailJS error:", error);

            contactResponse.textContent =
                "Sorry, your message could not be sent. Please try again.";
            contactResponse.style.color = "red";

        }).finally(function () {
            submitButton.disabled = false;
        });

    });

    contactForm.addEventListener("reset", function () {
        contactResponse.textContent = "";
    });

}
