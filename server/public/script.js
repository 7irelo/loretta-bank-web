const toggle_btn = document.getElementById("toggle_btn");
const dropdown_menu = document.getElementById("dropdown_menu");

toggle_btn.addEventListener("click", (event) => {
  dropdown_menu.classList.toggle("open")
  const isOpen = dropdown_menu.classList.contains("open")
  toggle_btn.textContent = isOpen ? "⨯" : "≡"
  
});