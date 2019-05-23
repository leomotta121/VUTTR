const Tool = require('../models/tool');

exports.postTool = async (req, res, next) => {
  try {
    const { title, link, description, tags } = req.body;

    if (!title || !link || !description || !tags) {
      const error = new Error('Required field is missing.');
      error.status = 400;
      throw error;
    }

    const tool = await Tool.create({
      title: title,
      link: link,
      description: description,
      tags: tags
    });

    tool.save();

    return res.status(201).json(tool);
  } catch (error) {
    next(error);
  }
};

exports.deleteTool = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      const error = new Error('Required field is missing.');
      error.status = 400;
      throw error;
    }

    await Tool.findByIdAndRemove(id);

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
