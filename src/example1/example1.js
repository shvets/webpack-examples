const arr = [1, 2, 3];

const iAmJavascriptES6 = () => {
  console.log(...arr);

  return arr.join(', ');
};

window.iAmJavascriptES6 = iAmJavascriptES6;

document.getElementById('example1').innerHTML = "window.iAmJavascriptES6: " + window.iAmJavascriptES6();



