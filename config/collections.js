const connection=require('./connection')

function getCollection(collectionName)
{
	let _collection=undefined
	
	async function f()
	{
		if (!_collection)
		{
			const db=await connection()
			_collection=await db.collection(collectionName)
		}
		return _collection
	}
	return f
}

module.exports=
{
    getUserCollectionF:getCollection('useCollection'),
    getPostCollectionF:getCollection('postCollection' )
}
