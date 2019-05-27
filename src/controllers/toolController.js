const Tool = require('../models/tool');

exports.getTools = async (req, res, next) => {
  try {
    const tag = req.query.tag;

    if (!tag) {
      const tools = await Tool.find();
      return res.status(200).json(tools);
    }

    const tools = await Tool.find({ tags: tag });

    if (tools.length <= 0) {
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

exports.patchTool = async (req, res, next) => {
  try {
    const { title, link, description, tags } = req.body;
    const { id } = req.params;

    if (!title && !link && !description && !tags) {
      const error = new Error('Nothing to edit.');
      error.status = 400;
      throw error;
    }

    if (!Array.isArray(tags)) {
      const error = new Error('Tags most be an array.');
      error.status = 400;
      throw error;
    }

    const tool = await Tool.findById(id);

    if (!tool) {
      const error = new Error('Could not find any tool.');
      error.status = 400;
      throw error;
    }

    if (title) tool.title = title;
    if (link) tool.link = link;
    if (description) tool.description = description;
    if (tags) {
      tags.forEach(newTag => {
        const canUpdate = tool.tags.includes(newTag);
        if (!canUpdate) tool.tags.push(newTag);
      });
    }

    await tool.save();

    res.status(200).json({ message: 'Tool updated!' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTool = async (req, res, next) => {
  try {
    const id = req.params.id;

    const tool = await Tool.findById(id);

    if (!tool) {
      const error = new Error('Could not find any tool.');
      error.status = 400;
      throw error;
    }

    await Tool.findByIdAndRemove(id);

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
