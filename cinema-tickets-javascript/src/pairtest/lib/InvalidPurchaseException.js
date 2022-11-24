export default class InvalidPurchaseException extends Error {
  constructor(message, type) {
    super(message);
    this.name = "InvalidPurchase";
    this.type = type;
  }
}
