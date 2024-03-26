// services/preloader/index.ts
var app = document.getElementById("app");
var preloader = document.getElementById("preloader");
var percent = document.querySelector(".preloader_percent");
var prog = document.getElementById("progress");
var loader = async function(Variable) {
  Variable.$el = {
    app,
    body: document.querySelector("body")
  };
};
var progress = async function({ load, total }) {
  let count = Math.round(load / total * 100);
  if (percent && prog) {
    if (count == 100) {
      percent.classList.add("text_blink");
      percent.textContent = "Connected to Blockchain!";
      setTimeout(() => {
        if (preloader) {
          preloader.style.display = "none";
        }
      }, 50);
    } else {
      prog.style.width = 200 / 100 * count + "px";
      if (count > 80) {
        percent.textContent = "Connected to Blockchain!";
      } else {
        percent.textContent = count + "%";
      }
    }
  }
};
export {
  loader,
  progress
};
