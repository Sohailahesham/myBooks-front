const currentPath = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".header__nav a");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});
