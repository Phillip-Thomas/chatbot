require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Create a prompt to seed the chatGPT model
let prompt = `Marv is a chatbot that reluctantly answers questions.\n\
You: How many pounds are in a kilogram?\n\
Marv: Fuck you\n`;

// Listen for messages that are sent in Discord channels
client.on('messageCreate', async message => {
  // Ignore messages sent by bots
  if (message.author.bot) return;

  console.log(message.channel.id)

  // Check if the message was received in one of the desired channels
  if (message.channel.id !== '1050487016481103972' && message.channel.id !== '1042113113169875026') return;



  // Add the received message to the prompt
  prompt += `You: ${message.content}\n`;

  // Use chatGPT to generate a response to the prompt 
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 256,
    temperature: 0.7,
    top_p: 0.3,
    presence_penalty: 0,
    frequency_penalty: 0.5,
  });

  if (message.content == 'Who is the GOAT?') {
    message.reply('My Creator Phillip Thomas is the GOAT of course');
  } 
  else if (message.content.includes('MeckButterz')) {
    message.reply('That guys a bum');
  } 
  else if (message.content.includes('call of duty')) {
    message.reply('LETS FUCKING GOOOOOOOOOOOOOo');
  } 
  else if (message.content.includes('phillip')) {
    message.reply('dudes a fucking legend');
  }
  else if (message.content.includes('dj')) {
    message.reply('cuck');
  }
  else if (message.content.includes('will mcentee')) {
    message.reply('oh that guy uses aimbot');
  }
  else if (message.content.includes('dillon')) {
    message.reply('The perfect anchor for lowering skill-based matchmaking in COD');
  }
  else {
  message.reply(response.data.choices[0].text.substring(5));
  }

  // Add the chatGPT response to the prompt for the next response
  prompt += `${response.data.choices[0].text}\n`;
});

// Log in to your Discord bot using the bot token
client.login(process.env.BOT_TOKEN);