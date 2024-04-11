#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import EditorPrompt from "inquirer/lib/prompts/editor.js";

async function textanimation(text: string) {
  for (let char of text) {
    process.stdout.write(char);

    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}

async function exitanimation(text: string) {
  for (let char of text) {
    process.stdout.write(char);

    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

let continueprocess = true;

while (continueprocess) {
  let todo: string[] = [
    `Ayaz ahmed - "Default Value"`,
    `Todo App - "Default Value"`,
    `Assignment by Manal Rana - "Default Value"`,
  ];

  let condition = true;

  let todolist = await inquirer.prompt([
    {
      name: "todo",
      type: "list",
      message: await textanimation(
        chalk.blue.bold("\n\t Make your todo list.\n\t")
      ),
      choices: [
        "Add todo item.",
        "Delete an item.",
        "Update an item.",
        "View your list.",
        "Exit",
      ],
    },
  ]);

  if (todolist.todo === "Add todo item.") {
    while (condition) {
      let addtodoitem = await inquirer.prompt([
        {
          name: "firstquestion",
          type: "input",
          message: chalk.greenBright.bold("Please add your todo items"),
        },

        {
          name: "secondquestion",
          type: "confirm",
          message: chalk.blueBright.bold(
            "Would you like to add some more todos"
          ),
          default: "true",
        },
      ]);

      todo.push(addtodoitem.firstquestion);

      await textanimation(
        chalk.green("-----------------------------------------------")
      );

      await textanimation(
        chalk.green.bold(`\nTodo item added Successfully!\n`)
      );
      todo.forEach((todo) => console.log(todo));

      await textanimation(
        chalk.green("-----------------------------------------------\n")
      );
      condition = addtodoitem.secondquestion;
    }
  } else if (todolist.todo === "View your list.") {
    await textanimation(
      chalk.yellow("-----------------------------------------------")
    );
    await textanimation(chalk.yellow.bold(`\nYour todo items are!\n`));
    todo.forEach((todo) => console.log(todo));

    await textanimation(
      chalk.yellow("-----------------------------------------------\n")
    );
  } else if (todolist.todo === "Update an item.") {
    const eidttodo = await inquirer.prompt([
      {
        name: "edit",
        type: "list",
        message: await textanimation(
          chalk.red.bold("\tChose an item to edit\n")
        ),
        choices: todo,
      },
      {
        name: "newitem",
        type: "input",
        message: chalk.red.bold("Enter the new value:"),
      },
    ]);

    let index = todo.indexOf(eidttodo.edit);
    todo[index] = eidttodo.newitem;

    await textanimation(
      chalk.red.bold(`"${eidttodo.edit}" updated to "${eidttodo.newitem}\n`)
    );

    await textanimation(
      chalk.green("-----------------------------------------------")
    );

    await textanimation(chalk.green.bold(`\nYour Updated todo list\n`));
    todo.forEach((todo) => console.log(todo));

    await textanimation(
      chalk.green("-----------------------------------------------\n")
    );
  } else if (todolist.todo === "Exit") {
    await textanimation(
      chalk.yellow("-----------------------------------------------")
    );
    await exitanimation(
      chalk.yellow.bold.italic(
        `\nThank you for using todo App!\n\t Ayaz Ahmed\n`
      )
    );
    await textanimation(
      chalk.yellow("-----------------------------------------------\n")
    );
  } else if (todolist.todo === "Delete an item.") {
    const deletetodo = await inquirer.prompt([
      {
        name: "delete",
        type: "list",
        message: await textanimation(
          chalk.red.bold("\n\t Chose an item to delete\n")
        ),
        choices: todo,
      },
    ]);
    let index = todo.indexOf(deletetodo.delete);
    await textanimation(
      chalk.gray(`-----------------------------------------------`)
    );
    if (index !== -1) {
      todo.splice(index, 1);
      await textanimation(
        chalk.red.bold.italic(
          `\nTodo deleted Successfuly: Here is your updated list.\n`
        )
      );

      todo.forEach((todo) => console.log(todo));
    }
    await textanimation(
      chalk.gray("-----------------------------------------------\n")
    );
  }

  const replay = await inquirer.prompt({
    name: "replay",
    type: "confirm",
    message: chalk.black.bold("Do you want continue?"),
    default: true,
  });

  continueprocess = replay.replay;
}
