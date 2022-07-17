const MongoClient=require('mongodb').MongoClient

const config=
{
    "url":'mongodb://localhost:27017/',
    "dbName":'bdb'
}
const url=config.url
const dbName=config.dbName

let _connection=undefined
let _db=undefined

async function f()
{
    if (!_connection)
    {
        _connection=await MongoClient.connect
	(
		url,
		{useNewUrlParser:true,useUnifiedTopology:true}
	)
        _db=await _connection.db(dbName)
    }

    return _db
}

module.exports=f