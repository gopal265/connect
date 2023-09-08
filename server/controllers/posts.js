import Post from "../models/posts.js";
import User from "../models/users.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, image } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userName : user.userName,
      location: user.location,
      description,
      picture: user.picture,
      image,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json(error);
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({userId:id});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
   
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const commentPost = async (req,res) =>{
   try {
    const {id} = req.params
    const {userId,commentText} = req.body
 
    const post = await Post.findById(id)
    const user = await User.findById(userId)
    post.comments.push({text:commentText,user:user})
    await post.save()
    
    res.status(200).json(post)

   } catch (error) {
    res.status(500).json(error)
   }
}
