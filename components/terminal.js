import { doStuff, randomDelay, updateDateTime } from './utils.js';


const STDOUT = document.getElementById("stdout");
const TERMINAL = document.querySelector('.terminal');
const TERMINAL_BODY = document.querySelector('.terminal-body');
const PORTFOLIO = document.getElementById('portfolio');


export async function typeToStdout(initialMessages, initialDelay) {
    STDOUT.innerHTML += `<span class='prompt'>${updateDateTime()}</span> λ > `;
    let messageIndex = 0;
    let charIndex = 0;

    await randomDelay(800, 1000);
    while (messageIndex < initialMessages.length) {
        if (charIndex < initialMessages[messageIndex].length) {
            STDOUT.innerHTML += initialMessages[messageIndex].charAt(charIndex);
            charIndex++;
            await randomDelay(50, 150);
        } else {
            charIndex = 0;
            messageIndex++;
            if (messageIndex < initialMessages.length) {
                STDOUT.innerHTML += `<br><span class='prompt'>${updateDateTime()} λ > </span>`;
            }
            await randomDelay(800, 1000);
        }
    }
    STDOUT.innerHTML += `<br>`;
}

export async function clear() {
    STDOUT.innerHTML = "";
    await doStuff('M');
}

export async function displayAsciiArt() {
    const asciiArt = `
        `;
    STDOUT.innerHTML = `<pre>${asciiArt}</pre>`;
    await doStuff('L');
}

export async function printToStdout(messages, delayLow, delayHigh) {
    let messageIndex = 0;

    while (messageIndex < messages.length) {
        const message = messages[messageIndex] === "" ? "\u00A0" : messages[messageIndex]; // Handle empty strings
        STDOUT.textContent += message + "\n";
        messageIndex++;
        await randomDelay(delayLow, delayHigh);
    }
    await doStuff('L');
}

export async function displayLoadingBar() {
    const loadingBar = document.createElement("div");
    loadingBar.textContent = "Building: [                    ]";
    STDOUT.appendChild(loadingBar);

    let progress = 0;
    const totalProgress = 20;

    while (progress < totalProgress) {
        progress++;
        const bar = "█".repeat(progress) + " ".repeat(totalProgress - progress);
        loadingBar.textContent = `Building: [${bar}] ${progress * 5}%`;
        await randomDelay(100, 500);
    }

    loadingBar.textContent = "Building: [████████████████████] Complete!";
    await doStuff('XL'); // Optional delay to show the complete message
}

export async function maximize() {
    TERMINAL.classList.remove('minimize');
    TERMINAL.classList.add('maximize');
}

export async function minimize() {
    TERMINAL.classList.remove('maximize');
    TERMINAL.classList.add('minimize');
}

export async function renderHtmlToTerminal(htmlFilePath) {
    try {
        const response = await fetch(htmlFilePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${htmlFilePath}: ${response.statusText}`);
        }
        const htmlContent = await response.text();

        // Split content by blank lines (one or more newlines with optional spaces)
        const sections = htmlContent.split(/\n\s*\n/);

        // Clear existing content
        TERMINAL_BODY.innerHTML = "";

        for (const s of sections) {
            await new Promise(resolve => setTimeout(resolve, 300)); // Adjust delay as needed
            TERMINAL_BODY.innerHTML += `${s.trim()}`; // Wrap in <p> for better formatting
        }
    } catch (error) {
        console.error(error);
        TERMINAL_BODY.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
}
