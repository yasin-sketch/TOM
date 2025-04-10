const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "video",
    aliases: [],
    version: "1.0",
    author: "♡︎ 𝐻𝐴𝑆𝐴𝑁 ♡︎",
    countDown: 2,
    role: 0,
    description: {
      en: "video from youtube link video name",
    },
    category: "media",
    guide: {
      en: "{pn} [url || name]",
    },
  },

  onStart: async function ({ api, args, event }) {
    const songName = args.join(" ");
    const search = await axios.get(https://hasan-all-apis.onrender.com/ytb-search?songName=${songName});
    
    const hasan = "https://nazrul-xyzz.vercel.app/nazrul";
    let url = search.data[0].videoUrl;
    
    if(!url) {
       url = event.messageReply?.body || args[0];
    }
    

    if (!url) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      return api.sendMessage("⁉️ | Please provide a valid URL or video Name.", event.threadID, event.messageID);
    }

    try {
      const response = await axios.get(${hasan}/ytMp4?url=${encodeURIComponent(url)});

      if (!response.data) {
        throw new Error("Download link not found. Check your API.");
      }

      const downloadLink = response.data.downloads.data.fileUrl;
      const cachePath = path.join(__dirname, "cache");
      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath);
      }

      const filePath = path.join(cachePath, "video.mp4");
      const { data } = await axios.get(downloadLink, { responseType: "stream" });
      const writer = fs.createWriteStream(filePath);
      data.pipe(writer);

      writer.on("finish", () => {
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        api.sendMessage(
          {
            body: "✨ | Here is your video..!!",
            attachment: fs.createReadStream(filePath),
          },
          event.threadID,
          () => fs.unlink(filePath, () => {}),
          event.messageID
        );
      });

      writer.on("error", (err) => {
        throw err;
      });

    } catch (error) {
      api.setMessageReaction("❎", event.messageID, () => {}, true);
      api.sendMessage(❌ | Error:\n${error.message}, event.threadID, event.messageID);
    }
  },
};
