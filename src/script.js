"use strict";

const from_input = document.querySelector("#starting-num");
const to_input = document.querySelector("#ending-num");
const details_btn = document.querySelector(".details-btn");
const popover_section = document.querySelector(".popover");
const closePopover_span = document.querySelector(".close-popover");
const error_div = document.querySelector(".error");

error_div.style.visibility = "hidden";
popover_section.style.display = "none";
details_btn.disabled = true;
let initNum = from_input.value;
let finalNum = to_input.value;
let completeProcessTime = 0;
let timeDiffBtwPrimes = [];
let primeRunTime = [];

const getTime = function (init) {
  return Date.now() - init;
};

const update_primeRunTime = function (initTime, number, result) {
  const time = getTime(initTime);
  const obj = { number, result, time };
  primeRunTime.push(obj);
};

const isPrime = function (num) {
  const isPrime_now = Date.now();
  if (num <= 1) {
    update_primeRunTime(isPrime_now, num, "Normal");
    return false;
  } else if (num === 2 || num === 3) {
    update_primeRunTime(isPrime_now, num, "Prime");
    return true;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      update_primeRunTime(isPrime_now, num, "Normal");
      return false;
    }
  }
  update_primeRunTime(isPrime_now, num, "Prime");
  return true;
};

const getPrimeInRange = function (initNum, finalNum) {
  const startTime = Date.now();
  let timeBtw = Date.now();
  for (let i = initNum; i <= finalNum; i++) {
    const numIsPrime = isPrime(i);
    if (numIsPrime) {
      const timeTaken = getTime(timeBtw);
      const obj = { number: i, time: timeTaken };
      timeDiffBtwPrimes.push(obj);
      timeBtw = Date.now();
      console.log(`${i} is Prime`);
    }
  }
  completeProcessTime = getTime(startTime);
};

const generate_generalTable = function () {
  const genTable = document.querySelector(".general-table");
  const removeElem = document.querySelector("#gen-table-body");
  if (!!removeElem) removeElem.remove();
  const genTableBody = document.createElement("tbody");
  genTableBody.setAttribute("id", "gen-table-body");
  primeRunTime.forEach((objRes) => {
    const genTableRow = document.createElement("tr");
    Object.values(objRes).forEach((data) => {
      const genTableColumn = document.createElement("td");
      genTableColumn.textContent = data;
      genTableRow.append(genTableColumn);
    });
    genTableBody.append(genTableRow);
  });
  const totleTimeRow = document.createElement("tr");
  const totleTimeColumn1 = document.createElement("th");
  const totleTimeColumn2 = document.createElement("td");
  totleTimeColumn1.setAttribute("colspan", "2");
  totleTimeColumn1.textContent = "Total Run Time ->";
  totleTimeColumn2.textContent = `${completeProcessTime}ms`;
  totleTimeRow.append(totleTimeColumn1);
  totleTimeRow.append(totleTimeColumn2);
  genTableBody.append(totleTimeRow);
  genTable.append(genTableBody);
};

const generate_primeTable = function () {
  const primeTable = document.querySelector(".prime-table");
  const removeElem = document.querySelector("#prime-table-body");
  if (!!removeElem) removeElem.remove();
  const primeTableBody = document.createElement("tbody");
  primeTableBody.setAttribute("id", "prime-table-body");
  timeDiffBtwPrimes.forEach((objRes) => {
    const primeTableRow = document.createElement("tr");
    Object.values(objRes).forEach((data) => {
      const primeTableColumn = document.createElement("td");
      primeTableColumn.textContent = data;
      primeTableRow.append(primeTableColumn);
    });
    primeTableBody.append(primeTableRow);
  });
  primeTable.append(primeTableBody);
};

const detailsHandler = function () {
  timeDiffBtwPrimes = [];
  primeRunTime = [];
  completeProcessTime = 0;
  getPrimeInRange(initNum, finalNum);
  generate_generalTable();
  generate_primeTable();
  popover_section.style.display = "flex";
};

const onChange = function () {
  initNum = Math.ceil(Number(from_input.value));
  finalNum = Math.ceil(Number(to_input.value));

  if (!initNum && !finalNum) error_div.style.visibility = "hidden";

  if (!!initNum && !!finalNum && finalNum > initNum) {
    details_btn.disabled = false;
    error_div.style.visibility = "hidden";
  } else {
    details_btn.disabled = true;
  }

  if ((!!initNum && initNum < 0) || (!!finalNum && finalNum < 0)) {
    error_div.style.visibility = "visible";
    error_div.textContent = "Entered number must be greater than 0 or 1";
  }

  if (!!finalNum && finalNum < initNum) {
    error_div.style.visibility = "visible";
    error_div.textContent = "End point must be greater than starting point";
  }
};

const close = function () {
  popover_section.style.display = "none";
  from_input.value = "";
  to_input.value = "";
  details_btn.disabled = true;
  initNum = "";
  finalNum = "";
};

from_input.addEventListener("input", onChange);
to_input.addEventListener("input", onChange);
details_btn.addEventListener("click", detailsHandler);
closePopover_span.addEventListener("click", close);
