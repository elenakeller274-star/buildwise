const burgerButton = document.getElementById("burgerButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");

function openMenu() {
  mobileMenu.classList.add("active");
  mobileMenuOverlay.classList.add("active");
  burgerButton.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  burgerButton.classList.remove("active");
  document.body.style.overflow = "";
}

burgerButton.addEventListener("click", () => {
  if (mobileMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileMenuClose.addEventListener("click", closeMenu);
mobileMenuOverlay.addEventListener("click", closeMenu);

// первый слайдер (по 3 за раз)
const swiper = new Swiper(".portfolio-slider", {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    780: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },

  on: {
    slideChange: function () {
      const totalGroups = Math.ceil(
        this.slides.length / this.params.slidesPerGroup,
      );
      const currentGroup =
        Math.floor(this.activeIndex / this.params.slidesPerGroup) + 1;

      document.querySelector(".progress-fraction").textContent =
        `${String(currentGroup).padStart(2, "0")}/${String(totalGroups).padStart(2, "0")}`;

      const progress = (currentGroup / totalGroups) * 100;
      document.querySelector(".progress-fill").style.width = `${progress}%`;
    },

    breakpoint: function () {
      this.emit("slideChange");
    },
  },
});

swiper.emit("slideChange");

// слайдер сертификатов
const certificationsSwiper = new Swiper(".certifications-swiper", {
  slidesPerView: 1.1,
  spaceBetween: 8,
  observer: true,
  observeParents: true,

  breakpoints: {
    580: {
      slidesPerView: 2.1,
      spaceBetween: 16,
    },
    780: {
      slidesPerView: 2.4, // подставь реальное значение из макета
      spaceBetween: 20, // подставь реальное значение из макета
    },
  },
});

// второй слайдер (по 1 за раз)
const swiper2 = new Swiper(".single-slider", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".single-next",
    prevEl: ".single-prev",
  },
  on: {
    slideChange: function () {
      const totalGroups = Math.ceil(
        this.slides.length / this.params.slidesPerGroup,
      );
      const currentGroup =
        Math.floor(this.activeIndex / this.params.slidesPerGroup) + 1;

      document.querySelector(
        ".single-progress .progress-fraction",
      ).textContent =
        `${String(currentGroup).padStart(2, "0")}/${String(totalGroups).padStart(2, "0")}`;

      const progress = (currentGroup / totalGroups) * 100;
      document.querySelector(".single-progress .progress-fill").style.width =
        `${progress}%`;
    },
  },
});

swiper2.emit("slideChange");

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordion = button.closest(".accordion");
    const item = button.parentElement;

    // Закрываем все вопросы, кроме текущего
    accordion.querySelectorAll(".accordion-item").forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    // Переключаем текущий
    item.classList.toggle("active");
  });
});
