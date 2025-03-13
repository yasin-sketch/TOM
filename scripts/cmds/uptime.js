const si = require('systeminformation');

module.exports.config = {
  name: "uptime",
  author: "Romim",
  version: "2.1.0",
  category: "TOOLS"
};

module.exports.onStart = async ({ api, event }) => {
  try {
    const uptime = process.uptime();
    const sec = Math.floor(uptime % 60);
    const min = Math.floor((uptime / 60) % 60);
    const hr = Math.floor((uptime / (60 * 60)) % 24);
    const day = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${day} Days\n${hr} Hours\n${min} Minutes\n${sec} Seconds`;

    const diskInfo = await si.fsSize();
    const totalDisk = (diskInfo[0].size / (1024 ** 3)).toFixed(2);
    const usedDisk = (diskInfo[0].used / (1024 ** 3)).toFixed(2);
    const freeDisk = (diskInfo[0].available / (1024 ** 3)).toFixed(2);
    const diskString = `Total Disk: ${totalDisk} GB\nUsed Disk: ${usedDisk} GB\nFree Disk: ${freeDisk} GB`;

    const battery = await si.battery();
    const batteryString = battery.hasBattery
      ? `Battery: ${battery.percent}% (${battery.isCharging ? "Charging" : "Not Charging"})`
      : "Battery Info: Not Available";

    const pingStart = Date.now();
    const ping = Date.now() - pingStart;

    const message = `✨ *System Uptime* ✨\n${uptimeString}\n\n🗄️ *Disk Information* 🗄️\n${diskString}\n\n🌐 *Ping* 🌐\n${ping} ms\n\n👨‍💻 Created by: Mohammad Rexy ||`;

    api.sendMessage(message, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
  /*const response = await axios.get(`${global.GoatBot.config.api}Romim/phonk`)
  const uri = response.data.data
  const a6 = await axios.get(uri,{responseType: 'stream'});
  let a6y = a6.data*/
