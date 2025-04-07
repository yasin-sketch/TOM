module.exports = {
 config: {
   name: "prefix",
   version: "1.0",
   author: "Nyx",
   countDown: 5,
   role: 0,
   category: "prefix"
 },

 onStart: async function () { },
 onChat: async function ({ event, message, getLang }) {
   if (event.body && event.body.toLowerCase() === "prefix") {
     return message.reply({
       body: `Hello!  𝙃ō𝙩𝙖𝙧ō 𝙊𝙧𝙚𝙠𝙞🕸️
🌟 **My Prefix:** [ - ]  
📜 **How to get started:**  
➡️ Type -help to view all available commands.  

💬 **Need Help?**  
👉 Feel free to ask!  

🚀 Have a great day!\n 
     });
   }
 }
};
