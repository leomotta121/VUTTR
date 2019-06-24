import React from 'react';

import colors from '../../../helper/colors';
import Button from '../../Button';

const DeleteModal = ({ title, toggleShow, formSubmitHandler }) => (
  <>
    Are you sure you want to remove <strong>{title}</strong>?
    <div className="delete-actions">
      <Button
        onClick={toggleShow}
        bgColor={colors.regular.red}
        hoverColor={colors.dark.red}
        activeColor={colors.darker.red}
        fontColor={colors.regular.white}
      >
        cancel
      </Button>
      <Button
        onClick={formSubmitHandler}
        bgColor={colors.regular.blue}
        hoverColor={colors.dark.blue}
        activeColor={colors.darker.blue}
        fontColor={colors.regular.white}
      >
        Yes, remove
      </Button>
    </div>
  </>
);

export default DeleteModal;
