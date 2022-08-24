const {app, server, express} = require("./server.js");
require("dotenv").config();
require("./config/db_config");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes")



//  parse JSON-encoded bodies and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// To avoid CORS ERROR, we need allow some Header accesses as done below
app.use(cors())

//  Using Middleware Morgan for logging.
app.use(morgan("combined"))

//Create a default root route,
app.get("/", (req, res) => {
    res.status(200).json(
        {
            "success": true,
            "code": 200,
            "message": "You are welcome to Vybaze music API !!!!!!!!"
        }
    )
})

//  Requesting for imported Routes
app.use("/api/v1", routes);



const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || 'localhost';
const BASEURL = process.env.BASEURL || "http://localhost:2000";

server.listen(
    PORT,
    function () {
        console.log(`You are now running on port ${PORT} \n Please visit ${BASEURL}`)      
    }
)