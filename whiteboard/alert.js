export const setAlert = (title, content) => {
  document.getElementById("alerttitle").innerText = title;
  document.getElementById("alertcontent").innerText = content;
  document.getElementById("alertbox").style.display = null;
};

export const hideAlert = () => {
  document.getElementById("alertbox").style.display = "none";
}
