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
	if (newInsertInformation.insertedCount === 0)throw 'Insert failed!'
	return await this.getUserById(newInsertInformation.insertedId)
}

async function removeUser(id)
{
	const userCollection=await getUserCollectionF()
	const deletionInfo=await userCollection.removeOne({_id:id})
	if (deletionInfo.deletedCount === 0){
		throw `Could not delete user with id of ${id}`
	}
	return true
}

async function updateUser(id, updatedUser)
{
	const user=await this.getUserById(id)
	console.log(user)

	let userUpdateInfo={
		firstName:updatedUser.firstName,
		lastName:updatedUser.lastName
	}

	const userCollection=await getUserCollectionF()
	const updateInfo=await userCollection.updateOne(
		{_id:id} ,
		{$set:userUpdateInfo}
	)
	if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
		throw 'Update failed'

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

	if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
		throw 'Update failed'

	return await this.getUserById(userId)
}

async function removePostFromUser(userId, postId)
{
	let currentUser=await this.getUserById(userId)
	console.log(currentUser)

	const userCollection=await getUserCollectionF()
	const updateInfo=await userCollection.updateOne(
		{_id:userId},
		{$pull:{posts:{id:postId}}}
	)
	if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
		throw 'Update failed'

	return await this.getUserById(userId)
} 

async function getUserById(id)
{
	const userCollection=await getUserCollectionF()
	const user=await userCollection.findOne({_id:id})
	if (!user)throw 'User not found'
	return user
}

async function getAllUsers()
{
	const userCollection=await getUserCollectionF()
	const userList=await userCollection.find().toArray()
	if (!userList)throw 'No getUserCollectionF in system!'
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
