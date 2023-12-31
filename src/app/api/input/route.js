import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/lib/mongodb";

import { connectMongoDB } from "@/lib/mongodb";
import { File } from "@/models/File";
import { User } from "@/models/User";
import { Folder } from "@/models/Folder"

import { env } from "node:process";

import { promises as fis } from 'fs'; // To save the file temporarily

import fs from 'fs' ;

import axios from "axios";

import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename

import PDFParser from 'pdf2json'; // To parse the pdf
import { json } from "stream/consumers";

// import { Configuration, OpenAIApi } from "openai-edge";
// const txtToJSON = require("txt-file-to-json");
// const fs = require('fs/promises');

const WordExtractor = require("word-extractor"); 

// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');

const request = require('request');

const async = require('async');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;


const endpoint = "https://lotusocr.cognitiveservices.azure.com/vision/v3.0/ocr"

const key = "f82c7d146b9b441a94949b1044d84b85"

export async function POST(req) {
    const data = await req.formData()
    const userAffiliation = data.get('userAffiliation')
    const courseID = data.get('courseID')
    const folderID = data.get('folderID')
    let uploadedFile = data.get('file')
    const ogfilename = uploadedFile.name
//   const { userAffiliation, courseID, folderID } = formData.getBody();

  let fileName = '';
  let parsedText = '';
  let globalNewFile;

  await connectMongoDB();

  if (uploadedFile) {
    console.log('Uploaded file:', uploadedFile);

    // Check if uploadedFile is of type File
    if(uploadedFile.type == 'image/jpeg' || uploadedFile.type == 'image/png'){
        globalNewFile = await computerVision(uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText)
    }
    else if(uploadedFile.type == 'audio/mpeg'){
        globalNewFile = await parseAudio(uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText)
    } 
    else if(uploadedFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || uploadedFile.type == "application/msword"){
        globalNewFile = await parseDoc(uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText);
      }
     else if(uploadedFile.type == 'text/plain'){
        globalNewFile = await parseText(uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText);
    } else if (uploadedFile.type == 'application/pdf') {
        globalNewFile = await parsePdf(uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText);
    } else {
      console.log('Uploaded file is not in the expected format.');
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
    );
    }
  } else {
    console.log('No files found.');
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
  );
  }


try{

  console.log("Global New File: " + globalNewFile)

    return NextResponse.json(
      { data: globalNewFile },
      { status: 201 }
    );
    } catch (error) {
    return NextResponse.json(
        { message: error.message },
        { status: 500 }
    );
    }
}


const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/octet-stream' } }), endpoint);
/**
 * END - Authenticate
 */

const computerVision = (uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText) => {

    return new Promise(async (resolve, reject) => {

      /**
       * OCR: READ PRINTED & HANDWRITTEN TEXT WITH THE READ API
       * Extracts text from images using OCR (optical character recognition).
       */

      // URL images containing printed and/or handwritten text. 
      // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).

      // Generate a unique filename
      fileName = uuidv4();

      // Convert the uploaded file into a temporary file
      const tempFilePath = `/tmp/${fileName}.png`;

      // Convert ArrayBuffer to Buffer
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      await fis.writeFile(tempFilePath, fileBuffer);

      // var options = {
      //   url: endpoint,
      //   qs: {
      //   visualFeatures: 'Categories', 
      //   details: '', 
      //   language: 'en'
      // },
      // headers: {
      //   'Content-Type': 'application/octet-stream',
      //   'Ocp-Apim-Subscription-Key': key
      //   },
      //   body: fs.readFileSync(tempFilePath)
      // };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': key
          },
          qs: {
              visualFeatures: 'Categories', 
              details: '', 
              language: 'en'
            },
        body: fs.readFileSync(tempFilePath)
      });

      const resp = await res.json();

      console.log(resp)

      for(let i = 0; i < resp.regions.length; i++){
        let region = resp.regions[i]
        for(let j = 0; j < region.lines.length; j++){
          let line = region.lines[j]
          for(let k = 0; k < line.words.length; k++){
            parsedText += line.words[k].text + " "
          }
        }
      }

      console.log(parsedText)
      // request.post(options, function (error, response, body) {
      //   // console.log(body);
      //   res = body;
      // })
      try{
        const newFile = await File.create({
          title: ogfilename,
          userAffiliation: userAffiliation,
          folderAffiliation: folderID,
          content: parsedText,
        });
  
  
        await Folder.findByIdAndUpdate(folderID, {
          $push: {
            files:
              newFile._id
          },
        });
  
        resolve(newFile)
  
        return NextResponse.json(
          { data: newFile },
          { status: 201 }
        );
      }
      catch (err) {
        console.log(err);
        reject(err);
      }
  });
}

