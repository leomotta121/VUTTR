const Tool = require('../models/tool');

exports.getTools = async (req, res, next) => {
  try {
    const tag = req.query.tag;

    if (!tag) {
      const tools = await Tool.find();
      return res.status(200).json(tools);
    }

    const tools = await Tool.find({ tags: tag });

    if (!tools) {
      const error = new Error('Could not find any tool.');
      error.status = 400;
      throw error;
    }

    return res.status(200).json(tools);
  } catch (error) {
    next(error);
  }
};

exports.postTool = async (req, res, next) => {
  try {
    const { title, link, description, tags } = req.body;

    if (!title || !link || !description || !tags) {
      const error = new Error('Required field is missing.');
      error.status = 400;
      throw error;
    }

    if (await Tool.findOne({ title })) {
      const error = new Error('Tool registered.');
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
