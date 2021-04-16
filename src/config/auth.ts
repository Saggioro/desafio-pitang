export default {
  jwt: {
    userSecret:
      process.env.APP_USER_SECRET || 'ff3c1222b903113acbba54cc92536357',
    nurseSecret:
      process.env.APP_NURSE_SECRET ||
      'hr65165l416y5il4654f6ds54fa6s5d4g65j465iliu4tl6tyui8bv41',
    expiresIn: '1d',
  },
};
