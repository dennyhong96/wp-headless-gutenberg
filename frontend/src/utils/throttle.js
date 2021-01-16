function throttle(fn, wait) {
  let timeout;
  return function (...args) {
    if (timeout) return;
    timeout = setTimeout(() => {
      fn.call(this, ...args);
      timeout = null;
    }, wait);
  };
}

export default throttle;
