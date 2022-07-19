const express = require("express")
const path = require("path")
const server = express()
server.use(express.json())

if(process.env.NODE_ENV != "production"){
  server.use((req, res, next)=>{
      if(req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Headers',"Content-Type");
      res.setHeader('Access-Control-Allow-Methods',"GET, PUT, DELETE, POST");
      res.setHeader('Access-Control-Allow-Credentials', true);
      next()
  })
}else{
  server.use(express.static("public/dist"))
  server.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"))
  })
}

// server.use(express.static("public/dist"))
// server.get("*",(req, res)=>{
//   res.sendFile(path.join(__dirname, "public", "dist", "index.html"))
// })


const port = process.env.PORT || 3000
server.listen(port,()=>{
  console.log(`server started on port ${port}`)
})

