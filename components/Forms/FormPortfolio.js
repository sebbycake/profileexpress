import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, 
  Stack, Input, Textarea, Button, Divider, ScaleFade, } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import FormLayout from "./FormLayout";

function FormPortfolio({ prevStep, nextStep, handleChange, values, count, setCount }) {

  const isTitleError1 = values[0].project_title === ""
  const isDescError1 = values[0].project_description === ""
  const isLinkError1 = values[0].demo_link === ""
  const isThumbnailError1 = values[0].project_thumbnail === null

  const isTitleError2 = values[1].project_title === ""
  const isDescError2 = values[1].project_description === ""
  const isLinkError2 = values[1].demo_link === ""
  const isThumbnailError2 = values[1].project_thumbnail === null

  const isTitleError3 = values[2].project_title === ""
  const isDescError3 = values[2].project_description === ""
  const isLinkError3 = values[2].demo_link === ""
  const isThumbnailError3 = values[2].project_thumbnail === null

  const [isAnyErrorExists, setIsAnyErrorExists] = useState(false)

  let isError1 = isTitleError1 || isDescError1 || isLinkError1 || isThumbnailError1
  let isError2 = count >= 2 && (isTitleError2 || isDescError2 || isLinkError2 || isThumbnailError2)
  let isError3 = count >= 3 && (isTitleError3 || isDescError3 || isLinkError3 || isThumbnailError3)

  function renderForm(index, isTitleError, isLinkError, 
    isDescError, isThumbnailError) {
   return (
    <>
      <FormControl isInvalid={isAnyErrorExists && isTitleError} isRequired>
        <FormLabel fontSize='sm'>{`Project title ${index + 1}`}</FormLabel>
        <Input
          focusBorderColor="purple.500"
          size="sm"
          value={values[index].project_title}
          onChange={(event) => handleChange(event, index, "project_title")}
        />
        {isTitleError && 
          <FormErrorMessage>{`Project title ${index + 1}`} is required.</FormErrorMessage>
        }
      </FormControl>

      <FormControl isInvalid={isAnyErrorExists && isLinkError} isRequired>
        <FormLabel fontSize='sm'>{`Demo link ${index + 1}`}</FormLabel>
        <Input
          focusBorderColor="purple.500"
          size="sm"
          type="url"
          value={values[index].demo_link}
          onChange={(event) => handleChange(event, index, "demo_link")}
        />
        {isLinkError && 
          <FormErrorMessage>{`Demo link ${index + 1}`} is required.</FormErrorMessage>
        }
      </FormControl>

      <FormControl isInvalid={isAnyErrorExists && isDescError} isRequired>
        <FormLabel fontSize='sm'>{`Project description ${index + 1}`}</FormLabel>
        <Textarea
          focusBorderColor="purple.500"
          size="sm"
          value={values[index].project_description}
          onChange={(event) => handleChange(event, index, "project_description")}
        />
        {isDescError && 
          <FormErrorMessage>{`Project description ${index + 1}`} is required.</FormErrorMessage>
        }
      </FormControl>
      

      <FormControl isInvalid={isAnyErrorExists && isThumbnailError} isRequired>
        <FormLabel fontSize='sm'>
          Project thumbnail {index + 1} [
          {values[index].project_thumbnail === null ? (
            "None"
          ) : (
            <b>{values[index].project_thumbnail.name}</b>
          )}{" "}
          uploaded]
        </FormLabel>
        <Input
          size="sm"
          type="file"
          onChange={(event) => handleChange(event, index, "project_thumbnail")}
        />
        {isThumbnailError && 
          <FormErrorMessage>{`Project thumbnail ${index + 1}`} is required.</FormErrorMessage>
        }
      </FormControl>
       
    </>
   )
  }

  

  return (
    <FormLayout
      progressValue={64} 
      formTitle="Most Recent Work" 
      isAnyErrorExists={isAnyErrorExists}
    >
          { renderForm(0, isTitleError1, isLinkError1, isDescError1, isThumbnailError1) }
          { count >= 2 && 
            <>
              <Divider orientation='horizontal' />
              <ScaleFade initialScale={0.8} in={count >= 2}>
                <Stack spacing={3}>
                 {renderForm(1, isTitleError2, isLinkError2, isDescError2, isThumbnailError2)} 
                </Stack>
              </ScaleFade>
            </>
          }
          { count >= 3 && 
            <>
              <Divider orientation='horizontal' />
              <ScaleFade initialScale={0.8} in={count >= 3}>
                <Stack spacing={3}>
                 {renderForm(2, isTitleError3, isLinkError3, isDescError3, isThumbnailError3)} 
                </Stack>
              </ScaleFade>
            </>
          }
          {
            count < 3 &&
            <Button leftIcon={<AddIcon />} colorScheme="purple" onClick={() => setCount(prev => prev + 1)} variant='ghost'>
              Add more
            </Button>
          }
          <Button colorScheme="purple" onClick={() => nextStep(isError1 || isError2 || isError3, setIsAnyErrorExists)}>
            Next
          </Button>
          <Button colorScheme="purple" variant="outline" onClick={prevStep}>
            Back
          </Button>
    </FormLayout>
  );
}

export default FormPortfolio;