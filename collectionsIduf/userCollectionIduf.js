const uuid=require('uuid/v4')

const collections=require('../config/collections')
const getUserCollectionF=collections.getUserCollectionF

async function addUser(firstName, lastName)
{
	const userCollection=await getUserCollectionF()

	let newUser={
		_id:uuid(),
		firstName:firstName,
		lastName:lastName,
		posts:[]
	}

	const newInsertInformation=await userCollection.insertOne(newUser)
	return await this.getUserById(newInsertInformation.insertedId)
}

async function removeUser(id)
{
	const userCollection=await getUserCollectionF()
	const deletionInfo=await userCollection.removeOne({_id:id})
	return true
}

async function updateUser(id, updatedUser)
{

	const userCollection=await getUserCollectionF()
	const updateInfo=await userCollection.updateOne(
		{_id:id} ,
		{$set:updatedUser}
	)
	return await this.getUserById(id)
}

async function addPostToUser(userId, postId, postTitle)
{
	let currentUser=await this.getUserById(userId)
	console.log(currentUser)
	
	const userCollection=await getUserCollectionF()
	const updateInfo=await userCollection.updateOne(
		{_id:userId},
		{$addToSet:{posts:{id:postId, title:postTitle}}}
	)
	return await this.getUserById(userId)
}

async function removePostFromUser(userId, postId)
{
	const userCollection=await getUserCollectionF()
	const updateInfo=await userCollection.updateOne(
		{_id:userId},
		{$pull:{posts:{id:postId}}}
	)
	return await this.getUserById(userId)
} 

async function getUserById(id)
{
	const userCollection=await getUserCollectionF()
	const user=await userCollection.findOne({_id:id})
	return user
}

async function getAllUsers()
{
	const userCollection=await getUserCollectionF()
	const userList=await userCollection.find().toArray()
	return userList
}

module.exports=
{
	addUser,
	removeUser,
	updateUser,
	addPostToUser,
	removePostFromUser,
	getUserById,
	getAllUsers
}
