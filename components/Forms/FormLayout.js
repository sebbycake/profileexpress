import { Stack, Progress, Heading, Alert, AlertIcon} from "@chakra-ui/react";
import styles from "./Forms.module.css";

function FormLayout({progressValue, formTitle, isAnyErrorExists, children}) {
    return (
    	<div className={styles.container_form}>
    		<div className="container">
					<Stack spacing={4}>
						<Progress value={progressValue} colorScheme="purple" size="sm"/>
						<Heading as="h3" size="lg" textAlign="center">
							{formTitle}
						</Heading>
						{ isAnyErrorExists &&
							<Alert status='error'>
							  <AlertIcon />
							  Please fill in all the required fields.
							</Alert>
						}
						{children}
					</Stack>
        </div>
      </div>
    )
}

export default FormLayout;