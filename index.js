const AND = "AND",
  OR = "OR",
  NOT = "NOT",
  DATA = "DATA";
let current_state;
let andlogic, orlogic, notlogic, datalogic;
let onNeuron;
let offNeuron;
function setup() {
  createCanvas(800, 800);
  andlogic = new AndLogic("and");
  orlogic = new AndLogic("or");
  notlogic = new NotLogic();
  datalogic = new DataLogic();
  onNeuron = new Neuron(700, 100, 15);
  offNeuron = new Neuron(750, 100, 15);
  onNeuron.setOn(true);
  console.log("Training Complete...");
  document.getElementById(AND).onclick = () => {
    if (current_state === AND) {
      document.getElementById(AND).classList.remove("selected");
      current_state = "";
    } else {
      current_state = AND;
      document.getElementById(AND).classList.add("selected");
      deselect(OR, NOT, DATA);
    }
  };
  document.getElementById(OR).onclick = () => {
    if (current_state === OR) {
      document.getElementById(OR).classList.remove("selected");
      current_state = "";
    } else {
      current_state = OR;
      document.getElementById(OR).classList.add("selected");
      deselect(AND, NOT, DATA);
    }
  };
  document.getElementById(NOT).onclick = () => {
    if (current_state === NOT) {
      document.getElementById(NOT).classList.remove("selected");
      current_state = "";
    } else {
      current_state = NOT;
      document.getElementById(NOT).classList.add("selected");
      deselect(AND, OR, DATA);
    }
  };
  document.getElementById(DATA).onclick = () => {
    if (current_state === DATA) {
      document.getElementById(DATA).classList.remove("selected");
      current_state = "";
    } else {
      current_state = DATA;
      document.getElementById(DATA).classList.add("selected");
      deselect(AND, OR, NOT);
    }
  };
  const deselect = (a, b, c) => {
    document.getElementById(a).classList.remove("selected");
    document.getElementById(b).classList.remove("selected");
    document.getElementById(c).classList.remove("selected");
  };
}

function draw() {
  background(255);
  if (current_state === AND) {
    andlogic.show();
  } else if (current_state === OR) {
    orlogic.show();
  } else if (current_state === NOT) {
    notlogic.show();
  } else if (current_state === DATA) {
    datalogic.show();
  } else {
    textSize(30);
    fill(50, 200);
    noStroke();
    text("Please select one of the categories from left", 100, 400);
  }
  if (current_state !== undefined && current_state !== "") {
    fill(50, 150);
    textSize(30);
    noStroke();
    text(current_state, 700, 50);
    if (current_state === AND || current_state === OR || current_state === OR) {
      onNeuron.show();
      offNeuron.show();
      fill(50, 150);
      textSize(20);
      text("ON", 685, 150);
      fill(50, 150);
      textSize(20);
      text("OFF", 735, 150);
    }
  }
}

function mousePressed() {
  switch (current_state) {
    case AND: {
      andlogic.update(mouseX, mouseY);
      break;
    }
    case NOT: {
      notlogic.update(mouseX, mouseY);
      break;
    }
    case OR: {
      orlogic.update(mouseX, mouseY);
    }
  }
}
