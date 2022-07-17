const dbConnection=require('../config/connection')
const collectionsIduf=require('../collectionsIduf')
const userCollectionIduf=collectionsIduf.userCollectionIduf
const postCollectionIduf=collectionsIduf.postCollectionIduf

async function main()
{
    const db=await dbConnection()

    await db.dropDatabase()

    const patrick=await userCollectionIduf.addUser('Patrick','Hill')
    const id=patrick._id

    await postCollectionIduf.addPost('Hello,class!','Today we are creating a blog!',['basketball','soccer'],id)

    await postCollectionIduf.addPost
	(
        'Using the seed',
        'We use the seed to have some initial data so we can just focus on servers this week',
        ['basketball','soccer'],
        id
    )
    await postCollectionIduf.addPost
	(
        'Using routes',
        'The purpose of today is to simply look at some GET routes',
        ['basketball','soccer'],
        id
    )

    const aiden=await userCollectionIduf.addUser('Aiden','Hill')
    await postCollectionIduf.addPost
	(
        "Aiden's First Post",
        "I'm 6 months old,I can't blog1",
        ['playing','singing'],
        aiden._id
    )

    await postCollectionIduf.addPost
	(
        "Aiden's Second Post",
        "I'm still 6 months old,I told you already,I can't blog1",
        ['playing','singing'],
        aiden._id
    )
    console.log('Done seeding database')
    await db.serverConfig.close()
}

main()
	.catch
	(
		function(error) 
		{
			console.error(error)
			
			let a=
			dbConnection()
				.then
				(
					function(db) 
					{
						return db.serverConfig.close()
					}
				)
			return a
		}
	)
	// })
