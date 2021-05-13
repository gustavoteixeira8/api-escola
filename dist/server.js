"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_dotenv2.default.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

_app2.default.listen(SERVER_PORT, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log(`Server is running: http://localhost:${SERVER_PORT}`);
});
