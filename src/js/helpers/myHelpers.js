export function getCssVarValue(prop, el = document.documentElement) {
  console.log(prop, parseInt(getComputedStyle(el).getPropertyValue(prop)));
  return parseInt(getComputedStyle(el).getPropertyValue(prop)) || 0;
}

export function debounce(fn, wait = 1) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, ...args), wait);
  };
}

export function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

export function setFullHeight() {
  const getWindowHeight = () => {
    if (document) {
      const windowHeight = document.documentElement.clientHeight;
      const vh = windowHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  };

  getWindowHeight();

  window.addEventListener("resize", () => getWindowHeight());
}
