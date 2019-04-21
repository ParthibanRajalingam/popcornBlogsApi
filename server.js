const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const testData = require('./testData');
const db = require('./db');
const queries = require('./queries');
const app = express();
const port = process.env.PORT || 3000;
var fileName;


 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/images");
     },
     filename: function(req, file, callback) {
		 console.log(file);
		 fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
         callback(null, fileName);
     }
 });
 
 
 var upload = multer({
     storage: Storage
 }).array("file0", 3); //Field name and max count
 
 

 
 //Handle post Data body
 app.use(bodyParser());
//Used to serve image files
//http://localhost:3000/images/as.png
app.use(express.static('public'));

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

const query = queries.queries;
//console.log(query);

 const nextPost = async function(id){
	 let np= await db.getNextPost(query.getNextPost[0].collection,query.getNextPost[0].select,id);
	 if(np[0]){
		return np[0].title;	 
	 }
	 else{
		 return "noPosts";
	 }
	 
 };
 const previousPost =async function(id){
	 let pp= await db.getPreviousPost(query.getNextPost[0].collection,query.getNextPost[0].select,id);
	 	 if(pp[0]){
		return pp[0].title;	 
	 }
	 else{
		 return "noPosts";
	 }
 };

app.get('/', (req, res) => res.send('Hello World!'));
//app.get('/getAllPosts', (req, res) => res.send(JSON.stringify(testData.getAllPosts)));

app.get('/allPosts', async (req, res) => 

	{
		//console.log('getting....');
		let result = await db.get(query.getAllPosts[0].collection,query.getAllPosts[0].find,query.getAllPosts[0].select);
		//res.send(JSON.stringify(testData.getAllPosts));
		res.send(result);
	}
);

app.get('/detailedPost/:postUniqueName', async (req, res) => 

	{
		console.log('getting....'+ req.params.postUniqueName);
		let result = await db.get(query.getDetailedPost[0].collection,{uniqueBlogName: req.params.postUniqueName},query.getDetailedPost[0].select);
		//res.send(JSON.stringify(testData.getAllPosts));
		let nPost = await nextPost(result[0]._id);
		let pPost = await previousPost(result[0]._id);
		result[0].nextPost = nPost;
		result[0].previousPost = pPost;
		
		//console.log('Result of nPost--'+nPost);
		res.send(result);
	}
);

app.get('/featuredPosts', async (req, res) => 

	{
		let result = await db.get(query.getFeaturedPosts[0].collection,query.getFeaturedPosts[0].find,query.getFeaturedPosts[0].select);
		let mostFeaturedPost =[];
		let featuredPost = [];
		let responseResult =[];
		
		//res.send(JSON.stringify(testData.getAllPosts));
		 for (const post of result) {
			 if (post.mostFeaturedPost =='yes'){
				 post.categories = post.categories.splice(0,3);
			 mostFeaturedPost.push(post);
			 }
			 else{
				 post.categories = post.categories.splice(0,3);
			 featuredPost.push(post);
			 }
		 }
		 responseResult = [...mostFeaturedPost,...featuredPost];
		res.send(responseResult);
	}
);

app.get('/popularPosts', async (req, res) => 

	{
		let result = await db.get(query.getPopularPosts[0].collection,query.getPopularPosts[0].find,query.getPopularPosts[0].select);
		//res.send(JSON.stringify(testData.getAllPosts));
		res.send(result);
	}
);

app.get('/categories', async (req, res) => 

	{
		let result = await db.get(query.getCategories[0].collection,query.getCategories[0].find,query.getCategories[0].select);
		//res.send(JSON.stringify(testData.getAllPosts));
		res.send(result);
	}
);

 app.post("/blog", async (req, res) => 

	{
		const date = new Date();
		const formattedDate = date.toLocaleDateString('en-GB', {
		day: 'numeric', month: 'long', year: 'numeric'
		}).replace(/ /g, ' ');
		req.body['uniqueBlogName']=((req.body.title).replace(/\s/g,'')).replace(/[^a-zA-Z ]/g, "");
		req.body['postedDate'] = formattedDate;
		let result = await db.post(query.postBlog[0].collection,req.body);
		//res.send(JSON.stringify(testData.getAllPosts));
		res.send(result);
	}
	);


 app.post("/upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
			 console.log(err);
             return res.end("Something went wrong!");
         }
         return res.send({"url":"http://localhost:3000/images/"+fileName});
     });
 });

  app.put("/comments", async(req, res) => {
		let result = await db.putOne(query.putComments[0].collection,{'uniqueBlogName' : req.body.title },{ $set: {'comments': req.body.comments} });
		res.send(result);
 });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));