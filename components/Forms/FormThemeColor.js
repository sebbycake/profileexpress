import { useRef, useState } from "react";
import {
  Button,
  Center,
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
import ReCAPTCHA from "react-google-recaptcha";

function FormThemeColor({ prevStep, nextStep, handleChange, values }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPassCaptcha, setIsPassCaptcha] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const captchaRef = useRef(null);

  function checkToken() {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    fetch("api/v1/recaptcha", {
      method: "POST",
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "Human") {
          setIsPassCaptcha(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const hslValues = `hsl(${values}, 69%, 61%)`;

  const checkTokenAndGoNext = () => {
    checkToken();
    nextStep();
  };

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

            <AlertDialogBody>You can't undo this afterwards.</AlertDialogBody>

            <Center>
              <ReCAPTCHA
                onChange={() => setIsSubmit(true)}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={captchaRef}  
              />
            </Center>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!isSubmit && !isPassCaptcha}
                setIsSubmit
                colorScheme="green"
                onClick={checkTokenAndGoNext}
                ml={3}
              >
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
