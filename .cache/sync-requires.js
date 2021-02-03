const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/src/pages/index.js"))),
  "component---src-pages-submit-item-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/src/pages/submitItem.js"))),
  "component---src-pages-submit-vote-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/src/pages/submitVote.js"))),
  "component---src-pages-welcome-js": hot(preferDefault(require("/Users/stocky/Clients/Stocky/dranked/src/pages/welcome.js")))
}

