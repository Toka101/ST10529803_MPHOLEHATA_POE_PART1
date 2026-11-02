document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  const form = document.getElementById("enquiry-form");

  if (!form) return;

  const fields = {
    fullName: {
      input: document.getElementById("fullName"),
      error: document.getElementById("fullName-error")
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("email-error")
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("phone-error")
    },
    product: {
      input: document.getElementById("product"),
      error: document.getElementById("product-error")
    },
    budget: {
      input: document.getElementById("budget"),
      error: document.getElementById("budget-error")
    }
  };

  const formStatus = document.getElementById("form-status");

  function clearErrors() {
    Object.values(fields).forEach((item) => {
      if (item.error) {
        item.error.textContent = "";
      }
    });

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.style.color = "";
    }
  }

  function validate() {
    clearErrors();

    let valid = true;

    if (!fields.fullName.input || fields.fullName.input.value.trim().length < 2) {
      if (fields.fullName.error) {
        fields.fullName.error.textContent = "Please enter your full name.";
      }
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.input || !emailPattern.test(fields.email.input.value.trim())) {
      if (fields.email.error) {
        fields.email.error.textContent = "Please enter a valid email address.";
      }
      valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!fields.phone.input || !phonePattern.test(fields.phone.input.value.trim())) {
      if (fields.phone.error) {
        fields.phone.error.textContent = "Phone number must contain 10 digits.";
      }
      valid = false;
    }

    if (!fields.product.input || fields.product.input.value === "") {
      if (fields.product.error) {
        fields.product.error.textContent = "Please select a product interest.";
      }
      valid = false;
    }

    if (!fields.budget.input || fields.budget.input.value === "") {
      if (fields.budget.error) {
        fields.budget.error.textContent = "Please select your budget range.";
      }
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validate()) {
      if (formStatus) {
        formStatus.textContent = "Enquiry submitted successfully!";
        formStatus.style.color = "green";
      }
      form.reset();
    } else {
      if (formStatus) {
        formStatus.textContent = "Please correct the errors in the form.";
        formStatus.style.color = "red";
      }
    }
  });

  Object.values(fields).forEach((item) => {
    if (item.input) {
      item.input.addEventListener("input", () => {
        if (item.error && item.error.textContent) {
          validate();
        }
      });

      item.input.addEventListener("change", () => {
        if (item.error && item.error.textContent) {
          validate();
        }
      });
    }
  });
});