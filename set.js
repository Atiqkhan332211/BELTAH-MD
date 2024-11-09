const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYURsQXMwaEdwdEFPTG9TQnlrc3kyeitDcXVKNkNjNGlkWndqTmJ5RFVVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRjBHREwwSkVRci8xRTJnOEE0SFdxdU9MSmxZTzJiQXc3SFYwVTVkQ3pYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQ0pIa1diRkhtMzBXZlNvbFZYV1ZoQlplUFdqWVc2SzkyZDUwSUd2OG5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiUHZycWtQUU1JNlB4M0FCc0NQeDVmS1Y3YThTL1EyMDNreUlWMEtZNEZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QSjllL3JKVVA0QVF2NitTWjhNY1RTT3ltNE5OM3QzRFVqWEhEYzhLRVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitnSldIMU16czNLYnd3empacVVUSUdUbHM1OGlBZFJaMHNjNG5WVWVsQ009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU45RnQrWlpjUW9MRVE2RGs0ZmYvVmFBd2RyTkhuemdySmtpbnVCOVExdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidSticTJVdkxXTFdQT2ZhNlBDSWgyMm1QNnhPankxbkU3UUdiVjczZHp3VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1VVzFmMlMzZC85L3ovSTc2NFNWZkYrbUhJUEY5dnZyOGZBRWh5cjBtZTNudDJXclZLQjB3NlFkL3B6bktsN0djbnExUDlyVG5tNDhPRXpnaUxqdEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgxLCJhZHZTZWNyZXRLZXkiOiJhU1hkUFpUaFZwZjUwR0dtczhvci81REV2VnpOUzJQZVFhbHpTRHliSU9VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJRcXR5Rm53UlI0bU5MRUFnZk94cnlBIiwicGhvbmVJZCI6ImZkODYyNDIxLTgxOWMtNDA5ZC05MzYyLTlmZjM0NjhmMGFhYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQ0NVRlh2RDRXVEcvaVFza0wzbmo1Z2tEeTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpvckdIWEt4aUhzMEtXU0lYK28rMGFJT0pnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJMMlQ2NFNDIiwibWUiOnsiaWQiOiI5MjM0MDkwNjg3NTc6MzdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi2KfYqNmGINiz2YjYp9iq24wifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tiRjY4SUdFSW5QdTdrR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpkQm1YTWRTZHRXVTkzVGdna0pHaHVpQWpKSE9acm5lTnUxeUVabU02SG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IktSYVlGbi9VUDNoSEFrVktVRlJWcUZHb1lsSTk5ZUVROEFRekRKbmVmMTJHdWZkWnRVNWZtR0hMWkM4dmdKZi9xc0QrRlQrSzZmbnRSS1V1YVpwSkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJySE42WWhpU2tRUy93OGwvN0tFamxPWVQ1dUI2T1dubkdHbE9uaW5RRHcxOEdXN1F3eUFxdWRudGFwSzhZMmZnMlRDc1FEemNRQmM1MGl3ZHYzaHZDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQwOTA2ODc1NzozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjM1FabHpIVW5iVmxQZDA0SUpDUm9ib2dJeVJ6bWE1M2pidGNoR1pqT2g2In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxMTI3MTkwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5abSJ9;;;',
    PREFIXE: process.env.PREFIX || ",",
    GITHUB : process.env.GITHUB|| 'https://github.com/Atiqkhan332211/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Swati Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923409068757",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ SWATI-MD",
    BOT : process.env.BOT_NAME || 'Swati-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "yes",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || atiqkhanswati,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || HRKU-1e1c86aa-c402-410c-a426-68a6a9175e65,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
