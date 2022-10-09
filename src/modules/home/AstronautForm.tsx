import React from "react";
import omit from "~/utils/omit";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Flex, Box, useToast } from "@chakra-ui/react";
import { trpc } from "~/utils/trpc";
import { InputLabel } from "~/components/InputField";
import type { Astronaut } from "@prisma/client";

export type FormFields = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  superpower: string;
};

export type AstronautFormProps =
  | { mode: "create"; onSubmit: () => void }
  | { mode: "edit"; values: FormFields; onSubmit: () => void };

export type AnstronautFormMode = Pick<AstronautFormProps, "mode">;

// Default values for Form
const initialValues = {
  firstName: "",
  lastName: "",
  birthDate: new Date(),
  superpower: "",
};

const getMaxMessage = ({ max }: { max: number }) =>
  `Max length is ${max} characters`;

// Validation schema for Form
const astronautScehma = Yup.object().shape({
  firstName: Yup.string().max(64, getMaxMessage).required("Enter first name"),
  lastName: Yup.string()
    .required()
    .max(64, getMaxMessage)
    .required("Enter last name"),
  birthDate: Yup.date().required().required("Enter birth date"),
  superpower: Yup.string()
    .required()
    .max(128, getMaxMessage)
    .required("Enter superpower"),
});

export const AstronautForm = (props: AstronautFormProps) => {
  const toast = useToast();
  const queryClient = trpc.useContext();

  const onSuccessSubmit = (astronaut: Astronaut) => {
    props.onSubmit();
    // Display toast on success create | update
    toast({
      status: "success",
      title: `${props.mode === "create" ? "Created" : "Updated"} astronaut '${
        astronaut.firstName
      } ${astronaut.lastName}'`,
    });
    queryClient.astronauts.invalidate();
  };

  const { mutateAsync: updateAstronaut } = trpc.astronauts.update.useMutation({
    onSuccess: onSuccessSubmit,
  });
  const { mutateAsync: createAstronaut } =
    trpc.astronauts.createOne.useMutation({ onSuccess: onSuccessSubmit });

  const handleSubmit = async (
    values: Omit<FormFields, "id" | "birthDate"> & {
      birthDate: string;
    }
  ) => {
    if (props.mode === "edit") {
      // Update data in DB
      await updateAstronaut({
        id: props.values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: new Date(values.birthDate),
        superpower: values.superpower,
      });
      return;
    }

    // Create astronaut record
    await createAstronaut({
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: new Date(values.birthDate),
      superpower: values.superpower,
    });
  };

  const getInitialValues = () => {
    const ini =
      props.mode === "edit" ? omit(props.values, "id") : initialValues;
    // Convert date to string because of input type `date` (it has to be in format `yyyy-mm-dd` -> 'en-CA')
    // https://stackoverflow.com/a/49277178
    return { ...ini, birthDate: ini.birthDate.toLocaleDateString("en-CA") };
  };

  return (
    <Formik
      enableReinitialize
      initialValues={getInitialValues()}
      validationSchema={astronautScehma}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Box as={Form} h="full">
          <Flex h="full" direction="column" justifyContent="space-between">
            <Flex flexDirection="column" gap="4">
              <InputLabel type="text" name="firstName" label="First name" />
              <InputLabel type="text" name="lastName" label="Last name" />
              <InputLabel type="date" name="birthDate" label="Birth date" />
              <InputLabel type="text" name="superpower" label="Super power" />
            </Flex>

            <Button
              mb="4"
              width="full"
              colorScheme="linkedin"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!(isValid && dirty)}
            >
              {props.mode === "create" ? "Create" : "Update"}
            </Button>
          </Flex>
        </Box>
      )}
    </Formik>
  );
};
