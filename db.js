
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://parth:shark13@ds231315.mlab.com:31315/popcorn';
const dbName = 'popcorn';
const ObjectId = require('mongodb').ObjectID;
module.exports = {
  get: async (collectionName,query,select) => {
    let db, client ,result;
    try {
 
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
      return await db.collection(collectionName).find(query,  { projection: select }).toArray();
      
    }  catch (err) {
    console.log(err.stack);
  }
    finally {
      client.close();
    }
  },
    getNextPost: async (collectionName,select,id) => {
    let db, client ,result;
    try {
	//console.log('Finding next post of--'+id);
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
	  //console.log(collectionName,select);
      return await db.collection(collectionName).find({_id: {$gt: ObjectId(id)}},  { projection: select }).sort({_id: 1 }).limit(1).toArray();
      
    }  catch (err) {
    console.log(err.stack);
  }
    finally {
      client.close();
    }
  },
      getPreviousPost: async (collectionName,select,id) => {
    let db, client ,result;
    try {
 
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
	 // console.log(collectionName,select);
      return await db.collection(collectionName).find({_id: {$lt: ObjectId(id)}},  { projection: select }).sort({_id: 1 }).limit(1).toArray();
      
    }  catch (err) {
    console.log(err.stack);
  }
    finally {
      client.close();
    }
  },
    post: async (collectionName,data) => {
    let db, client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
      return await db.collection(collectionName).insertOne(data);
    } 
     catch (err) {
    console.log(err.stack);
  }
  finally {
      client.close();
    }
  },
    postMany: async (collectionName,data) => {
    let db, client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
      return await db.collection(collectionName).insertMany(data);
    } 
     catch (err) {
    console.log(err.stack);
  }
  finally {
      client.close();
    }
  },
    putOne: async (collectionName,query,data) => {
    let db, client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
      return await db.collection(collectionName).updateOne(query,data);
    }
     catch (err) {
    console.log(err.stack);
  }
   finally {
      client.close();
    }
  },
    deleteOne: async (collectionName,query) => {
    let db, client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      db = client.db(dbName);
      return await db.collection(collectionName).deleteOne(query);
    }
     catch (err) {
    console.log(err.stack);
  }
   finally {
      client.close();
    }
  }
}