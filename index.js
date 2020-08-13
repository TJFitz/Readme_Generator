const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of this project?",
  },
  {
    type: "input",
    message: "Please enter a short description of your application",
    name: "description",
  },
  {
    type: "input",
    message: "Please enter any installation instructions for this application",
    name: "installation",
  },
  {
    type: "input",
    message: "Please enter usage instructions for this application",
    name: "usage",
  },
  {
    type: "input",
    message: "Please enter any contribution guidelines for this project",
    name: "contributions",
  },
  {
    type: "input",
    message: "Are there any tests for this application?",
    name: "tests",
  },
  {
    type: "list",
    message: "Please chose a license for this project",
    name: "license",
    choices: ["Creative Commons", "MIT", "ISC"],
  },
  {
    type: "input",
    message: "Please enter your full name for licensing",
    name: "user",
  },
  {
    type: "input",
    message: "Please enter your Github username",
    name: "github",
  },
  {
    type: "input",
    message: "Please enter your email address",
    name: "email",
  },
];

// function to initialize program

function init() {
  inquirer.prompt(questions).then((data) => {
    // License options

    const cc = `<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.`;

    const mit = `MIT License

    Copyright (c) 2020 ${data.user}

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.`;

    const isc = `Copyright 2020 ${data.user}

    Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;

    let chosenLicense;

    // License badges

    const ccLic =
      "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)";
    const mitLic =
      "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    const iscLic =
      "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
    let chosenBadge;
    if (data.license === "Creative Commons") {
      chosenLicense = cc;
      chosenBadge = ccLic;
    } else if (data.license === "MIT") {
      chosenLicense = mit;
      chosenBadge = mitLic;
    } else {
      chosenLicense = isc;
      chosenBadge = iscLic;
    }

    // Beginning of readme template literal

    const readme = `# ${data.title} ${chosenBadge}
    
### 

<br>

## Description

  * ${data.description}

## Table of Contents

[Installation](##installation)

[Usage](##usage)

[License](##license)

[Contributing](##contributing)

[Tests](##tests)

[Questions](##questions)

## Installation

  * ### How to install ${data.title}

    * ${data.installation}

## Usage

  * ${data.usage}

## License

${chosenLicense}

## Contributing

  * ### Contributing to ${data.title}

    * ${data.contributions}

## Tests

  * ${data.tests}

## Questions

  * If you would like to contact me with further questions you can reach me at 

    * https://github.com/${data.github}

    * ${data.email}

    * Let's collaborate!`;

    // End of readme template literal

    fs.writeFile("README.md", readme, (err) => {
      if (err) {
        throw err;
      }
      console.log("Success! Thank you for using my readme generator!");
    });
  });
}

// function call to initialize program
init();
