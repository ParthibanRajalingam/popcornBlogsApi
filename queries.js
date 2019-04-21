const queries = 
{
	"getAllPosts":[
	{
		"collection" : "posts",
		"find": {},
		"select": {uniqueBlogName:1,imageSrc:1,postedDate:1,title:1,intro:1,quoteBy:1,tags:1,mostFeaturedPost:1,featuredPost:1,likes:1,comments:1,postType:1,videoLink:1,audioLink:1}
	}
	],
	"getDetailedPost":[
	{
		"collection" : "posts",
		"find": {},
		"select": {}
	}
	],
		"getFeaturedPosts":[
	{
		"collection" : "posts",
		// Count od most featured post should always be one, and featured post should be two
		"find": {"$or": [{
			        "mostFeaturedPost": 'yes'
			   			 }, {
			        "featuredPost": "yes"
			   				 }]},
		"select": {uniqueBlogName:1,imageSrc:1,postedDate:1,title:1,intro:1,quoteBy:1,tags:1,mostFeaturedPost:1,featuredPost:1,likes:1,postType:1,videoLink:1,audioLink:1,authorName:1,authorImage:1,categories:1}
	}
	],
	"getPopularPosts":[
	{
		"collection" : "posts",
		// Count od most featured post should always be one, and featured post should be two
		"find": {likes: {$gt: 20}},
		"select": {uniqueBlogName:1,imageSrc:1,postedDate:1,title:1,intro:1,quoteBy:1,tags:1,mostFeaturedPost:1,featuredPost:1,likes:1,comments:1,postType:1,videoLink:1,audioLink:1}
	}
	],
	"getCategories":[
	{
		"collection" : "category",
		// Count od most featured post should always be one, and featured post should be two
		"find": {},
		"select": {"_id" : 0}
	}
	],
		"postBlog":[
	{
		"collection" : "posts",
		"find": {},
		"select": {}
	}
	],
	"getNextPost":[
	{
		"collection" : "posts",
		// Count od most featured post should always be one, and featured post should be two
		"select": {title:1}
	}
	],
	"getpreviousPost":[
	{
		"collection" : "posts",
		// Count od most featured post should always be one, and featured post should be two
		"select": {title:1}
	}
	],
		"putComments":[
	{
		"collection" : "posts",
		"select": {title:1}
	}
	]
};

exports.queries = queries;