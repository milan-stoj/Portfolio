import { wait, randomDelay, updateDateTime } from './utils.js';


const STDOUT = document.getElementById("stdout");
const TERMINAL = document.querySelector('.terminal');
const TERMINAL_BODY = document.querySelector('.terminal-body');


export async function typeToStdout(initialMessages, initialDelay) {
    STDOUT.innerHTML += `<span class='prompt'>${updateDateTime()}</span> λ > `;
    let messageIndex = 0;
    let charIndex = 0;

    await randomDelay(800, 1000);
    while (messageIndex < initialMessages.length) {
        if (charIndex < initialMessages[messageIndex].length) {
            STDOUT.innerHTML += initialMessages[messageIndex].charAt(charIndex);
            charIndex++;
            await randomDelay(75, 125);
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
    await wait('M');
}

export async function displayAsciiArt() {
    const asciiArt = `
        `;
    STDOUT.innerHTML = `<pre>${asciiArt}</pre>`;
    await wait('L');
}

export async function printToStdout(messages, delayLow, delayHigh) {
    let messageIndex = 0;

    while (messageIndex < messages.length) {
        const message = messages[messageIndex] === "" ? "\u00A0" : messages[messageIndex]; // Handle empty strings
        STDOUT.textContent += message + "\n";
        messageIndex++;
        await randomDelay(delayLow, delayHigh);
    }
    await wait('L');
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
    await wait('XL'); // Optional delay to show the complete message
}

export async function maximize() {
    TERMINAL.classList.remove('minimize');
    TERMINAL.classList.add('maximize');
    await wait('L');
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

        // Clear existing content
        TERMINAL_BODY.innerHTML = "";
        TERMINAL_BODY.innerHTML = htmlContent; // Wrap in <p> for better formatting

        const profile = await fetch("text-elements/profile.txt");
        const profileText = await profile.text();
        const profilePreTag = document.getElementById("profile");
        profilePreTag.textContent = profileText;

    } catch (error) {
        console.error(error);
        TERMINAL_BODY.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
}
