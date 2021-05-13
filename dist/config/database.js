"use strict";require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
