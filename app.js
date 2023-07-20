const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');

const blogRoutes=require('./routes/blogRoute');
// express app
const app = express();
// connect to mongo db
const dbURI='mongodb+srv://netninja:keshavj123@cluster0.rzy4mze.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
  .then((result) =>app.listen(3000))
  .catch((error) => console.log('error connecting to mongoose'))
// register view engine 
app.set('view engine','ejs')

// listen for requests 

// middleware and static files 

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));






app.get('/', (req,res)=> 
{
   res.redirect('/blogs');

});
app.get('/about', (req,res)=> 
{
     res.render('about',{title:'about'});

});


// redirects
app.get('/about-us',(req,res)=>
{
    res.redirect('/about', {title:'about'});
});
// blog routes 
app.use(blogRoutes());




// 404 
app.use((req,res)=> 
{
    res.status(404).render('404',{title:'page not found '})
})
