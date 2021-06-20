const express=require('express');

const router=express.Router();

const post_api=require('../../../controllers/api/v1/posts_api');


router.get('/', post_api.index);

router.get('/delete/:id',post_api.delete_post);


module.exports=router;