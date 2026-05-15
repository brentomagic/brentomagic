const Mustache = require("mustache");
const fs = require("fs");

const MUSTACHE_MAIN_DIR = "./main.mustache";

const CONFIG = {
  name: "Brent",
};

const DATA = {
  name: CONFIG.name,
};

function generateReadMe() {
  const template = fs.readFileSync(MUSTACHE_MAIN_DIR, "utf8");
  fs.writeFileSync("README.md", Mustache.render(template, DATA));
}

generateReadMe();
