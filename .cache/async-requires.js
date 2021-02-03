// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("/Users/stocky/Clients/Stocky/dranked/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/Users/stocky/Clients/Stocky/dranked/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-index-js": () => import("/Users/stocky/Clients/Stocky/dranked/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-submit-item-js": () => import("/Users/stocky/Clients/Stocky/dranked/src/pages/submitItem.js" /* webpackChunkName: "component---src-pages-submit-item-js" */),
  "component---src-pages-submit-vote-js": () => import("/Users/stocky/Clients/Stocky/dranked/src/pages/submitVote.js" /* webpackChunkName: "component---src-pages-submit-vote-js" */),
  "component---src-pages-welcome-js": () => import("/Users/stocky/Clients/Stocky/dranked/src/pages/welcome.js" /* webpackChunkName: "component---src-pages-welcome-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/stocky/Clients/Stocky/dranked/.cache/data.json")

