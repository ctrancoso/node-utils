const {
  prompt
} = require("enquirer");

async function loadModule(name) {
  const _module = new(require(name))(`${__dirname}/data`);
  await _module.init();
}

async function main() {
  const options = await prompt({
    type: "select",
    name: "operation",
    message: "Which module do you want to use?",
    choices: ["QRCode"]
  });

  switch (options.operation) {
    case "QRCode":
      await loadModule('./qr-code');
      break;
    default:
      break;
  }
}

main()
  .then(() => console.log("Done"))
  .catch(err => console.log(err));
