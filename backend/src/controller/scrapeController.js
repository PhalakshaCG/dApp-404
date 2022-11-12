import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export const scrape = async (req, res) => {
  let search = req.params.url;
  encodeURI(search);
  console.log(search);
  let url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    search +
    "&" +
    "pageSize=5&" +
    "apiKey=6da6eafef0ff46e68bfaee42434398c6";
  console.log(req.params.url);
  console.log(url);
  var articles = new Array();
  var JsonObject;

  var promises = [];

  async function getarticles(url) {
    await axios.get(url).then(function (r1) {
      for (let i = 0; i < r1.data.articles.length; i++) {
        let firstResult = r1.data.articles[i];
        async function getscrape(firstResult) {
          await axios.get(firstResult.url).then(function (r2) {
            let dom = new JSDOM(r2.data, {
              url: firstResult.url,
            });
            let article = new Readability(dom.window.document).parse();
            articles.push(article.textContent);
            // console.log(typeof JsonObject);
          });
        }
        promises.push(getscrape(firstResult));
      }
    });
  }
  await getarticles(url);
  //   console.log(promises);
  Promise.all(promises).then(function () {
    //do something with the results
    JsonObject = JSON.parse(JSON.stringify(articles));

    res.json(JsonObject);
  });
  // JsonObject = JSON.parse(JSON.stringify(articles));
  //   setTimeout(() => {
  //     console.log("indise timeout");
  //     // console.log(articles);
  //     JsonObject = JSON.parse(JSON.stringify(articles));
  //     console.log(promises);

  //     res.json(JsonObject);
  //   }, 5000);

  console.log("hello");
  //   console.log(JsonObject);
  //   res.json("hello");
};
