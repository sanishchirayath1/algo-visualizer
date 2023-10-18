// visual representation of the FIFO queue
// 1. create a queue
// 2. add items to the queue
// 3. remove items from the queue
// 4. display the queue

// 1. create a queue
const pipe = document.querySelector(".pipe");
const addBtn = document.querySelector(".add");
// const removeBtn = document.querySelector(".remove");
const startBtn = document.querySelector(".start");

const count = 5;
const processes = [];
const minmax = [30, 150];

addBtn.addEventListener("click", handleAddClick);
// removeBtn.addEventListener("click", handleRemoveClick);
startBtn.addEventListener("click", handleStartClick);

function createProcessesArray() {
  for (let i = 0; i < count; i++) {
    processes.push(
      Math.floor(Math.random() * (minmax[1] - minmax[0])) + minmax[0]
    );
  }
}

createProcessesArray();

function handleAddClick() {
  const time = Math.floor(Math.random() * (minmax[1] - minmax[0])) + minmax[0];
  addProcess(time);
}

function handleRemoveClick() {
  removeProcess();
}

function handleStartClick() {
  startProcessing();
}

function addProcess(time) {
  const div = document.createElement("div");
  div.classList.add("process");
  const clone = div.cloneNode();
  clone.appendChild(document.createTextNode(time));
  clone.style.width = `${time}px`;
  pipe.appendChild(clone);
}

function removeProcess() {
  const first = pipe.firstElementChild;
  pipe.removeChild(first);
}

async function startProcessing() {
  const first = pipe.firstElementChild;
  const time = first.innerText;
  const height = first.style.height;
  startProcessingAnimation(first, parseInt(time), height);
  await wait(time * 20);
  pipe.removeChild(first);
  if (pipe.childElementCount === 0) {
    alert("Queue is empty");
  } else {
    startProcessing();
  }
}

function startProcessingAnimation(node, time) {
  node.classList.add("processing");
  node.style.height = "0px";
  node.style.transition = `${time * 20}ms`;
}

async function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const div = document.createElement("div");
div.classList.add("process");

for (let i = 0; i < count; i++) {
  addProcess(processes[i]);
}
