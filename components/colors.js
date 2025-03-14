import { getRandomColor } from './utils.js';

export function setRandomGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

document.addEventListener("DOMContentLoaded", function () {
    const colorFlags = document.querySelectorAll(".color-flag");

    colorFlags.forEach(flag => {
        flag.addEventListener("click", function () {
            // Remove the active class from all flags
            colorFlags.forEach(f => f.classList.remove("active"));
            // Add the active class to the clicked flag
            flag.classList.add("active");

            const theme = flag.classList.contains("red") ? "red" :
                          flag.classList.contains("green") ? "green" :
                          flag.classList.contains("blue") ? "blue" : "default";
            applyTheme(theme);
        });

     // Set a random active color on page refresh
    const randomFlag = colorFlags[Math.floor(Math.random() * colorFlags.length)];
    randomFlag.click();   });

    function applyTheme(theme) {
        let primaryColor, secondaryColor, hoverColor, glowColor;

        switch (theme) {
            case "red":
                primaryColor = "#FF6347"; // Tomato
                secondaryColor = "#1e1e1e";
                hoverColor = "#FF4500"; // Orange Red
                glowColor = "rgba(255, 99, 71, 0.5)"; // Tomato with alpha
                break;
            case "green":
                primaryColor = "#32CD32"; // Lime Green
                secondaryColor = "#1e1e1e";
                hoverColor = "#228B22"; // Forest Green
                glowColor = "rgba(50, 205, 50, 0.5)"; // Lime Green with alpha
                break;
            case "blue":
                primaryColor = "cyan"; // Dodger Blue
                secondaryColor = "#1e1e1e";
                hoverColor = "cyan"; // Royal Blue
                glowColor = "rgba(0, 255, 255, 0.5)"; // Cyan with alpha
                break;
            default:
                primaryColor = "cyan";
                secondaryColor = "#1e1e1e";
                hoverColor = "#00ffff";
        }

        document.documentElement.style.setProperty("--primary-color", primaryColor);
        document.documentElement.style.setProperty("--secondary-color", secondaryColor);
        document.documentElement.style.setProperty("--hover-color", hoverColor);
        document.documentElement.style.setProperty("--glow-color", glowColor);
    }
});