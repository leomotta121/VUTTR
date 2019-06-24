import React from 'react';

import colors from '../../../helper/colors';
import Input from '../../Input';
import Button from '../../Button';
import Tags from '../Tags';

const AddOrRemoveModal = ({
  tags,
  removeTagHandler,
  title,
  description,
  link,
  tagInput,
  afterSubmitValidator,
  liveValidator,
  disabledButton,
  formSubmitHandler,
  inputChangedHandler,
  inputKeyDownHandler
}) => (
  <>
    <Input
      type="text"
      placeholder="e.g. React.js"
      name="title"
      value={title}
      onChange={inputChangedHandler}
      label="Title"
      afterSubmitValidator={afterSubmitValidator.title}
    />

    <Input
      type="text"
      placeholder="e.g. It is a good tool for..."
      name="description"
      onChange={inputChangedHandler}
      value={description}
      label="Description"
      afterSubmitValidator={afterSubmitValidator.description}
    />

    <Input
      type="text"
      placeholder="e.g. http://www.express.com"
      name="link"
      onChange={inputChangedHandler}
      value={link}
      label="Link"
      afterSubmitValidator={afterSubmitValidator.link}
    />

    <Tags tags={tags} removeTagHandler={removeTagHandler} />

    <Input
      type="text"
      placeholder="Press Enter or Space to add tags"
      name="tagInput"
      value={tagInput}
      onChange={inputChangedHandler}
      onKeyDown={inputKeyDownHandler}
      label="Tags"
      afterSubmitValidator={afterSubmitValidator.tagInput}
      liveValidator={liveValidator.tagInput}
    />

    <Button
      onClick={formSubmitHandler}
      bgColor={colors.regular.blue}
      hoverColor={colors.dark.blue}
      activeColor={colors.darker.blue}
      fontColor={colors.regular.white}
      disabledColor={colors.lighter.blue}
      disabled={disabledButton}
    >
      Send
    </Button>
  </>
);

export default AddOrRemoveModal;
