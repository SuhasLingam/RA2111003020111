const express = require("express");
const app = express();
const port = 9876;

const windowSize = 10;
const numberWindow = [];

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}

function generatePrime() {
  let num = Math.floor(Math.random() * 100) + 1;
  while (!isPrime(num)) {
    num = Math.floor(Math.random() * 100) + 1;
  }
  return num;
}
function generateFibonacci() {
  let a = 0,
    b = 1;
  const n = Math.floor(Math.random() * 10) + 1;
  for (let i = 2; i <= n; i++) {
    let temp = b;
    b = a + b;
    a = temp;
  }
  return b;
}
function generateEven() {
  let num = Math.floor(Math.random() * 100) + 1;
  while (num % 2 !== 0) {
    num = Math.floor(Math.random() * 100) + 1;
  }
  return num;
}
function generateRandom() {
  return Math.floor(Math.random() * 100) + 1;
}

function calculateAverage(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

function handleRequest(numberType) {
  let fetchedNumbers = [];
  for (let i = 0; i < 3; i++) {
    switch (numberType) {
      case "p":
        fetchedNumbers.push(generatePrime());
        break;
      case "f":
        fetchedNumbers.push(generateFibonacci());
        break;
      case "e":
        fetchedNumbers.push(generateEven());
        break;
      case "r":
        fetchedNumbers.push(generateRandom());
        break;
      default:
        return { error: "Invalid number type" };
    }
  }

  const windowPrevState = [...numberWindow];
  numberWindow.push(...fetchedNumbers);
  if (numberWindow.length > windowSize) {
    numberWindow.splice(0, numberWindow.length - windowSize);
  }
  const windowCurrState = [...numberWindow];

  const average = calculateAverage(numberWindow);

  return {
    windowPrevState,
    windowCurrState,
    numbers: fetchedNumbers,
    avg: average,
  };
}

app.get("/numbers/:numberId", (req, res) => {
  const response = handleRequest(req.params.numberId);
  res.json(response);
});

app.listen(port, () => {
  console.log(`service is on port : ${port}`);
});
