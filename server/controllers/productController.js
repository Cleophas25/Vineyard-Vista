import Product from "../models/product.js";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

import cloudinary from "../utils/cloudinary.js";

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const { category, search } = req.query;

  const queryObject = {};

  if (category && category !== "") {
    queryObject.category = category;
  }
  if (search) {
    queryObject.productName = { $regex: search, $options: "i" };
  }
  let result = Product.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;

  const totalCount = await Product.countDocuments(queryObject).exec();
  const totalPages = Math.ceil(totalCount / limit);

  res.status(StatusCodes.OK).json({ products, totalPages });
});

const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Product Not Found" });
  }
});

const createProduct = async (req, res) => {
  const { userId } = req.user;

  try {
    const { productName, price, category, countInStock, description, imgUrl } =
      req.body;
    const uploadedResponse = await cloudinary.uploader.upload(imgUrl, {
      upload_preset: "online_shop",
    });

    if (uploadedResponse) {
      const sampleProduct = {
        productName: productName,
        price: price,
        imgUrl: uploadedResponse,
        category: category,
        countInStock: countInStock,
        description: description,
      };

      const product = await Product.create(sampleProduct);
      res
        .status(StatusCodes.OK)
        .send({ success: true, product, message: "Product Created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      slug,
      price,
      category,
      countInStock,
      description,
      imgUrl,
    } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        await cloudinary.uploader.destroy(product.imgUrl.public_id);
        const uploadedResponse = await cloudinary.uploader.upload(imgUrl, {
          upload_preset: "online_shop",
        });
        await product.updateOne({
          productName: productName ? productName : product.productName,
          slug: slug ? slug : product.slug,
          price: price ? price : product.price,
          imgUrl: uploadedResponse ? uploadedResponse : product.imgUrl,
          category: category ? category : product.category,
          countInStock: countInStock ? countInStock : product.countInStock,
          description: description ? description : product.description,
        });
        res.status(StatusCodes.OK).json({ message: "Product Updated" });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Product Not Found" });
      }
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await cloudinary.uploader.destroy(product.imgUrl.public_id);
    await product.deleteOne();
    res.status(StatusCodes.OK).json({ message: "Product Deleted" });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Product Not Found" });
  }
});

const submitReview = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You already submitted a review" });
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(StatusCodes.CREATED).json({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      numReviews: product.numReviews,
      rating: product.rating,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Product Not Found" });
  }
});
export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  submitReview,
};
