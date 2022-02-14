class AndLogic {
  constructor(logicType) {
    this.perceptron = new Perceptron(2, 1, 0);
    this.logicType = logicType;
    if (logicType == "and") {
      this.inputData = [
        [0, 1],
        [0, 0],
        [1, 0],
        [1, 1],
      ];
      this.outputData = [0, 0, 0, 1];
    } else {
      this.inputData = [
        [0, 1],
        [0, 0],
        [1, 0],
        [1, 1],
      ];
      this.outputData = [1, 0, 1, 1];
    }
    this.perceptron.train(this.inputData, this.outputData, 100);
    this.input1 = new Neuron(200, 200, 30);
    this.input2 = new Neuron(200, 400, 30);
    this.hiddenNeuron = new Neuron(400, 300, 40);
    this.outputNeuron = new Neuron(600, 300, 30);
    this.setOutput();
  }
  show() {
    this.input1.makeArrow(this.hiddenNeuron.pos.x, this.hiddenNeuron.pos.y);
    this.input2.makeArrow(this.hiddenNeuron.pos.x, this.hiddenNeuron.pos.y);
    this.hiddenNeuron.makeArrow(
      this.outputNeuron.pos.x,
      this.outputNeuron.pos.y
    );
    this.input1.show();
    this.input2.show();
    this.hiddenNeuron.show();
    this.outputNeuron.show();
    this.drawRect("Class Values", 100, 500, color(0));
    this.drawRect("Trained  Values", 250, 500, color(0));
    let temp = this.logicType === "and" ? 0.5 : 1;
    this.drawRect("w0=" + temp, 100, 540, color(0, 100));
    this.drawRect(
      "w0=" + this.roundValue(this.perceptron.weights[0]),
      250,
      540,
      color(0, 100)
    );
    this.drawRect("w1=" + temp, 100, 580, color(0, 100));
    this.drawRect(
      "w1=" + this.roundValue(this.perceptron.weights[1]),
      250,
      580,
      color(0, 100)
    );
    this.drawRect("w2=" + -1, 100, 620, color(0, 100));
    this.drawRect(
      "w2=" + this.roundValue(this.perceptron.weights[2]),
      250,
      620,
      color(0, 100)
    );
  }
  roundValue(val) {
    //round float value to 3 decimal places
    return Math.round((val + Number.EPSILON) * 1000) / 1000;
  }
  drawRect(val, x, y, col) {
    textSize(20);
    fill(col);
    noStroke();
    text(val, x, y);
  }
  update(mx, my) {
    if (this.input1.isMouseOver(mx, my)) {
      this.input1.setOn(!this.input1.on);
    } else if (this.input2.isMouseOver(mx, my)) {
      this.input2.setOn(!this.input2.on);
    }
    this.setOutput();
  }
  setOutput() {
    let input = [this.input1.on ? 1 : 0, this.input2.on ? 1 : 0];
    this.outputNeuron.setOn(
      this.perceptron.predict(input) === 1 ? true : false
    );
  }
}
