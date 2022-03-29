const { PrismaClient } = require('@prisma/client');
const { encrypt } = require('../utils/tool');
const log = require('../utils/log4j').getLogger('create-user.middle');

const prisma = new PrismaClient();

const main = async (ctx, next) => {
  const { user } = ctx.request.body || {};
  const {
    crypto: { encryptedKey },
  } = ctx;
  if (user) {
    const { username, password } = user || {};
    log.info('enter create-user middle main');
    const userResult = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!userResult) {
      log.info('begin create super admin');

      await prisma.user
        .create({
          data: {
            username,
            password: encrypt(encryptedKey, password),
            email: '',
            emailCode: '',
            isValid: 0,
            isLocked: 0,
            scopes: {
              create: {
                scope: {
                  create: {
                    name: 'super-admin',
                  },
                },
              },
            },
          },
          select: {
            id: true,
          },
        })
        .catch((e) => {
          log.error('create user error, error is =', e);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    } else {
      log.error('user already exist');
    }
  }
  await next();
};

module.exports = main;
