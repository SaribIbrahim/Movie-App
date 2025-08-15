import { Client, Databases, ID, Query } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client=new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // pointing to appwrite servers
.setProject(PROJECT_ID)

const database=new Databases(client)


export const updateSearchCount= async (searchTerm,movie)=>{
// 1. Use Appwrite SDK to check if search term exists in db
try{
 const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.equal('searchTerm',searchTerm)]) // to check if searchTerm exists in this proj_id and collection_id and store it in result

 // 2. If it exists, update the search count
 if(result.documents.length>0){
    const doc=result.documents[0] // get the first document
    await database.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id,{count: doc.count + 1})
 }
 // 3. If it doesn't exist, create a new document with search term and count = 1
 else{
    await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
        searchTerm,
        count:1,
        movie_id:movie.id,
        poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    })
 }

}
catch(error){
    console.log(error);
}


}

export const getTrendingMovies=async()=>{
    try{
        const result= await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5), // limit to 5 movies
            Query.orderDesc('count') // order by count in descending order
        ])
        return result.documents
    }
    catch(error){
        console.log(error);
        
    }
}