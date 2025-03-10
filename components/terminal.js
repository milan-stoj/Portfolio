import { delay, updateDateTime } from './utils.js';

export async function typeMessage(terminalText, initialMessages) {
    let messageIndex = 0;
    let charIndex = 0;

    while (messageIndex < initialMessages.length) {
        if (charIndex < initialMessages[messageIndex].length) {
            terminalText.innerHTML += initialMessages[messageIndex].charAt(charIndex);
            charIndex++;
            const delayTime = Math.random() * 150 + 50; // Random delay between 50ms and 200ms
            await delay(delayTime);
        } else {
            charIndex = 0;
            messageIndex++;
            if (messageIndex < initialMessages.length) {
                terminalText.innerHTML += `<br><span class='prompt'>${updateDateTime()}</span> λ > `;
                await delay(500);
            }
        }
    }
}

export async function clearTerminal(terminalText, stdout) {
    terminalText.innerHTML = "";
    stdout.innerHTML = "";
    await delay(1000);
}

export async function displayAsciiArt(terminalText) {
    const asciiArt = `
░       ░░░       ░░░░      ░░
▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒
▓       ▓▓▓       ▓▓▓▓      ▓▓
█  ████████  ████  ████████  █
█  ████████       ████      ██

Portfolio Build System
v0.4.7 Ⓒ 2025
        `;
    terminalText.innerHTML = `<pre>${asciiArt}</pre>`;
    await delay(2000);
}

export async function outputToStdout(stdoutElement, messages, delayLow, delayHigh) {
    let messageIndex = 0;
    let stdoutText = stdoutElement.querySelector(".stdout-text");

    if (!stdoutText) {
        stdoutText = document.createElement("div");
        stdoutText.className = "stdout-text";
        stdoutElement.appendChild(stdoutText);
    }

    while (messageIndex < messages.length) {
        const message = messages[messageIndex] === "" ? "\u00A0" : messages[messageIndex]; // Handle empty strings
        stdoutText.textContent += message + "\n";

        messageIndex++;
        const delayTime = Math.random() * delayLow + delayHigh; // Random delay between 150ms and 450ms
        await delay(delayTime);
    }
    await delay(1000);
}

export async function displayLoadingBar(stdout) {
    const loadingBar = document.createElement("div");
    loadingBar.className = "stdout-text";
    loadingBar.textContent = "Building: [                    ]";
    stdout.appendChild(loadingBar);

    let progress = 0;
    const interval = setInterval(() => {
        progress++;
        const bar = "█".repeat(progress) + " ".repeat(20 - progress);
        loadingBar.textContent = `Building: [${bar}] ${progress * 5}%`;

        if (progress >= 20) {
            clearInterval(interval);
            loadingBar.textContent = "Building: [████████████████████] Complete!";
        }
    }, 200); // Update every 200ms
    await delay(5000);
}