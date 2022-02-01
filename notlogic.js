class NotLogic {
  constructor() {
    this.perceptron = new Perceptron(1, 1, 0);
    this.inputData = [[1], [0]];
    this.outputData = [0, 1];
    this.perceptron.train(this.inputData, this.outputData, 100);
    this.input1 = new Neuron(200, 300, 30);
    this.hiddenNeuron = new Neuron(400, 300, 40);
    this.outputNeuron = new Neuron(600, 300, 30);
    this.setOutput();
  }
  show() {
    this.input1.makeArrow(this.hiddenNeuron.pos.x, this.hiddenNeuron.pos.y);
    this.hiddenNeuron.makeArrow(
      this.outputNeuron.pos.x,
      this.outputNeuron.pos.y
    );
    this.input1.show();
    this.hiddenNeuron.show();
    this.outputNeuron.show();
  }
  update(mx, my) {
    if (this.input1.isMouseOver(mx, my)) {
      this.input1.setOn(!this.input1.on);
    }
    this.setOutput();
  }
  setOutput() {
    let input = [this.input1.on ? 1 : 0];
    this.outputNeuron.setOn(
      this.perceptron.predict(input) === 1 ? true : false
    );
  }
}
