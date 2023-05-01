import express from "express"
import cors from "cors"
import userRoute from "../routes/user.routes.js"
import authRout from "../routes/auth.routes.js"
import dbConnection from "../db/config.js"

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.authPath = "/api/auth"
    this.userPath = "/api/users"
    // connect db
    this.connectDB()
    // Middleware
    this.middleware()
    // App routes
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middleware() {
    // CORS
    this.app.use(cors())
    // Read and parse body
    this.app.use(express.json())
    // Public dir
    this.app.use(express.static("public"))
  }

  routes() {
    this.app.use(this.authPath, authRout)
    this.app.use(this.userPath, userRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`)
    })
  }
}
