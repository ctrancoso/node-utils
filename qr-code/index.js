const QRCode = require('qrcode'),
  {
    prompt
  } = require("enquirer");

class QRCodeGenerator {
  constructor(dataPath) {
    this.dataPath = dataPath;
  }

  async init() {
    const options = await prompt({
      type: "select",
      name: "operation",
      message: "Which operation do you want to perform?",
      choices: ["Generate"]
    });

    switch (options.operation) {
      case "Generate":
        await this.generate();
        break;
      default:
        break;
    }
  }

  async generate() {
    const options = await prompt([{
        type: "input",
        name: "input",
        message: "Please enter the data do you want to embed:"
      },
      {
        type: "select",
        name: "format",
        message: "Which format do you want?",
        choices: ["svg", "png", "txt"]
      }
    ]);

    if (!options.input) {
      return;
    }

    await new Promise((resolve, reject) => {
      QRCode.toFile(`${this.dataPath}/${Date.now()}.${options.format}`, options.input, {
        color: {
          // dark: '#00F', // Blue dots
          // light: '#0000' // Transparent background
        }
      }, function (err) {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = QRCodeGenerator;
