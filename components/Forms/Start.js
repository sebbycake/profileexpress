import { Stack, Text, Button, Alert, AlertIcon } from "@chakra-ui/react";
import styles from "./Forms.module.css";

function Start({ nextStep }) {
  return (
    <div className={styles.container_form}>
      <div className="container">
        <Stack spacing={4}>
          <Text fontSize="md">
            To set up your personal portfolio, we need to collect information
            about you, which includes your personal details, education, work
            experiences or most recent notable work.{" "}
          </Text>
          <Text fontSize="md">
            {" "}
            A unique link to your portfolio is generated once you complete the
            process.
          </Text>
          <Text fontSize="md">
            Once you are ready, press the Start button to continue.
          </Text>
          <Alert status="info">
            <AlertIcon />
            You are required to fill in the form in one go. Get all your
            information ready!
          </Alert>
          <Button colorScheme="purple" onClick={nextStep}>
            Start
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Start;
