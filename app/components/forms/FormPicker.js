import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  width,
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
}) {
  const { touched, setFieldValue, errors, values } = useFormikContext();
  return (
    <>
      <Picker
        placeholder={placeholder}
        selectedItem={values[name]}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        items={items}
        numberOfColumns={numberOfColumns}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
