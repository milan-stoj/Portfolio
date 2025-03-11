import { doStuff, updateDateTime, getTextFromFile, waitForLandscapeMode, isPhoneInPortraitMode, waitForPortraitMode} from './components/utils.js';
import { typeToStdout, clear, printToStdout, displayLoadingBar, maximize, minimize, renderHtmlToTerminal } from './components/terminal.js';
import { setRandomGradient } from './components/gradient.js';

document.addEventListener("DOMContentLoaded", async function() {


    setRandomGradient();
    // text element constants
    const initialMessages = await getTextFromFile('text-elements/hello-world.txt');
    const mobileMessages = await getTextFromFile('text-elements/mobile.txt');
    const afterLandscape = await getTextFromFile('text-elements/after-landscape.txt');
    const afterPortrait = await getTextFromFile('text-elements/after-portrait.txt');
    const entryPont = await getTextFromFile('text-elements/entrypoint.txt');
    const pbsSplash = await getTextFromFile('text-elements/pbs/splash.txt');
    const pbsLoading = await getTextFromFile('text-elements/pbs/loading.txt');
    const portfolioText = await getTextFromFile('partials/portfolio.html');

    // main process flow
    await maximize();
    await doStuff('L');
    await typeToStdout(initialMessages, 800);

    // // check if on mobile, typeToStdout mobile messages, and waitForLandscapeMode
    if (isPhoneInPortraitMode()) {
        await doStuff('L');
        await typeToStdout(mobileMessages, 50, 150);
        await doStuff('M');
        await waitForLandscapeMode();
        await doStuff('XL');
        await typeToStdout(afterLandscape, 50, 150);
        await doStuff('XL');
        await waitForPortraitMode();
        await typeToStdout(afterPortrait, 50, 150);
    }

    await typeToStdout(entryPont, 50, 150);
    await doStuff('M');
    await clear();
    await doStuff(2000);
    await printToStdout(pbsSplash, 10, 50);
    await doStuff(1000);
    await printToStdout(pbsLoading, 500, 2000);
    await displayLoadingBar();
    await clear();
    renderHtmlToTerminal('./partials/portfolio.html');

});