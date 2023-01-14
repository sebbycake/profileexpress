import { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import FormLayout from "./FormLayout";

function FormThemeColor({ prevStep, nextStep, handleChange, values }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const hslValues = `hsl(${values}, 69%, 61%)`;

  return (
    <FormLayout progressValue={100} formTitle="Favourite Theme Colour">
      <Box bg={hslValues} w="100%" p={4} color="white" textAlign="center">
            {hslValues}
          </Box>

          {/* all the sliders */}
          <Tooltip
            label="Hue is a degree on the color wheel from 0 to 360. Purple: 250, Green: 142, Blue: 230, Pink: 340"
            placement="bottom"
          >
            <Box pt={4} pb={2}>
              <Slider
                defaultValue={values}
                min={0}
                max={360}
                aria-label="slider-ex-6"
                onChange={(val) => handleChange(val)}
              >
                <SliderMark
                  value={values}
                  textAlign="center"
                  bg="purple.700"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {values}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack bg="purple.700" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </Box>
          </Tooltip>

          <Button colorScheme="purple" onClick={onOpen}>
            Submit
          </Button>
          <Button colorScheme="purple" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Submit form?
                </AlertDialogHeader>

                <AlertDialogBody>
                  You can't undo this afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="green" onClick={nextStep} ml={3}>
                    I'm Done!
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
    </FormLayout>
  );
}

export default FormThemeColor;
