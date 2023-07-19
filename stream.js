const fs=require("fs");

const readstream=fs.createReadStream('./blog3.txt', {encoding:'utf8'});
const writeStream=fs.createWriteStream('./blog.txt')
// readstream.on('data',(chunk)=>{
//     console.log('-----New chunk------ ')
//     console.log(chunk.toString())
//     writeStream('\n new chunk \n')
//     writeStream.write(chunk)
// })


// piping 
readstream.pipe(writeStream)