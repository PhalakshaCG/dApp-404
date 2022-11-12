import axios from "axios";

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

// First lets get some search data from News API

// Build the URL we are going request. This will get articles related to Apple and sort them newest first
let url =
  "https://newsapi.org/v2/everything?" +
  "q=climate%20change%is%a%hoax&" +
  "pageSize=5&" +
  "apiKey=6da6eafef0ff46e68bfaee42434398c6";

// Make the request with axios' get() function
axios.get(url).then(function (r1) {
  // At this point we will have some search results from the API. Take the first search result...
  var articles = new Array();
  for (let i = 0; i < r1.data.articles.length; i++) {
    let firstResult = r1.data.articles[i];

    // ...and download the HTML for it, again with axios
    axios.get(firstResult.url).then(function (r2) {
      // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
      let dom = new JSDOM(r2.data, {
        url: firstResult.url,
      });
      // now pass the DOM document into readability to parse
      let article = new Readability(dom.window.document).parse();
      articles.push(article.textContent);
      // Done! The article content is in the textContent property
      //   console.log(
      //     article.textContent +
      //       "/n" +
      //       "--------------------------------------------------------"
      //   );
      console.log(articles);
    });
  }
});
