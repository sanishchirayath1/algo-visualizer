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

async function addProcess(time) {
  const processWrapper = document.createElement("div");
  processWrapper.classList.add("process-wrapper");
  const process = document.createElement("div");
  process.classList.add("process");
  const text = document.createElement("p");
  text.innerText = time;
  const clone = processWrapper.cloneNode();
  clone.appendChild(process);
  clone.appendChild(text);
  clone.style.height = "100px";
  clone.style.width = `${time}px`;
  clone.opacity = 0;
  clone.style.transform = "translateX(500%)";
  pipe.appendChild(clone);
  await wait(100);
  animateAddition(clone);
}

function animateAddition(node) {
  node.style.transition = "0.5s";
  node.style.transitionTimingFunction = "linear";
  node.style.transform = "translateX(0)";
  node.style.opacity = 1;
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
  // animate the removed element to top corner
  await moveNodeToTop(first);
  const removed = pipe.removeChild(first);
  console.log(removed);

  if (pipe.childElementCount === 0) {
    alert("Queue is empty");
  } else {
    startProcessing();
  }
}

async function moveNodeToTop(node) {
  node.style.transition = "1s";
  node.style.transitionTimingFunction = "linear";
  node.style.transform = "translateY(-400%)";
  await wait(500);
  node.style.opacity = 0;
}

function startProcessingAnimation(node, time) {
  const nodeChild = node.firstElementChild;
  const text = node.lastElementChild;
  nodeChild.classList.add("processing");
  nodeChild.style.transition = `${time * 20}ms`;
  nodeChild.style.transitionTimingFunction = "linear";
  nodeChild.style.height = "100px";
  countDown(text, time);
}

function countDown(node, time) {
  node.innerText = time;
  time--;
  let timeoutId;
  clearTimeout(timeoutId);
  if (time >= 0) {
    timeoutId = setTimeout(() => {
      countDown(node, time);
    }, 20);
  }
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
