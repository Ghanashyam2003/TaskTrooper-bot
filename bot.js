// Load environment variables
require("dotenv").config();

// Import required packages
const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const axios = require("axios");

// Initialize Telegram Bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Welcome message on /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.chat.first_name || "Friend";

  const welcomeMessage = `
  👋 Welcome, *${userName}*!  
  I’m **TaskTrooper**, your smart task assistant.
  
  ✨ I can:
  1️⃣ Manage tasks by natural commands.  
  2️⃣ Send motivational quotes.  
  3️⃣ Tell funny jokes.

  🤖 *Created by Ghanashyam Badgujar !!!*
  
  Type /help to see what I can do!
    `;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

// Manage tasks by natural commands.
const tasks = {};

bot.onText(/\/add (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const task = match[1];

  if (!tasks[chatId]) tasks[chatId] = [];
  tasks[chatId].push(task);

  bot.sendMessage(chatId, `✅ Task added: "${task}"`);
});

bot.onText(/\/tasks/, (msg) => {
  const chatId = msg.chat.id;
  const userTasks = tasks[chatId] || [];

  if (userTasks.length === 0) {
    return bot.sendMessage(chatId, "📭 You have no tasks.");
  }

  const taskList = userTasks
    .map((task, index) => `${index + 1}. ${task}`)
    .join("\n");
  bot.sendMessage(chatId, `📝 Your tasks:\n${taskList}`);
});

// Schedule daily reminder at 9 AM
schedule.scheduleJob("0 9 * * *", () => {
  Object.keys(tasks).forEach((chatId) => {
    const userTasks = tasks[chatId];
    if (userTasks && userTasks.length > 0) {
      const taskList = userTasks
        .map((task, index) => `${index + 1}. ${task}`)
        .join("\n");
      bot.sendMessage(
        chatId,
        `⏰ Reminder! Your tasks for today:\n${taskList}`
      );
    }
  });
});

// Function to get a random programming joke
async function getJoke() {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Programming");
    console.log("Joke API Response:", response.data); // Check the response

    // Handle two-part and single jokes correctly
    if (response.data.type === "twopart") {
      return `${response.data.setup}\n\n${response.data.delivery}`;
    } else if (response.data.type === "single") {
      return response.data.joke;
    } else {
      return "Couldn't understand the joke format.";
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "Oops! Couldn't fetch a joke. Try again later.";
  }
}

// Listen for the "/joke" command
bot.onText(/\/joke/, async (msg) => {
  const chatId = msg.chat.id;
  const joke = await getJoke();
  bot.sendMessage(chatId, joke);
});

// Clear all tasks
bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;
  if (tasks[chatId] && tasks[chatId].length > 0) {
    delete tasks[chatId];
    bot.sendMessage(chatId, "🗑️ All your tasks have been cleared!");
  } else {
    bot.sendMessage(chatId, "📭 No tasks to clear.");
  }
});

// Suggest a random productivity task
bot.onText(/\/randomtask/, (msg) => {
  const chatId = msg.chat.id;
  const randomTasks = [
    "📚 Read a tech blog.",
    "💻 Practice coding for 30 minutes.",
    "📊 Organize your daily schedule.",
    "🚶 Take a 5-minute walk.",
    "📖 Learn a new programming concept.",
  ];
  const randomTask =
    randomTasks[Math.floor(Math.random() * randomTasks.length)];
  bot.sendMessage(chatId, `🔔 Try this task: ${randomTask}`);
});

// Send a motivational quote
bot.onText(/\/motivate/, (msg) => {
  const chatId = msg.chat.id;
  const quotes = [
    "🚀 *Success is the sum of small efforts repeated day in and day out.*",
    "🌟 *Your only limit is your mind.*",
    "💡 *Believe you can and you're halfway there.*",
    "🔥 *Don't stop when you're tired, stop when you're done.*",
    "🏆 *The secret of getting ahead is getting started.*",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  bot.sendMessage(chatId, randomQuote, { parse_mode: "Markdown" });
});

// Show task statistics
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  const taskCount = tasks[chatId] ? tasks[chatId].length : 0;

  const statsMessage = taskCount
    ? `📊 You have *${taskCount}* tasks in your list.`
    : "📭 You have no tasks. Add one using /add [task].";

  bot.sendMessage(chatId, statsMessage, { parse_mode: "Markdown" });
});

// Update the /help command to show new features
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  const helpMessage = `
    🤖 *TaskTrooper Bot - Command Guide*  

    ✅ *Task Management:*  
    - \`/add [task]\` - Add a new task.  
    - \`/tasks\` - View all your tasks.  
    - \`/clear\` - Clear all your tasks.  
    - \`/stats\` - Check task statistics.  
    - *Automatic Reminder:* Receive your tasks every day at *9 AM*.

    🎯 *Fun & Motivation:*  
    - \`/joke\` - Get a random programming joke.  
    - \`/randomtask\` - Get a random productivity task.  
    - \`/motivate\` - Receive a motivational quote.  

    ℹ️ *Other Commands:*  
    - \`/start\` - Welcome message.  
    - \`/help\` - Show this help menu.  
    `;

  bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
});
