const express=require('express');
const router=express.Router();
const Blog=require('../models/blog');
const mongoose=require('mongoose');
router.post('/', (req, res) => {
    const blog= new Blog(req.body);
  
    blog.save()
    .then(result=>
      {
          res.redirect('/blogs');
      })
      .catch((err)=>
      {
          console.log(err);
      })
  
    });
    router.get('/create',(req,res)=>
  {
      res.render('create', {title:'create blog'});
  })
    
  router.get('/:id', (req, res) => {
      const id = req.params.id;
    
      // Check if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('404', { title: 'Page Not Found' });
      }
    
      Blog.findById(id)
        .then((result) => {
          if (result) {
            res.render('details', { blog: result, title: 'Blog Details' });
          } else {
            res.status(404).render('404', { title: 'Blog Not Found' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).render('error', { title: 'Internal Server Error' });
        });
    });
    router.get('/',(req,res)=>{
      Blog.find().sort({createdAt:-1})
      .then((result)=>{
            res.render('index', {title:'all blogs',blogs:result})
  
  
      })
      .catch((err)=>{
          console.log(err);
      })
  })
    
  router.delete('/blogs/:id',(req,res)=>{
      const id=req.params.id;
      Blog.findByIdAndDelete(id)
      .then((result)=>{
          res.json({redirect:'/blogs'})
      })
      .catch(err=>{console.log(err);});
  })
  module.exports=router;
  