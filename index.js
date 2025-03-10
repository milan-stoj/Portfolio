import { delay, updateDateTime } from './components/utils.js';
import { typeMessage, clearTerminal, displayAsciiArt, outputToStdout, displayLoadingBar } from './components/terminal.js';
import { setRandomGradient } from './components/gradient.js';

document.addEventListener("DOMContentLoaded", async function() {
    const terminalText = document.getElementById("terminal-text");
    const stdout = document.getElementById("stdout");

    // set initial terminal text
    terminalText.innerHTML = `<span class='prompt'>${updateDateTime()}</span> λ > `;

    const initialMessages = [
        "hello, world!",
        "./entrypoint.sh"
    ];
    const stdoutMessages = [
        "",
        "Initializing...",
        "Loading projects...",
        "Rendering about me...",
        "Setting up contact form...",
        "Loading skills and experience...",
        "Starting portfolio services...",
        "Optimizing images...",
        "Compiling CSS...",
    ];

    // Add the maximize effect to the terminal
    const terminal = document.querySelector('.terminal');
    setTimeout(() => {
        terminal.classList.add('maximize');
    }, 100); // Delay before starting the maximize animation

    setRandomGradient();
    updateDateTime();
    await delay(2000);
    await typeMessage(terminalText, initialMessages);
    await delay(2000);
    await clearTerminal(terminalText, stdout);
    await delay(2000);
    await displayAsciiArt(terminalText);
    await delay(1000);
    await outputToStdout(stdout, stdoutMessages, 150, 450);
    await displayLoadingBar(stdout);
    await clearTerminal(terminalText, stdout);
    await loadPortfolioTextToTerminal(stdout);

    async function loadPortfolioTextToTerminal(stdout) {
        const response = await fetch('/portfolio.txt');
        const text = await response.text();
        const lines = text.split('\n');

        await outputToStdout(stdout, lines, 50,150);
    }
});