require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = require('./swagger.js');
const {getMemes, postMeme, getMemeById, updateMeme} = require("./controllers/memes.js")

const app = express();
const swaggerApp = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()); 

// Use cors to allow cross-origin-requests
app.use(cors());
swaggerApp.use(cors());

// Use swagger doc and add the UI
const swaggerDocs = swaggerJSDoc(swaggerOptions);
swaggerApp.use("/swagger-ui",swaggerUI.serve,swaggerUI.setup(swaggerDocs));


/**
 * @swagger
 * definitions:
 *  Meme:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: Name of the meme creator
 *     example: 'Ashok Kumar'
 *    caption:
 *     type: string
 *     description: Caption of the meme
 *     example: 'This is a meme'
 *    url:
 *     type: string
 *     description: URL of the meme
 *     example: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg'
 *  UpdateMeme:
 *   type: object
 *   properties:
 *    caption:
 *     type: string
 *     description: Caption of the meme
 *     example: 'Cool Caption'
 *    url:
 *     type: string
 *     description: URL of the meme
 *     example: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg'
 */


/**
* @swagger
* /memes:
*    get:
*      summary: Returns a list of memes.
*      description: List all the memes
*      responses:
*        '200':
*          description: A JSON array of memes
*          content:
*            application/json:
*              schema: 
*                type: array
*                items: 
*                  type: string
*        '404':
*          description: Bad Request
*   
*/


app.get("/memes",function(req,res){
      getMemes(req,res);
});

/**
 * @swagger
 * /memes/{id}:
 *  get:
 *   summary: Returns a meme matching the ID
 *   description: Provide the id to get the meme
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the meme
 *      example: 601d775af1d69b008869811c
 *   responses:
 *    200:
 *     description: Success
 *    404:
 *     description: Failed
 */

app.get("/memes/:id",function(req,res){
      getMemeById(req,res,req.params.id);
});

/**
* @swagger
* /memes:
*  post:
*   summary: create a meme
*   description: create a meme for the page
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/definitions/Meme'
*   responses:
*    201:
*     description: Meme created succesfully
*    404:
*     description: Failure in creating meme
*    409:
*     description: Duplicate Request
*/


app.post("/memes",function(req,res){
      postMeme(req,res);
});

/**
* @swagger
* /memes/{id}:
*  patch:
*   summary: Update the meme matching the ID
*   description: Provide the id, updated caption/url the update the meme
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*       required: true
*       description: id of the meme
*       example: 6022573442210e5038424951
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/definitions/UpdateMeme'
*   responses:
*    201:
*     description: Meme updated succesfully
*    400:
*     description: Meme with ID doesn't exist
*    404:
*     description: Internal server error
*/

app.patch("/memes/:id",function(req,res){
      updateMeme(req,res,req.params.id);
});


//Run the swagger at port 8080
const SWAGGER_PORT = process.env.port2 || 8080;

swaggerApp.listen(SWAGGER_PORT,()=> console.log("Swagger running on port "+SWAGGER_PORT));

//Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8081;
}

//Run the server on port
app.listen(port, function() {
      console.log("Server started on port "+port);
});
