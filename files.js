//read files
const fs = require('fs')
fs.readFile('./blog1.txt' , (err,data)=> 
{
    if(err) 
    {
        console.log(err); 
    }
    console.log(data.toString()); 

})
console.log('last line')
//write files
fs.writeFile('./blog1.txt','hello world', ()=>{
    console.log("text has been editted ")
    
}
 )

//directories
if(!fs.existsSync('./assets'))
{
fs.mkdir('./assets' , (err)=>{
 if(err) 
 {
    console.log(err);
 }
 console.log('folder created');

})
}
else
{
    fs.rmdir('./assets' , (err)=>
    {
        if (err) 
        {
            console.log(err);
        }
    
    }
    )
}
//delete files 
if (fs.existsSync('./delete.txt'))  
{
    fs.unlink('./delete.txt',(err)=>
    {
        if (err) {
            console.log(err)   
        }
        console.log('file deleted')

    })
}