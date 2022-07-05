/* eslint-disable @typescript-eslint/no-var-requires */
const TopPages = require("../controllers/api/top_pages_controller.js");

module.exports = function (router) {
  router.get("/top_pages", TopPages.index);
};
