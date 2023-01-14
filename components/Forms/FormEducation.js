import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, 
  Input, Textarea, Button, HStack, } from "@chakra-ui/react";
import FormLayout from "./FormLayout";

function FormEducation({ prevStep, nextStep, handleChange, values }) {

  const [isAnyErrorExists, setIsAnyErrorExists] = useState(false)

  const isEducationalError = values.institution === ""
  const isProgrammeError = values.programme === ""
  const isStartYearError = values.startYear === ""
  const isEndYearError = values.endYear === ""

  let isError = isEducationalError || isProgrammeError || isStartYearError || isEndYearError

  return (
    <FormLayout 
      progressValue={32} 
      formTitle="Education" 
      prevStep={prevStep} 
      nextStep={nextStep}
      isAnyErrorExists={isAnyErrorExists}
    >
      <FormControl isInvalid={isAnyErrorExists && isEducationalError} isRequired>
        <FormLabel fontSize='sm'>Educational institution</FormLabel>
        <Input
          placeholder="National University of Singapore"
          focusBorderColor="purple.500"
          size="sm"
          value={values.institution}
          onChange={(event) => handleChange(event, "institution")}
        />
        {isEducationalError && 
          <FormErrorMessage>Educational institution is required.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={isAnyErrorExists && isProgrammeError} isRequired>
        <FormLabel fontSize='sm'>Degree/Diploma title</FormLabel>
        <Input
          placeholder="Bachelor of Computing in Computer Science"
          focusBorderColor="purple.500"
          size="sm"
          value={values.programme}
          onChange={(event) => handleChange(event, "programme")}
          />
        {isProgrammeError && 
          <FormErrorMessage>Degree/Diploma title is required.</FormErrorMessage>
        }
      </FormControl>
      <HStack>
        <FormControl isInvalid={isAnyErrorExists && isStartYearError} isRequired>
          <FormLabel fontSize='sm'>Start year</FormLabel>
          <Input
            placeholder="2020"
            focusBorderColor="purple.500"
            size="sm"
            value={values.startYear}
            onChange={(event) => handleChange(event, "startYear")}
          />
          {isStartYearError &&
            <FormErrorMessage>Start year is required.</FormErrorMessage>
          }
        </FormControl>
        <FormControl isInvalid={isAnyErrorExists && isEndYearError} isRequired>
          <FormLabel fontSize='sm'>End year</FormLabel>
          <Input
            placeholder="2024"
            focusBorderColor="purple.500"
            size="sm"
            value={values.endYear}
            onChange={(event) => handleChange(event, "endYear")}
          />
          {isEndYearError &&
            <FormErrorMessage>End year is required.</FormErrorMessage>
          }
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel fontSize='sm'>Description</FormLabel>
        <Textarea
          placeholder="Include additional details of your education here"
          focusBorderColor="#8180fc"
          size="sm"
          value={values.educationDescription}
          onChange={(event) => handleChange(event, "educationDescription")}
        />
      </FormControl>
      <Button colorScheme="purple" onClick={() => nextStep(isError, setIsAnyErrorExists)}>
				Next
			</Button>
			<Button colorScheme="purple" variant="outline" onClick={prevStep}>
				Back
			</Button>
    </FormLayout>
   
  );
}

export default FormEducation;
