class Income extends Data {
  static incomesCounter = 0;

  constructor(description, value) {
    super(description, value);
    this._id = ++Income.incomesCounter;
  }

  get id() {
    return this._id;
  }
}
