const guys = [];
const crypto = require('crypto');
const mergeImages = require('merge-images');
const Canvas = require('canvas');
const fs = require("fs")

const dnaLength = 10;
const dnaModulus = 10 ** dnaLength
var counting = 1;
for(var i = 0; i < 10; i++) {
  const hash = crypto.createHash('sha256').update(Math.random().toString()).digest('hex')
  
  const DNA = parseInt(hash,16) % dnaModulus;
  const DNAString = DNA.toString()
  guys.push(DNA);
  
  const guy = {
    body: parseInt(DNAString.slice(0,2)) % 2 + 1,
    eye: parseInt(DNAString.slice(2,4)) % 3 +1 ,
    hair: parseInt(DNAString.slice(4,6)) % 4 + 1,
    mouth: parseInt(DNAString.slice(6,8)) % 3 + 1,
    nose: parseInt(DNAString.slice(8,10)) % 3 + 1
  }
  
  mergeImages([
    'base/head.png',
    `base/body/${guy.body}.png`,
    `base/eye/${guy.eye}.png`,
    `base/hair/${guy.hair}.png`,
    `base/mouth/${guy.mouth}.png`,
    `base/nose/${guy.nose}.png`
  ],{
    Canvas: Canvas.Canvas,
    Image: Canvas.Image
  }).then((base64) => {
    fs.writeFile(`output/${counting++}.png`, base64.replace(/^data:image\/png;base64,/, ""), 'base64', function(err) {
      console.log(err);
    });
    
}).catch(err => console.log(err)) ;
}