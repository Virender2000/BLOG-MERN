// creating a Schema for post info

const mongoose = require ('mongoose');
const {Schema,model}=mongoose;

const postSchema= new Schema(
    {
        title:String,
        summary: String,
        content: String,
        cover: String,
        username:String,
        author:{type:Schema.Types.ObjectId, ref:'User'},
    },{
        timestamps:true,
        // this will store the timestamp of the post when it is created
    }
);

const PostModel=model('Post',postSchema);
module.exports=PostModel;