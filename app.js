const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');
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


//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res)=>{
//      const blog = new Blog({
//         title:'new blog',
//         snippet:'about my new blog',
//         body:'more about my new blog '
//      });
//      blog.save()
//          .then((result)=>{
//             res.send(result)
//          })
//          .catch((err)=>{
//             console.log(err);
//          })
// });
// app.get('/all-blogs',(req,res)=>
// {
//     Blog.find()
//     .then((result)=>
//    {
//     res.send(result);
//    } )
//    .catch((err)=>{
//     console.log(err);
//    })
// })
// app.get('/single-blog',(req,res)=>
// {
//     Blog.findById('64b62ddaeeeb2b5d8b9bac07')
//       .then((result)=>
//       {
//         res.send(result)
//       })
//       .catch((err)=>{
//         console.log(err);
//        })

// }
// )




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
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
          res.render('index', {title:'all blogs',blogs:result})


    })
    .catch((err)=>{
        console.log(err);
    })
})
app.post('/blogs',(req,res)=>{
    const blog= new Blog(req.body);

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })

})
app.get('/blogs/create',(req,res)=>
{
    res.render('create', {title:'create'});
})

// 404 
app.use((req,res)=> 
{
    res.status(404).render('404',{title:'page not found '})
})
