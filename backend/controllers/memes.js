const Meme = require("../models/meme.js");

// Function to get all the memes
const getMemes = async (req,res)=>{
      try{
            const memes = await Meme.find();
            //console.log("Memes");
            //console.log(memes);
            res.status(200).json(memes);
      }catch(error){
            res.status(404).json({message:error.message});
      }
}

// Function to get the meme by given ID
const getMemeById = async (req,res,id)=>{
      //Checking if the id provided matches the ObjectID
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
            try{
                  //Finding the Meme collection using findOne method
                  const meme = await Meme.findOne({_id:id});
                  res.status(200).json(meme);
            }catch(error){
                  res.status(404).json({message:error.message});
            }
      }else{
            res.status(404).json({invalid_id:"Meme with ID not found, please provide a valid ID"}); 
      }
}

// Function to post a new meme
const postMeme = async (req,res)=>{
      const meme = req.body;
      const newMeme = new Meme({
            name: meme.name,
            caption: meme.caption,
            url: meme.url,
      });
      //console.log(meme);
      try{
            //Handling Duplicate requests
            const memeByCaption = await Meme.findOne({caption:newMeme.caption});

            //Check if a document is found with the new posted caption
            if(!memeByCaption)      
            {
                  try{
                        const memeByURL = await Meme.findOne({url:newMeme.url});
                        //Check if a document is found with the new posted url, if not found create one.
                        if(!memeByURL)
                        {
                              try{
                                    await newMeme.save();
                                    res.status(201).json({id:newMeme._id});
                              }catch(error){
                                    res.status(404).json({message:error.message});
                              }
                        }else{
                              res.status(409).json({DupliacteRequest:"Meme with same URL already exists"});
                        }
                  }
                  catch(error){
                        res.status(404).json({message:error.message});
                  }
            }
            else{
                  res.status(409).json({DupliacteRequest:"Meme with same Caption already exists"});
            }
      }catch(error){
            res.status(404).json({message:error.message});
      }
}

// Function to update the meme by given ID
const updateMeme = async(req,res,memeId) => {
      const meme = req.body;
      console.log("Update Meme is ",meme);
      //console.log(memeId);
      // If ID doesn't match ObjectID, then return invalid Id
      if (memeId.match(/^[0-9a-fA-F]{24}$/)) {
            try{
                  //Finding the Meme collection using findOne method
                  const foundMeme = await Meme.findOne({_id:memeId});
                  if(foundMeme)
                  {
                        let memeCaption = foundMeme.caption;
                        let memeUrl = foundMeme.url;
      
                        //Check if caption/url is empty, if empty, fill with current document value
                        if ('caption' in meme && meme.caption !== "")
                        {
                              memeCaption = meme.caption;
                        }
                        if ('url' in meme && meme.url !== "")
                        {
                              memeUrl = meme.url;
                        }
                        console.log(memeCaption,memeUrl);
                        // Update the document with new caption/url
                        try{
                              foundMeme.caption = memeCaption;
                              foundMeme.url = memeUrl;
                              await foundMeme.save();
                              res.status(201).json({id:foundMeme._id});
                        }catch(error){
                              res.status(404).json({message:error.message});
                        }
                  }else{
                        res.status(400).json({InvalidID:"Meme with the ID doesn't exist"});
                  }
            }catch(error){
                  res.status(404).json({message:error.message});
            }
      }else{
            res.status(404).json({invalid_id:"Meme with ID not found, please provide a valid ID"}); 
      }
}

module.exports = {getMemes, getMemeById, postMeme, updateMeme};