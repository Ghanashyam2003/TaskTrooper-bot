# 📌 TaskTrooper Bot

TaskTrooper is a powerful and customizable **Telegram Bot** that helps you manage tasks effortlessly. With features like task reminders, status tracking, recurring tasks, and daily summaries, TaskTrooper makes your productivity smarter!

## 🛠️ Features

### ✅ Basic Features
- **Add Tasks**: Quickly add tasks with deadlines.
- **List Tasks**: View all your pending and completed tasks.
- **Delete Tasks**: Remove tasks you no longer need.

### 🚀 Advanced Features
- **Task Reminders**: Get notifications for upcoming tasks.
- **Task Status Update**: Update task status (Pending, In Progress, Completed).
- **Daily Task Summary**: Receive a daily list of tasks automatically.
- **Recurring Tasks**: Schedule tasks that repeat daily, weekly, or monthly.

---

## 📋 Prerequisites

Ensure you have the following installed:

- Node.js (v18.20.5 or later)
- Telegram Account
- Railway or any other cloud deployment platform

---

## 📂 Setup Instructions

### 1. Create a Telegram Bot
1. Open Telegram and search for **@BotFather**.
2. Use the command `/newbot` to create a bot.
3. Follow the steps to get your **BOT_TOKEN**.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/TaskTrooper-Bot.git
cd TaskTrooper-Bot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Environment Variables
Create a `.env` file in the root directory:

```env
BOT_TOKEN=your_actual_bot_token
```

### 5. Run the Bot Locally

```bash
node bot.js
```

---

## 📊 Usage

### Add a Task
```bash
/addtask Finish project report by 5 PM
```
Response:
```
Task added successfully!
```

### List All Tasks
```bash
/listtasks
```
Response:
```
1. Finish project report (5 PM) - Pending
2. Water plants (Daily at 8 AM) - Recurring
```

### Update Task Status
```bash
/updatetask 1 completed
```
Response:
```
Task #1 marked as completed! 🎉
```

### Delete a Task
```bash
/deletetask 1
```
Response:
```
Task deleted successfully!
```

---

## 📅 Advanced Features

### 1. Task Reminders
Automatically reminds you before a task deadline.

Example:
```bash
/addtask Submit assignment at 10 PM
```

Bot will send a reminder at 9:50 PM.

### 2. Recurring Tasks
Supports daily, weekly, and monthly recurring tasks.

Example:
```bash
/addtask Exercise daily at 6 AM
```

### 3. Daily Task Summary
Receive a summary of your pending tasks every morning.

---

## 🚀 Deployment

### Deploy to Railway

1. Sign in to [Railway](https://railway.app/).
2. Create a new project and link your GitHub repository.
3. Set the **BOT_TOKEN** in Environment Variables.
4. Deploy and monitor logs for errors.

### Alternative Deployment
- **Render**: Simple and scalable.
- **Heroku**: Free tier for small bots.

---

## 🐛 Troubleshooting

### Common Errors:

1. **Bot not starting?**
   - Ensure `BOT_TOKEN` is correct in `.env`.
2. **Missing packages?**
   - Run `npm install` again.
3. **Container restarts?**
   - Check logs on Railway for detailed errors.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Submit a pull request.

---

## 📧 Contact

For queries, contact me shubhambadgujar2003@gmail.com

Happy Coding! 💻

