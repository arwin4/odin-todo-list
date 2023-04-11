import test from './test';

console.log('TEST'); // works

test(); // works

const testBtn = document.querySelector('button');
testBtn.addEventListener('click', () => test()); // also works

// But calling test() from the browser console does not.
