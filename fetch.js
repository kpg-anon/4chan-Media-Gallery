const chan = require('4chanapi.js');
const axios = require('axios');

async function fetchMediaDetailsFromThreads(boards, keywords) {
    let allMediaDetails = [];

    for (const board of boards) {
        try {
            let threads = await chan.threadsWithTopics([board], keywords);
            console.log(`Threads found on ${board}:`, threads);

            for (let thread of threads) {
                let threadData = await axios.get(thread.url);
                let posts = threadData.data.posts;

                let mediaLinks = await chan.threadMediaLinks(thread.url);
                for (let mediaLink of mediaLinks) {
                    let thumbnailLink = mediaLink.replace(/(\.[\w\d]+)$/, 's.jpg');
                    let mediaId = mediaLink.match(/\/(\d+)(\.[\w\d]+)$/)[1];

                    let post = posts.find(p => p.tim === parseInt(mediaId));
                    let originalFilename = post ? post.filename + post.ext : "Unknown";

                    allMediaDetails.push({
                        mediaLink,
                        thumbnailLink,
                        originalFilename
                    });
                }
            }
        } catch (error) {
            console.error(`Error fetching data from ${board}:`, error);
        }
    }

    return allMediaDetails;
}

module.exports = fetchMediaDetailsFromThreads;
