import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import serialize from "serialize-javascript"
import { fetchPopularRepos } from '../shared/api'
import { matchPath } from "react-router-dom"
import routes from '../shared/routes'


const app = express()

app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))


// app.get("*", (req, res, next) => {
//     const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  
//     const promise = activeRoute.fetchInitialData
//       ? activeRoute.fetchInitialData(req.path)
//       : Promise.resolve()
  
//     promise.then((data) => {
//       const markup = renderToString(
//         <App data={data} />
//       )
  
//       res.send(`
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <title>SSR with RR</title>
//             <script src="/bundle.js" defer></script>
//             <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
//           </head>
  
//           <body>
//             <div id="app">${markup}</div>
//           </body>
//         </html>
//       `)
//     }).catch(next)
//   })

app.get("/", (req, res) => {
  const markup = renderToString(
    <App component='Home'/>
  )

  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>SSR with RR</title>
      <script src="/bundle.js" defer></script>
      <script>window.__COMPONENT__ = 'Home'</script>
    </head>

    <body>
      <div id="app">${markup}</div>
    </body>
  </html>
`)
});

app.get("/popular/:id", (req, res) => {
  const promise = fetchPopularRepos(req.params.id);

    promise.then((data) => {
      const markup = renderToString(
        <App data={data} component='Grid' />
      )

      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with RR</title>
            <script src="/bundle.js" defer></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            <script>window.__COMPONENT__ = 'Grid'</script>
          </head>

          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
      `)
    })
});


app.get("*", (req, res) => {
  const markup = renderToString(
    <App component='NoMatch'/>
  )

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src="/bundle.js" defer></script>
        <script>window.__COMPONENT__ = 'NoMatch'</script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `)
});
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server is listening on port: 3000`)
})