const parseAudio = (uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${env.key}`,
        'Content-Type': 'multipart/form-data'
      },
    };

    // Generate a unique filename
    fileName = uuidv4();

    // Convert the uploaded file into a temporary file
    const tempFilePath = `/tmp/${fileName}.mp3`;

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Save the buffer as a file
    await fis.writeFile(tempFilePath, fileBuffer);

    const form1 = new FormData();
    form1.append("file", uploadedFile);
    form1.append('model', 'whisper-1');


    const res = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      form1,
      config
    ).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  

    const data = await res.data;
    console.log(data)
    //  as ResponseTypes["createImage"]

    parsedText = data.text;
    
    try{
      const newFile = await File.create({
        title: ogfilename,
        userAffiliation: userAffiliation,
        folderAffiliation: folderID,
        content: parsedText,
      });


      await Folder.findByIdAndUpdate(folderID, {
        $push: {
          files:
            newFile._id
        },
      });

      resolve(newFile)

      return NextResponse.json(
        { data: newFile },
        { status: 201 }
      );
    }
    catch (err) {
      console.log(err);
      reject(err);
    }
  });
}


const parseDoc = (uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText) => {
  return new Promise(async (resolve, reject) => {
    // Generate a unique filename
    fileName = uuidv4();

    // Convert the uploaded file into a temporary file
    let tempFilePath = `/tmp/${fileName}.docx`;

    if(uploadedFile.type == 'application/msword'){
      tempFilePath = `/tmp/${fileName}.doc`;
    }

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Save the buffer as a file
    fis.writeFile(tempFilePath, fileBuffer, (err) => { 
      if (err) 
        console.log(err); 
      else { 
        console.log("File written successfully\n"); 
        console.log("The written has the following contents:"); 
      } });


    const extractor = new WordExtractor();
    const extracted = await extractor.extract(tempFilePath);
    console.log(extracted)
    parsedText = extracted.getBody()
    console.log(parsedText)
    try{
      const newFile = await File.create({
        title: ogfilename,
        userAffiliation: userAffiliation,
        folderAffiliation: folderID,
        content: parsedText,
      });


      await Folder.findByIdAndUpdate(folderID, {
        $push: {
          files:
            newFile._id
        },
      });

      resolve(newFile)

      return NextResponse.json(
        { data: newFile },
        { status: 201 }
      );
    }
    catch (err) {
      console.log(err);
      reject(err);
    }
  });
}


const parseText = (uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText) => {
  return new Promise(async (resolve, reject) => {
    // Generate a unique filename
    fileName = uuidv4();

    // Convert the uploaded file into a temporary file
    const tempFilePath = `/tmp/${fileName}.txt`;

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Save the buffer as a file
    await fis.writeFile(tempFilePath, fileBuffer);
    
    try {
      const data = await fis.readFile(tempFilePath, { encoding: 'utf8' });
      parsedText = data;

      const newFile = await File.create({
        title: ogfilename,
        userAffiliation: userAffiliation,
        folderAffiliation: folderID,
        content: parsedText,
      });


      await Folder.findByIdAndUpdate(folderID, {
        $push: {
          files:
            newFile._id
        },
      });

      resolve(newFile)

      return NextResponse.json(
        { data: newFile },
        { status: 201 }
      );
    }
    catch (err) {
      console.log(err);
      reject(err);
    }
  });
}




const parsePdf = (uploadedFile, folderID, fileName, ogfilename, userAffiliation, parsedText) => {
  return new Promise(async (resolve, reject) => {
    // Generate a unique filename
    fileName = uuidv4();

    // Convert the uploaded file into a temporary file
    const tempFilePath = `/tmp/${fileName}.pdf`;

    // Convert ArrayBuffer to Buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Save the buffer as a file
    await fis.writeFile(tempFilePath, fileBuffer);

    // Parse the pdf using pdf2json. See pdf2json docs for more info.

    // The reason I am bypassing type checks is because
    // the default type definitions for pdf2json in the npm install
    // do not allow for any constructor arguments.
    // You can either modify the type definitions or bypass the type checks.
    // I chose to bypass the type checks.
    const pdfParser = new (PDFParser)(null, 1);

    // See pdf2json docs for more info on how the below works.
    pdfParser.on('pdfParser_dataError', (errData) => {
      console.log(errData.parserError);
      reject(errData.parserError);
    });
    pdfParser.on('pdfParser_dataReady', async () => {
      // console.log((pdfParser).getRawTextContent());
      parsedText = (pdfParser).getRawTextContent();
      // console.log(parsedText);

      const newFile = await File.create({
        title: ogfilename,
        userAffiliation: userAffiliation,
        folderAffiliation: folderID,
        content: parsedText,
      });

      await Folder.findByIdAndUpdate(folderID, {
        $push: {
          files:
            newFile._id
        },
      });

      resolve(newFile);
    });

    await pdfParser.loadPDF(tempFilePath);
  });
}





export async function DELETE(req) {
  try {
      const { files, folderID } = await req.json();

      console.log(files)
      console.log(folderID)
  
      await connectMongoDB();

      const folder = await Folder.findById(folderID)

      let updatedFiles = folder.files

      // Deleting all the file documents pertaining to this folder
      for(let i = 0; i < files.length; i++){
        updatedFiles = updatedFiles.filter((file) => (file != files[i].fileID))
      }

      await Folder.findByIdAndUpdate(folderID, {files: updatedFiles})

      for(let i = 0; i < files.length; i++){
        await File.findByIdAndDelete(files[i].fileID)
      }
  
      return NextResponse.json(
        { message: "Files have been deleted" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        // { status: 500 }
      );
    }
} 