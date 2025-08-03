/**
 * Craft a Scalable CLI Tool Notifier
 *
 * This project aims to create a scalable CLI tool that can notify users of important events
 * or updates. The notifier will be designed to be highly customizable, flexible, and easy to use.
 */

// imports
const commander = require('commander');
const notify = require('node-notifier');
const chalk = require('chalk');

// constants
const VERSION = '1.0.0';
const DEFAULT_NOTIFICATION_TITLE = 'CLI Notifier';
const DEFAULT_NOTIFICATION_MESSAGE = 'You have a new notification!';

// notifier function
function notifyUser(title, message) {
  notify.notify({
    title,
    message,
    sound: true,
    wait: true,
  });
}

// CLI tool
const cli = new commander.Command();

// version option
cli.version(VERSION, '-v, --version', 'output the current version');

// notify option
cli.option('-n, --notify <title> <message>', 'send a notification with the specified title and message');

// execute command
cli.parse(process.argv);

// handle notify option
if (cli.notify) {
  const [title, message] = cli.notify.split(' ');
  notifyUser(title || DEFAULT_NOTIFICATION_TITLE, message || DEFAULT_NOTIFICATION_MESSAGE);
  console.log(chalk.green(`Notification sent: ${title} - ${message}`));
} else {
  console.log(chalk.yellow('No notification sent. Use the -n or --notify option to send a notification.'));
}

// export cli
module.exports = cli;