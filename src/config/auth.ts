export default {
  jwt: {
    secret: process.env.APP_SECRET || 'ff3c1222b903113acbba54cc92536357',
    expiresIn: '1d',
  },
};
