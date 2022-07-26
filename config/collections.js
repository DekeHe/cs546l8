const connection=require('./connection')

function getCollection(collectionName)
{
	async function f()
	{
		let _collection=undefined
		const db=await connection()
		_collection=await db.collection(collectionName)
		return _collection
	}
	return f
}

module.exports=
{
    getUserCollectionF:getCollection('useCollection'),
    getPostCollectionF:getCollection('postCollection' )
}
