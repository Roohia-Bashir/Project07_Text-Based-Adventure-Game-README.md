#!/usr/bin/env node
////////////////////////////////
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
////////////////////////////////
// Define the game class
class AdventureGame {
    points;
    rounds;
    maxRounds;
    availablePlaces;
    constructor() {
        this.points = 0;
        this.rounds = 0;
        this.maxRounds = 5; // Maximum rounds to play
        this.availablePlaces = ['Dark Forest', 'Haunted Mansion', 'Treacherous Mountains', 'Enchanted Cave', 'Mystic Waterfall'];
    }
    // Start the game
    async startGame() {
        this.displayWelcomeMessage();
        while (this.rounds < this.maxRounds && this.points < 50) {
            await this.playRound();
            this.rounds++;
        }
        this.endGame();
    }
    // Display welcome message
    displayWelcomeMessage() {
        console.log(figlet.textSync("🐰 Rabbit's Adventure Game 🐰"));
        console.log(chalk.green("Help the Rabbit 🐰 to find the treasure by collecting 50 points!"));
    }
    // Play a round
    async playRound() {
        console.log(chalk.yellow(`\nRound ${this.rounds + 1}/${this.maxRounds}`));
        const chosenPlace = await this.choosePlace();
        if (chosenPlace === 'Exit Game') {
            this.endGame();
            return;
        }
        await this.enterDangerousPlace(chosenPlace);
    }
    // Choose a place
    async choosePlace() {
        const response = await inquirer.prompt({
            type: 'list',
            name: 'chosenPlace',
            message: 'Choose a dangerous place:',
            choices: [...this.availablePlaces, 'Exit Game'] // Add 'Exit Game' choice
        });
        return response.chosenPlace;
    }
    // Enter a dangerous place
    async enterDangerousPlace(place) {
        console.log(`You have entered the ${chalk.red(place)}.`);
        console.log(chalk.bgBlue("Searching for fruits..."));
        // Simulate searching for fruits
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(chalk.magenta('Found some fruits!'));
        await this.searchForFruits();
    }
    // Search for fruits
    async searchForFruits() {
        const response = await inquirer.prompt({
            type: 'list',
            name: 'chosenFruit',
            message: 'Choose a fruit:',
            choices: ['apple', 'orange', 'banana', 'kiwi']
        });
        const fruitPoints = {
            'apple': [8, 10, 12, 14, 16],
            'orange': [4, 12, 9, 7, 8],
            'banana': [6, 8, 10, 12, 14],
            'kiwi': [2, 8, 11, 7, 6]
        };
        console.log(`You found a ${chalk.green(response.chosenFruit)}!`);
        this.points += fruitPoints[response.chosenFruit][this.rounds] || 0; // Adjust points based on current round
        console.log(chalk.yellowBright(`Your points: ${this.points}`));
    }
    // End the game
    async endGame() {
        if (this.points >= 50) {
            console.log(chalk.green("Congratulations! 🐰 found the treasure! 🎉"));
        }
        else {
            console.log(chalk.red("Sorry, 🐰 didn't find the treasure. Game over! 💔"));
        }
        process.exit();
    }
}
// Instantiate AdventureGame class
const game = new AdventureGame();
// Call startGame method to begin the game
game.startGame();
