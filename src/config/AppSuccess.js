export default class AppSuccess {
  constructor(message = 'Success', httpCode, name) {
    this.message = message;
    this.httpCode = httpCode;
    this.name = name;
  }
}
