import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import googleNewsScraper from "google-news-scraper";

// export const scrape = async (req, res) => {
//   let search = req.params.url;
//   encodeURI(search);
//   console.log(search);
//   let url =
//     "https://newsapi.org/v2/top-headlines?" +
//     "q=" +
//     search +
//     "&" +
//     "pageSize=5&" +
//     "sortBy=popularity&" +
//     "language=en&" +
//     "apiKey=6da6eafef0ff46e68bfaee42434398c6";
//   console.log(req.params.url);
//   var articles = new Array();
//   var JsonObject;

//   var promises = [];

//   async function getarticles(url) {
//     await axios.get(url).then(function (r1) {
//       for (let i = 0; i < r1.data.articles.length; i++) {
//         let firstResult = r1.data.articles[i];
//         async function getscrape(firstResult) {
//           await axios.get(firstResult.url).then(function (r2) {
//             let dom = new JSDOM(r2.data, {
//               url: firstResult.url,
//             });
//             let article = new Readability(dom.window.document).parse();
//             articles.push(article.textContent);
//           });
//         }
//         promises.push(getscrape(firstResult));
//       }
//     });
//   }
//   await getarticles(url);

//   Promise.all(promises).then(function () {
//     JsonObject = JSON.parse(JSON.stringify(articles));

//     res.json(JsonObject);
//   });
//   console.log("hello");
// };

export const scrape = async (req, res) => {
  let search = req.params.url;
  encodeURI(search);
  console.log(search);
<<<<<<< HEAD
  let url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    search +
    "&" +
    "pageSize=5&" +
    "apiKey=6da6eafef0ff46e68bfaee42434398c6";
  console.log(req.params.url);
  console.log(url);
=======
  var links = new Array();
>>>>>>> c320a88 (added backend web scraping script and apis)
  var articles = new Array();
  var JsonObject;

  var promises = [];
  // const r1 = await googleNewsScraper({
  //   searchTerm: search,
  //   prettyURLs: true,
  //   queryVars: {
  //     hl: "en-US",
  //     gl: "US",
  //     ceid: "US:en",
  //   },
  //   timeframe: "5d",
  //   puppeteerArgs: [],
  // });
  // console.log(r1[0]);

  async function getarticles(search) {
    const r1 = await googleNewsScraper({
      searchTerm: search,
      prettyURLs: false,
      queryVars: {
        hl: "en-US",
        gl: "IN",
        ceid: "US:en",
      },
      timeframe: "1d",
      puppeteerArgs: [],
    });
    console.log(r1.link);
    for (let i = 0; i < 5; i++) {
      links[i] = r1[i].link;
    }
    console.log(links);
    for (let i = 0; i < 5; i++) {
      let firstResult = r1[i];
      console.log(firstResult);
      async function getscrape(firstResult) {
        await axios.get(firstResult.link).then(function (r2) {
          let dom = new JSDOM(r2.data, {
            url: firstResult.link,
          });
          let article = new Readability(dom.window.document).parse();
          articles.push(article.textContent);
        });
      }
      promises.push(getscrape(firstResult));
    }
  }
  await getarticles(search);

  Promise.all(promises).then(function () {
    JsonObject = JSON.parse(JSON.stringify(articles));

    res.json(JsonObject);
  });
  console.log("hello");
};
