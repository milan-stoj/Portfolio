import {
  wait,
  updateDateTime,
  textLinesToArray,
  waitForLandscapeMode,
  isPhoneInPortraitMode,
  waitForPortraitMode,
} from "./components/utils.js";
import {
  typeToStdout,
  clear,
  printToStdout,
  displayLoadingBar,
  maximize,
  minimize,
  renderHtmlToTerminal,
} from "./components/terminal.js";
import { setRandomGradient } from "./components/colors.js";
import { hasVisited } from "./components/client.js";

async function loadTextElements() {
  const [
    initialMessages,
    entryPoint,
    pbsSplash,
    pbsLoading
  ] = await Promise.all([
    textLinesToArray("text-elements/hello-world.txt"),
    textLinesToArray("text-elements/entrypoint.txt"),
    textLinesToArray("text-elements/pbs/splash.txt"),
    textLinesToArray("text-elements/pbs/loading.txt"),
  ]);
  return {
    initialMessages,
    entryPoint,
    pbsSplash,
    pbsLoading,
  };
}

async function mainProcessFlow(textElements) {
  await maximize();
  await typeToStdout(textElements.initialMessages, 800);
  await typeToStdout(textElements.entryPoint, 50, 150);
  await clear();
  await printToStdout(textElements.pbsSplash, 10, 50);
  await printToStdout(textElements.pbsLoading, 500, 2000);
  await displayLoadingBar();
  await clear();
}

document.addEventListener("DOMContentLoaded", async function () {

  setRandomGradient();

  const textElements = await loadTextElements();

  if (hasVisited) {
    maximize();
  } else {
    await mainProcessFlow(textElements);
    localStorage.setItem("hasVisited", true);
  }

  await renderHtmlToTerminal("./partials/portfolio.html");

  // handle nav scroll changes.
  const terminalBody = document.querySelector(".terminal-body");
  const aboutPosition = document.getElementById("about").offsetTop - 80;
  const skillsPosition = document.getElementById("skills").offsetTop - 80;
  const experiencePosition = document.getElementById("experience").offsetTop - 80;
  const contactPosition = document.getElementById("contact").offsetTop - 80;

  console.log("About Position:", aboutPosition);
  console.log("Skills Position:", skillsPosition);
  console.log("Experience Position:", experiencePosition);
  console.log("Contact Position:", contactPosition);
  
  // handle active nav as page is scrolled.
  terminalBody.addEventListener("scroll", function () {
    console.log("Current scrollTop:", terminalBody.scrollTop); // Log the current scroll position
    if (terminalBody.scrollTop >= aboutPosition && terminalBody.scrollTop < skillsPosition) {
        document.getElementById("about-nav").classList.add("active");
        document.getElementById("skills-nav").classList.remove("active");
        document.getElementById("experience-nav").classList.remove("active");
        document.getElementById("contact-nav").classList.remove("active");
      } else if (terminalBody.scrollTop >= skillsPosition && terminalBody.scrollTop < experiencePosition) {
        document.getElementById("about-nav").classList.remove("active");
        document.getElementById("skills-nav").classList.add("active");
        document.getElementById("experience-nav").classList.remove("active");
        document.getElementById("contact-nav").classList.remove("active");
      } else if (terminalBody.scrollTop >= experiencePosition && terminalBody.scrollTop < contactPosition) {
        document.getElementById("about-nav").classList.remove("active");
        document.getElementById("skills-nav").classList.remove("active");
        document.getElementById("experience-nav").classList.add("active");
        document.getElementById("contact-nav").classList.remove("active");
      } else if (terminalBody.scrollTop >= contactPosition) {
        document.getElementById("about-nav").classList.remove("active");
        document.getElementById("skills-nav").classList.remove("active");
        document.getElementById("experience-nav").classList.remove("active");
        document.getElementById("contact-nav").classList.add("active");
      } else {
        document.getElementById("about-nav").classList.remove("active");
        document.getElementById("skills-nav").classList.remove("active");
        document.getElementById("experience-nav").classList.remove("active");
        document.getElementById("contact-nav").classList.remove("active");
      }
  });

  // set profile pre tag to profile text
});
