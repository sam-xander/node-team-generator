const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const team = [];

// Helper function to validate inquirer prompts
function validateInput(value) {
  if (!value) {
    return "This field is required.";
  }
  return true;
}

// Generates the Manager object from user inputs
function createManager() {
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

// Generates the Engineer object from user inputs
function createEngineer() {
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

// Generates the Intern object from user inputs
function createIntern() {
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
      name: "school",
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

// Displays a list of options to continue or exit the app -> then checks user choice
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
      if (choice.option === "engineer") return createEngineer();
      if (choice.option === "intern") return createIntern();

      generatePage();
    });
}

// Checks for output directory -> then writes to team.html file (fs methods run synchronously)
function generatePage() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(outputPath, render(team), (error) => {
    if (error) throw error;

    console.log(
      "---\nThe team profile generated successfully!\n---\nThanks for using the App!"
    );
  });
}

// Initiates the app by prompting the user to create the team manager object
function init() {
  console.log("---\nWelcome to the Team Management App!\n---");

  createManager();
}

init();
