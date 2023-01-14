import { useState } from "react"
import { FormControl, FormLabel, FormErrorMessage, Stack, HStack,
  Input, Textarea, Button, Divider, ScaleFade, } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import FormLayout from "./FormLayout"

function FormWork({ prevStep, nextStep, handleChange, values, count, setCount }) {

  const isPositionError1 = values[0].position === ""
  const isOrganizationError1 = values[0].organization === ""
  const isStartYearError1 = values[0].startMonthYear === ""
  const isEndYearError1 = values[0].endMonthYear === ""

  const isPositionError2 = values[1].position === ""
  const isOrganizationError2 = values[1].organization === ""
  const isStartYearError2 = values[1].startMonthYear === ""
  const isEndYearError2 = values[1].endMonthYear === ""

  const isPositionError3 = values[2].position === ""
  const isOrganizationError3 = values[2].organization === ""
  const isStartYearError3 = values[2].startMonthYear === ""
  const isEndYearError3 = values[2].endMonthYear === ""

  const [isAnyErrorExists, setIsAnyErrorExists] = useState(false)

  let isError1 = isPositionError1 || isOrganizationError1 || isStartYearError1 || isEndYearError1
  let isError2 = count >= 2 && (isPositionError2 || isOrganizationError2 || isStartYearError2 || isEndYearError2)
  let isError3 = count >= 3 && (isPositionError3 || isOrganizationError3 || isStartYearError3 || isEndYearError3)

  function renderForm(index, positionPlaceholder, organizationPlaceholder,
    isPositionError, isOrganizationError, isStartYearError, isEndYearError) {
    return (
      <>
        <FormControl isInvalid={isAnyErrorExists && isPositionError} isRequired>
          <FormLabel fontSize='sm'>{`Position/Role ${index + 1}`}</FormLabel>
          <Input
            placeholder={positionPlaceholder}
            focusBorderColor="purple.500"
            size="sm"
            value={values[index].position}
            onChange={(event) => handleChange(event, index, "position")}
          />
          {isPositionError && 
            <FormErrorMessage>{`Position/Role ${index + 1}`} is required.</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={isAnyErrorExists && isOrganizationError} isRequired>
          <FormLabel fontSize='sm'>{`Organization ${index + 1}`}</FormLabel>
          <Input
            placeholder={organizationPlaceholder}
            focusBorderColor="purple.500"
            size="sm"
            value={values[index].organization}
            onChange={(event) => handleChange(event, index, "organization")}
          />
          {isOrganizationError && 
            <FormErrorMessage>{`Organization ${index + 1}`} is required.</FormErrorMessage>
          }
        </FormControl>
        
        <HStack>
          <FormControl isInvalid={isAnyErrorExists && isStartYearError} isRequired>
            <FormLabel fontSize='sm'>Start month and year</FormLabel>
            <Input
              focusBorderColor="purple.500"
              type="month"
              size="sm"
              value={values[index].startMonthYear}
              onChange={(event) => handleChange(event, index, "startMonthYear")}
            />
            {isStartYearError && 
              <FormErrorMessage>Start month and year is required.</FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={isAnyErrorExists && isEndYearError} isRequired>
            <FormLabel fontSize='sm'>End month and year</FormLabel>
            <Input
              focusBorderColor="purple.500"
              type="month"
              size="sm"
              value={values[index].endMonthYear}
              onChange={(event) => handleChange(event, index, "endMonthYear")}
            />
            {isEndYearError && 
              <FormErrorMessage>End month and year is required.</FormErrorMessage>
            }
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel fontSize='sm'>Description</FormLabel>
          <Textarea
            placeholder="Include additional details of your work here"
            focusBorderColor="purple.500"
            size="sm"
            value={values[index].workDescription}
            onChange={(event) => handleChange(event, index, "workDescription")}
          />
        </FormControl>

      </>
    )
  }

  return (
    <FormLayout 
      progressValue={48} 
      formTitle="Work Experiences"
      isAnyErrorExists={isAnyErrorExists}
    >
          { renderForm(0, "Software Engineer Intern", "Shopee", isPositionError1, 
          isOrganizationError1, isStartYearError1, isEndYearError1) }
          { count >= 2 && 
            <>
              <Divider orientation='horizontal' />
              <ScaleFade initialScale={0.8} in={count >= 2}>
                <Stack spacing={3}>
                  {renderForm(1, "Product Management Intern", "foodpanda", isPositionError2,
                  isOrganizationError2, isStartYearError2, isEndYearError2)} 
                </Stack>
              </ScaleFade>
            </>
          }
          { count >= 3 && 
            <>
              <Divider orientation='horizontal' />
              <ScaleFade initialScale={0.8} in={count >= 3}>
                <Stack spacing={3}>
                  {renderForm(2, "DevOps Engineer Intern", "Autodesk", isPositionError3, 
                  isOrganizationError3, isStartYearError3, isEndYearError3)} 
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

export default FormWork;
