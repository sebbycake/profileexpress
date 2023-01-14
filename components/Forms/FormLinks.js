import { InputGroup, Input, InputLeftElement, Button, } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoMedium, IoLogoDribbble, IoLogoBehance, IoLogoYoutube } from "react-icons/io5";
import FormLayout from "./FormLayout";

function FormLinks({ prevStep, nextStep, handleChange, values }) {
  return (
    <FormLayout progressValue={80} formTitle="Social Links">
      <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoLinkedin} />}
            />
            <Input
              type="text"
              placeholder="LinkedIn"
              focusBorderColor="#8180fc"
              value={values.linkedin}
              onChange={(event) => handleChange(event, "linkedin")}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoGithub} />}
            />
            <Input
              type="text"
              placeholder="GitHub"
              focusBorderColor="#8180fc"
              value={values.github}
              onChange={(event) => handleChange(event, "github")}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoMedium} />}
            />
            <Input
              type="text"
              placeholder="Medium"
              focusBorderColor="#8180fc"
              value={values.medium}
              onChange={(event) => handleChange(event, "medium")}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoDribbble} />}
            />
            <Input
              type="text"
              placeholder="Dribbble"
              focusBorderColor="#8180fc"
              value={values.dribbble}
              onChange={(event) => handleChange(event, "dribbble")}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoBehance} />}
            />
            <Input
              type="text"
              placeholder="Behance"
              focusBorderColor="#8180fc"
              value={values.Behance}
              onChange={(event) => handleChange(event, "behance")}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoLogoYoutube} />}
            />
            <Input
              type="text"
              placeholder="YouTube"
              focusBorderColor="#8180fc"
              value={values.youtube}
              onChange={(event) => handleChange(event, "youtube")}
            />
          </InputGroup>
          <Button colorScheme="purple" onClick={nextStep}>
						Next
					</Button>
					<Button colorScheme="purple" variant="outline" onClick={prevStep}>
						Back
					</Button>
    </FormLayout>
  );
}

export default FormLinks;
