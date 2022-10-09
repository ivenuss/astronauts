import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";

interface InputLabelProps extends InputProps {
  name: string;
  label?: string | JSX.Element;
  errorMsg?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  name,
  label,
  errorMsg,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl
      flexDirection="column"
      isInvalid={Boolean(meta.touched && meta.error)}
    >
      {label ? (
        <FormLabel mb="2.5" userSelect="none" fontSize="sm">
          {label}
        </FormLabel>
      ) : null}

      <Input {...field} {...props} />

      <FormErrorMessage mt="1" fontSize="sm" textColor="red.400">
        {meta.error || errorMsg}
      </FormErrorMessage>
    </FormControl>
  );
};
