class Expense extends Data {
  static expensesCounter = 0;

  constructor(description, value) {
    super(description, value);
    this._id = ++Expense.expensesCounter;
  }

  get id() {
    return this._id;
  }
}
