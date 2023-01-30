const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

function generateManager() {
  const managerInfo = {};

  return inquirer
    .prompt({
      name: "name",
      message: "Please enter  the Team Manager's name.",
    })
    .then((data) => {
      managerInfo.name = data.name;

      inquirer
        .prompt({
          name: "id",
          message: "Please enter their Employee ID.",
        })
        .then((data) => {
          managerInfo.id = data.id;

          inquirer
            .prompt({
              name: "email",
              message: "Please enter their Employee Email.",
            })
            .then((data) => {
              managerInfo.email = data.email;

              inquirer
                .prompt({
                  name: "officeNumber",
                  message: "Please enter their Office Number.",
                })
                .then((data) => {
                  managerInfo.officeNumber = data.officeNumber;

                  const { name, id, email, officeNumber } = managerInfo;

                  const manager = new Manager(name, id, email, officeNumber);
                  console.log(manager);
                });
            });
        });
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
          name: "create student",
          value: "student",
        },
        {
          name: "Exit the Course Manager",
          value: "exit",
        },
      ],
    })
    .then((choice) => {
      if (choice.option === "student") return generateStudent();

      console.log("Thanks for using our app!");
      process.exit();
    });
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
