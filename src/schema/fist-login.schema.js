const Ajv = require('ajv');

const ajv = new Ajv();
const firstLoginSchema = {
  type: 'object',
  properties: {
    db: {
      type: 'object',
      properties: {
        user: { type: 'string' },
        password: { type: 'string' },
        host: { type: 'string' },
        port: { type: 'string' },
        dataBase: { type: 'string' },
      },
      required: ['user', 'password', 'host', 'port', 'dataBase'],
    },
    user: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  },
  required: ['db', 'user'],
  additionalProperties: false,
};

module.exports = ajv.compile(firstLoginSchema);
