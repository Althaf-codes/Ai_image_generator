const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  
});
const openai = new OpenAIApi(configuration);
const fs = require('fs');

const { Client } = require('craiyon');

const craiyon = new Client();


const generateFreeImage =async(req,res)=>{
  const {text,size} = req.body;

  try {
    const result = await craiyon.generate({
      prompt:text,
      // 'Painting of a dachshund drinking water in the style of Van Gogh',
      maxRetries: 5,
    });

   
    console.log(`the result is ${result.images}`);

    res.status(200).json({success:true,data:result});


  } catch (error) {
    res.status(400).json({success:false,error:`the err is ${error}`});
  }

}

const generateImage =async(req,res)=>{

    const {text,size} = req.body;
    const ImgSize = size=='small'? '256x256' :size =='medium'?'512x512':'1024x1024'
    try {
        const response = await openai.createImage({
            prompt:text,
            n: 2,
            size: ImgSize,
          });


          const imageUrl = response.data.data;

          console.log(`the imgurl is ${imageUrl}`);

        res.status(200).json({success:true,data:imageUrl});
        
    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({success:false,error:`the err is ${error}`});
    }
}


const editImage= async(req,res)=>{ 
    const {text,size,img} = req.body;
    const ImgSize = size=='small'? '256x256' :size =='medium'?'512x512':'1024x1024'
    try {
        
        const response = await openai.createImageEdit(
            fs.createReadStream("./testImages/newImg_resize.png"),  
            // fs.createReadStream("./testImages/myImg3.png"),  

            "Change the background a dark night with a moon ",
           
           ImgSize
          );
        const imageUrl = response.data.data;
        console.log(`the imgurl is ${imageUrl}`);

        res.status(200).json({success:true,data:imageUrl});




    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({success:false,error:`the err is ${error}`});
    }
}

const createImageVariation = async(req,res)=>{
    const {text,size,img} = req.body;
    const ImgSize = size=='small'? '256x256' :size =='medium'?'512x512':'1024x1024'
    try {
        const response = await openai.createImageVariation(
            fs.createReadStream("./testImages/myImg3.png"),
            2,
            ImgSize
            
          );


          const imageUrl = response.data.data;
          console.log(`the imgurl is ${imageUrl}`);
  
          res.status(200).json({success:true,data:imageUrl});
  
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({success:false,error:`the err is ${error}`});
    }
}

module.exports = {generateImage,editImage,createImageVariation,generateFreeImage};