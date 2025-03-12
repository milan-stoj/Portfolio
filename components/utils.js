export function doStuff(sizeOrMs) {
  let ms;
  if (typeof sizeOrMs === 'number') {
    ms = sizeOrMs;
  } else {
    ms = sizeToMs(sizeOrMs);
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay(low, high) {
    const delay = Math.floor(Math.random() * (high - low + 1)) + low;
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function updateDateTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function sizeToMs(size) {
    let ms;
    switch (size) {
        case 'XXS':
        ms = 10;
        break
        case 'XS':
        ms = 50;
        break;
        case 'S':
        ms = 200;
        break;
        case 'M':
        ms = 500;
        break;
        case 'L':
        ms = 1000;
        break;
        case 'XL':
        ms = 2000;
        break;
        case 'XXL':
        ms = 3000;
        break;
        default:
        ms = 500; // Default to MEDIUM if no valid process size is provided
    }
    return ms;
}

export function textLinesToArray(filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(text => text.split('\n'));
}

export function isPhoneInPortraitMode() {
    return window.matchMedia("(orientation: portrait) and (max-width: 767px)").matches;
}

export function waitForLandscapeMode() {
  return new Promise(resolve => {
      const mediaQuery = window.matchMedia("(orientation: landscape)");
      if (mediaQuery.matches) {
          resolve();
      } else {
          mediaQuery.addEventListener('change', function onChange(event) {
              if (event.matches) {
                  mediaQuery.removeEventListener('change', onChange);
                  resolve();
              }
          });
      }
  });
}

export function waitForPortraitMode() {
  return new Promise(resolve => {
      const mediaQuery = window.matchMedia("(orientation: portrait)");
      if (mediaQuery.matches) {
          resolve();
      } else {
          mediaQuery.addEventListener('change', function onChange(event) {
              if (event.matches) {
                  mediaQuery.removeEventListener('change', onChange);
                  resolve();
              }
          });
      }
  });
}