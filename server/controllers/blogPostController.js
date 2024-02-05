import Posts from "../models/blogPost.js";
import Order from "../models/order.js";
import User from "../models/User.js";
import Comments from "../models/blogComments.js";
import Views from "../models/blogViews.js";
import expressAsyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import BadRequestError from "../errors/bad-request.js";

export const stats = expressAsyncHandler(async (req, res) => {
  const orders = await Order.countDocuments();
  const users = await User.countDocuments();

  const totalPosts = await Posts.countDocuments();

  res.send({ users, orders, totalPosts });
});

export const getPosts = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    const queryObject = {};

    if (category && category !== "") {
      queryObject.category = category;
    }
    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }

    let queryResult = Posts.find(queryObject)
      .populate({
        path: "author",
        select: "name email isAdmin",
      })
      .sort({ createdAt: -1 })
      .limit(20);
    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    //records count
    const totalPost = await Posts.countDocuments(queryResult);

    const numOfPage = Math.ceil(totalPost / limit);

    queryResult = queryResult.skip(skip).limit(limit);

    const posts = await queryResult;

    res.status(200).json({
      success: true,
      message: "Content Loaded successfully",
      totalPost,
      posts: posts,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    // const { userId } = req.user
    const { postId } = req.params;

    const post = await Posts.findById(postId)
      .populate({
        path: "author",
        select: "name email",
      })
      .populate({ path: "comments" });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    const newView = await Views.create({
      // user: userId,
      post: postId,
    });

    post.views.push(newView?._id);
    await Posts.findByIdAndUpdate(postId, post);

    res.status(200).json({
      success: true,
      message: "Successful",
      post: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  const { userId } = req.user;
    try {
      const { summary, title, content, img } = req.body;

      if (!content || !title || !summary || !img) {
        throw new BadRequestError('please Enter all values')
      }
  const uploadedResponse = await cloudinary.uploader.upload(img, {
    upload_preset: "online_shop",
  });
  if(uploadedResponse){
    const post = await Posts.create({
      summary,
      img: uploadedResponse,
      title,
      content,
      author: userId,
    });
    
    res.status(200).send({
      message: "Post created successfully",
    });
  }
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: error.message });
    }
};

export const commentPost = async (req, res, next) => {
  try {
    const { comment, name } = req.body;
    // const { userId } = req.user;
    const { id } = req.params;

    if (comment === null) {
      return res.status(404).json({ message: "Comment is required." });
    }

    const newComment = new Comments({ name: name, comment: comment, post: id });

    await newComment.save();

    //updating the post with the comments id
    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Comment published successfully",
      newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, summary, content, img } = req.body;
    // const { userId } = req.user;
    const { id } = req.params;

    const post = await Posts.findById(id);

    if (img) {
      await cloudinary.uploader.destroy(post.img.public_id)
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        upload_preset: "online_shop",
      });
      await post.updateOne({
    title: title ? title : post.title,
    summary: summary ? summary : post.summary,
    content: content ? content : post.content,
    img: uploadedResponse ? uploadedResponse : post.img,
  });
  
  res.status(200).json({
    sucess: true,
    message: "Action performed successfully",
    data: post,
  });
} else  {
   await post.updateOne({
     title: title ? title : post.title,
     summary: summary ? summary : post.summary,
     content: content ? content : post.content,
     img: post.img,
   });

   res.status(200).json({
     sucess: true,
     message: "Action performed successfully",
     data: post,
   });
}
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    // const { userId } = req.user;
    const { id } = req.params;
    const blogPost = await Posts.findById(id);

    if (!blogPost) {
      return res.status(404).json({ error: "blog post not found" });
    }

    await cloudinary.uploader.destroy(blogPost.img.public_id);

    blogPost.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const postComments = await Comments.find({ post: postId }).sort({
      _id: -1,
    });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id, postId } = req.params;

    await Comments.findByIdAndDelete(id);

    //removing comment id from post
    const result = await Posts.updateOne(
      { _id: postId },
      { $pull: { comments: id } }
    );

    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Comment removed successfully" });
    } else {
      res.status(404).json({ message: "Post or comment not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
