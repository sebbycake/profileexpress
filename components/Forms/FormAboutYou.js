import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, 
  Input, Textarea, Button, Stack, } from "@chakra-ui/react";
import FormLayout from "./FormLayout";

function FormAboutYou({ nextStep, handleChange, values }) {

  const isFirstNameError = values.firstName === ""
  const isLastNameError = values.lastName === ""
  const isEmailError = values.email === ""
  const isTitleError = values.title === ""
  const isSelfIntroError = values.selfIntroduction === ""
  const isProfilePhotoError = values.profilePhoto === null

  const [isAnyErrorExists, setIsAnyErrorExists] = useState(false)

  let isError = isFirstNameError || isLastNameError || isEmailError 
  || isTitleError || isSelfIntroError || isProfilePhotoError

  function renderInput(isAttrError, formLabel, placeholder, value, onChangeHandler, type="text") {
    return (
      <FormControl isInvalid={isAnyErrorExists && isAttrError} isRequired>
        <FormLabel fontSize='sm'>{formLabel}</FormLabel>
        <Input
          type={type}
          placeholder={placeholder}
          focusBorderColor="purple.500"
          size="sm"
          value={value}
          onChange={onChangeHandler}
        />
        {isAttrError && 
          <FormErrorMessage>{`${formLabel} is required.`}</FormErrorMessage>
        }
      </FormControl>
    )
  }

  return (
    <FormLayout
      progressValue={16} 
      formTitle="About Yourself" 
      isAnyErrorExists={isAnyErrorExists}
    >
      <Stack direction={["column", "row"]}>
        { renderInput(isFirstNameError, "First name", "Jason", values.firstName, (event) => handleChange(event, "firstName")) }
        { renderInput(isLastNameError, "Last name", "Chew", values.lastName, (event) => handleChange(event, "lastName")) }
      </Stack>
      { renderInput(isEmailError, "Email address", "jason_chew@gmail.com", values.email, (event) => handleChange(event, "email"), "email") }
      { renderInput(isTitleError, "Current title", "Computer Science Sophomore", values.title, (event) => handleChange(event, "title")) }
      <FormControl isInvalid={isAnyErrorExists && isSelfIntroError} isRequired>
        <FormLabel fontSize='sm'>Self-introduction</FormLabel>
        <Textarea
          placeholder="A short introduction about yourself"
          focusBorderColor="purple.500"
          size="sm"
          value={values.selfIntroduction}
          onChange={(event) => handleChange(event, "selfIntroduction")}
        />
        {isSelfIntroError && 
          <FormErrorMessage>Self-introduction is required.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={isAnyErrorExists && isProfilePhotoError} isRequired>
        <FormLabel fontSize='sm'>
          Profile photo [
          {values.profilePhoto === null ? (
            "None"
          ) : (
            <b>{values.profilePhoto.name}</b>
          )}{" "}
          uploaded]
        </FormLabel>
        <Input
          size="sm"
          type="file"
          onChange={(event) => handleChange(event, "profilePhoto")}
        />
        {isProfilePhotoError && 
        <FormErrorMessage>Photo is required.</FormErrorMessage>
      }
      </FormControl>
      <Button colorScheme="purple" onClick={() => nextStep(isError, setIsAnyErrorExists)}>
        Next
      </Button>
    </FormLayout>
  );
}

export default FormAboutYou;

