const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navbarLinks.forEach((link) => {
  link.addEventListener("click", () => menuOpenButton.click());
});

/* Swiper */
let swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const videos = document.querySelectorAll('video');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, {
  threshold: 0.5
});

videos.forEach(video => {
  observer.observe(video);
});

// Валидация формы
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) { 
  applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('.form-group, .checkbox-label').forEach(el => {
      el.classList.remove('invalid');
    });

    const requiredFields = this.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      const group = field.closest('.form-group') || field.closest('.checkbox-label');
      
      if (!field.value || (field.type === 'checkbox' && !field.checked)) {
        group.classList.add('invalid');
        isValid = false;
      }
    });

    const emailField = this.querySelector('input[type="email"]');
    if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.closest('.form-group').classList.add('invalid');
      isValid = false;
    }

    if (isValid) {
      this.querySelector('.success-msg').style.display = 'flex';
      
      setTimeout(() => {
        this.reset();
        this.querySelector('.success-msg').style.display = 'none';
      }, 3000);
    }
  });
}  

// Маска телефона
const phoneInput = document.getElementById('contactPhone');
if (phoneInput) {  
  phoneInput.addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  });
  
  phoneInput.addEventListener('blur', function() {
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    const group = this.closest('.form-group');
    const errorText = group.querySelector('.error-text');
    
    if (this.value && !phoneRegex.test(this.value)) {
      group.classList.add('invalid');
      if (errorText) {
        errorText.textContent = 'Введите телефон в формате: +7 (XXX) XXX-XX-XX';
        errorText.style.display = 'block';
      }
    } else if (this.hasAttribute('required') && !this.value) {
      group.classList.add('invalid');
      if (errorText) {
        errorText.textContent = 'Поле обязательно для заполнения';
        errorText.style.display = 'block';
      }
    } else {
      group.classList.remove('invalid');
      if (errorText) {
        errorText.style.display = 'none';
      }
    }
  });
}  