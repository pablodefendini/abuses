let videos = require("./videos.json");
const fs = require("fs");
const _ = require("lodash");
videos = videos
  .filter((v) => v.YouTube.includes("http"))
  .map((v) => ({
    ...v,
    youtube: `https://www.youtube.com/embed/${v.YouTube.split("/").slice(-1)}`,
  }))
  .filter((v) => v.youtube);

videos = _.sortBy(videos, (v) => v.State);

const stats = {
  count: videos.length,
};

console.log(stats);

// <iframe width="420" height="315"
// src="https://www.youtube.com/embed/tgbNymZ7vqY">
//www.youtube.com/embed/a2jN0VEGvBs
// </iframe>

function card(video, defer) {
  return `
  <div class="video" ${defer ? `data-video=${video.youtube}` : ""}>
    ${
      !defer
        ? `<iframe width="420" height="315"  src=${video.youtube}></iframe>`
        : ""
    }
    <div class="location"><b>${video.State}</b>  ${video.City}</div>
    <div class="description">${video["Doucette Text"]}</div>
  </div>`;
}

function page(videos) {
  return `
    <html>
        <head>
        <link href="styles.css" rel="stylesheet" />
        <script src="script.js"> </script>

        </head>

        <body>
        <header>    
         <h1>GeorgeFloyd Protest - police brutality videos on Twitter</div> 
         <div>
         <a href="https://docs.google.com/spreadsheets/d/1YmZeSxpz52qT-10tkCjWOwOGkQqle7Wd1P7ZM1wMW0E/edit#gid=0">Sheet</a> 
         - <a href="https://twitter.com/greg_doucette">Creator</a>
         - <a href="https://twitter.com/jasonemiller">Curator</a>
         </div>
        </header>
            <div id="videos">
            ${videos
              .slice(0, 10)
              .map((v) => card(v, false))
              .join("\n")}
            ${videos
              .slice(10)
              .map((v) => card(v, true))
              .join("\n")}
            </div>

            <script>
            document.querySelectorAll('iframe').forEach(e => {
                e.onload = videoLoad; 
            })  

            </script>
        </body>
    </html>`;
}

fs.writeFileSync("./index.html", page(videos));