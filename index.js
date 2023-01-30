const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function validateInput(value) {
  if (!value) {
    return "This field is required.";
  }
  return true;
}

function generateManager() {
  const prompts = [
    {
      name: "name",
      message: "Please enter  the Team Manager's name.",
      validate: validateInput,
    },
    {
      name: "id",
      message: "Please enter their Employee ID.",
      validate: validateInput,
    },
    {
      name: "email",
      message: "Please enter their Employee Email.",
      validate: validateInput,
    },
    {
      name: "officeNumber",
      message: "Please enter their Office Number.",
      validate: validateInput,
    },
  ];

  return inquirer.prompt(prompts).then((data) => {
    const manager = new Manager(
      data.name,
      data.id,
      data.email,
      data.officeNumber
    );
    team.push(manager);

    console.log(`---\nSuccessfully added the Team Manager.\n---`);

    showMainMenu();
  });
}

function generateEngineer() {
  const prompts = [
    {
      name: "name",
      message: "Please enter  the Engineer's name.",
      validate: validateInput,
    },
    {
      name: "id",
      message: "Please enter their Employee ID.",
      validate: validateInput,
    },
    {
      name: "email",
      message: "Please enter their Employee Email.",
      validate: validateInput,
    },
    {
      name: "github",
      message: "Please enter their GitHub username.",
      validate: validateInput,
    },
  ];

  return inquirer.prompt(prompts).then((data) => {
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    team.push(engineer);

    console.log(`---\nSuccessfully added an Engineer.\n---`);

    showMainMenu();
  });
}

function generateIntern() {
  const prompts = [
    {
      name: "name",
      message: "Please enter  the Intern's name.",
      validate: validateInput,
    },
    {
      name: "id",
      message: "Please enter their Employee ID.",
      validate: validateInput,
    },
    {
      name: "email",
      message: "Please enter their Employee Email.",
      validate: validateInput,
    },
    {
      name: "officeNumber",
      message: "Please enter their School.",
      validate: validateInput,
    },
  ];

  return inquirer.prompt(prompts).then((data) => {
    const intern = new Intern(data.name, data.id, data.email, data.school);
    team.push(intern);

    console.log(`---\nSuccessfully added an Intern.\n---`);

    showMainMenu();
  });
}

function showMainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "Please choose an option.",
      choices: [
        {
          name: "Add an Engineer",
          value: "engineer",
        },
        {
          name: "Add an Intern",
          value: "intern",
        },
        {
          name: "Finish building the team.",
          value: "exit",
        },
      ],
    })
    .then((choice) => {
      if (choice.option === "engineer") return generateEngineer();
      if (choice.option === "intern") return generateIntern();

      generatePage();
    });
}

function generatePage() {
  render(team);
  process.exit();
}

function init() {
  console.log("--- Welcome to the Team Management App! ---");

  generateManager();
}

init();

// function prompt() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("All good!");
//     }, 3000);
//   });
// }

// const data = prompt();

// data.then((data) => console.log(data));
