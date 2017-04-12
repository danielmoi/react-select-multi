const updateValues = (props, value) => {
  const { name, selected, isMultipleSelect } = props;
  const selectedValues = selected || [];
  if (isMultipleSelect) {
    if (selectedValues.includes(value)) {
      props.takeValue({
        name, values: selectedValues.filter(val => val !== value),
      });
    } else {
      props.takeValue({ name, values: selectedValues.concat(value) });
    }
  } else {
    props.takeValue({ name, values: [value] });
    props.toggleOpen({ name, open: false });
  }
};

module.exports = { updateValues };
