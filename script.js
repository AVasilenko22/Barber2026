// Форма онлайн-записи.
// Дані нікуди не відправляються: після успішної перевірки показуємо
// повідомлення і очищаємо поля. Щоб підключити реальну відправку,
// замініть тіло обробника на fetch() до вашого сервісу.
const form = document.querySelector(".booking-form");
const status = document.querySelector(".booking-status");
let hideTimer;

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    status.textContent = `Дякуємо, ${name}! Ми зв'яжемося з вами найближчим часом.`;
    status.hidden = false;
    form.reset();

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      status.hidden = true;
    }, 8000);
  });
}

// Мобільне меню (виїжджає справа на екранах до 767px).
// Закривається по хрестику, кліку на посилання, по темному фону та клавішею Esc.
const menu = document.querySelector("#menu");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const mobileQuery = window.matchMedia("(max-width: 767px)");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

if (menu && menuToggle && menuClose) {
  menuToggle.addEventListener("click", () => {
    setMenu(true);
    menuClose.focus();
  });

  menuClose.addEventListener("click", () => {
    setMenu(false);
    menuToggle.focus();
  });

  // клік по посиланню всередині меню (якорі, телефон, кнопка запису)
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  // клік по затемненню (воно є псевдоелементом body)
  document.addEventListener("click", (event) => {
    if (event.target === document.body) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // якщо вікно розширили до планшета/десктопа, меню закриваємо
  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenu(false);
    }
  });
}
