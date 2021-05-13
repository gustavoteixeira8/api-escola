"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path');
require('./database'); // Executa o método init do model
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _studentRoutes = require('./routes/studentRoutes'); var _studentRoutes2 = _interopRequireDefault(_studentRoutes);
var _studentAvatarRoutes = require('./routes/studentAvatarRoutes'); var _studentAvatarRoutes2 = _interopRequireDefault(_studentAvatarRoutes);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, 'uploads')));
    this.app.use(_helmet2.default.call(void 0, ));
  }

  routes() {
    this.app.use('/user', _userRoutes2.default);
    this.app.use('/token', _tokenRoutes2.default);
    this.app.use('/student', _studentRoutes2.default);
    this.app.use('/student-avatar', _studentAvatarRoutes2.default);
    this.app.use((req, res) => res.status(404).json({ message: 'Not Found', httpCode: 404, name: 'NotFound' }));
  }
}

exports. default = new App().app;
