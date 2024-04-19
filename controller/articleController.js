import { ArticleModel } from "../model/articleModel.js";
import jwt from "jsonwebtoken";

export const createArticle = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedData = await jwt.verify(token, "secret");
    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    const { title, content } = req.body;
    let imageUrl = req.file;
    const b64 = Buffer.from(imageUrl.buffer).toString("base64");
    let dataURI = `data:${imageUrl.mimetype};base64,${b64}`;
    const aricle = await ArticleModel.create({
      title,
      content,
      imageUrl: dataURI,
      author: decodedData.username,
      user: decodedData.id,
    });
    if (!aricle) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    return res
      .status(200)
      .json({ message: "Article created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchMyArticles = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedData = await jwt.verify(token, "secret");
    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const skip = (page - 1) * pageSize;
    const limit = 6;

    const totalDocuments = await ArticleModel.countDocuments();
    const articles = await ArticleModel.find({
      user: decodedData.id,
    })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    if (!articles) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    return res.status(200).json({
      articles,

      total: Math.ceil(totalDocuments / pageSize),
      itemsPerPage: pageSize,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedData = await jwt.verify(token, "secret");
    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    const { articleId } = req.params;
    if (!articleId) {
      return res.status(401).json({ message: "Article not found" });
    }
    const data = {
      title: req.body.title,
      content: req.body.content,
    };
    let imageUrl = req.file;
    if (imageUrl) {
      const b64 = Buffer.from(imageUrl.buffer).toString("base64");
      let dataURI = `data:${imageUrl.mimetype};base64,${b64}`;
      data.imageUrl = dataURI;
    }

    const article = await ArticleModel.findByIdAndUpdate(articleId, data, {
      new: true,
    });
    if (!article) {
      return res.status(401).json({ message: "Article not found" });
    }
    return res
      .status(200)
      .json({ message: "Article updated successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedData = await jwt.verify(token, "secret");
    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
    const { articleId } = req.params;
    if (!articleId) {
      return res.status(401).json({ message: "Article not found" });
    }
    const response = await ArticleModel.findOneAndDelete({
      _id: articleId,
      user: decodedData.id,
    });
    if (!response) {
      return res.status(401).json({ message: "Article not found" });
    }
    return res
      .status(200)
      .json({ message: "Article deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
