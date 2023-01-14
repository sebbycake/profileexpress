import { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Forms.module.css";

function Success({
  aboutValues,
  educationValues,
  workValues,
  portfolioValues,
  linksValues,
  themeColorValues
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [path, setPath] = useState("");

  // Convert from "2022-02" to "Feb 2022"
  function convertDateFormat(dateInput) {
    const d = new Date(dateInput);
    const arr = d.toDateString().split(" ");
    return `${arr[1]} ${arr[3]}`;
  }

  let payload = {
    firstName: aboutValues.firstName,
    lastName: aboutValues.lastName,
    email: aboutValues.email,
    title: aboutValues.title,
    intro: aboutValues.selfIntroduction,
    profilePhoto: aboutValues.profilePhoto ? `profilePhoto-${aboutValues.profilePhoto.name}` : null,
    education: [
      {
        institution: educationValues.institution,
        programme: educationValues.programme,
        startDate: educationValues.startYear,
        endDate: educationValues.endYear,
        description: educationValues.educationDescription,
      },
    ],
    workExperiences: [
      {
        position: workValues[0].position,
        organisation: workValues[0].organization,
        startDate: convertDateFormat(workValues[0].startMonthYear),
        endDate: convertDateFormat(workValues[0].endMonthYear),
        description: workValues[0].workDescription,
      },
    ],
    portfolioProjects: [
      {
        title: portfolioValues[0].project_title,
        description: portfolioValues[0].project_description,
        thumbnail: portfolioValues[0].project_thumbnail ? `portfolio1-${portfolioValues[0].project_thumbnail.name}` : null,
        demoLink: portfolioValues[0].demo_link,
      },
    ],
    links: {
      LinkedIn: linksValues.linkedin,
      Github: linksValues.github,
      Medium: linksValues.medium,
      Dribbble: linksValues.dribbble,
      Behance: linksValues.behance,
      YouTube: linksValues.youtube
    },
    themeColor: themeColorValues,
  };
  
  // adding multiple optional work experiences or portfolio projects

  if (workValues[1].position !== "" && workValues[1].organization !== "") {
    const workExp = {
      position: workValues[1].position,
      organisation: workValues[1].organization,
      startDate: convertDateFormat(workValues[1].startMonthYear),
      endDate: convertDateFormat(workValues[1].endMonthYear),
      description: workValues[1].workDescription,
    }
    payload.workExperiences[1] = workExp
  }

  if (workValues[2].position !== "" && workValues[2].organization !== "") {
    const workExp = {
      position: workValues[2].position,
      organisation: workValues[2].organization,
      startDate: convertDateFormat(workValues[2].startMonthYear),
      endDate: convertDateFormat(workValues[2].endMonthYear),
      description: workValues[2].workDescription,
    }
    payload.workExperiences[2] = workExp
  }

  if (portfolioValues[1].project_title !== "") {
    const portfolio = {
      title: portfolioValues[1].project_title,
      description: portfolioValues[1].project_description,
      thumbnail: portfolioValues[1].project_thumbnail ? `portfolio2-${portfolioValues[1].project_thumbnail.name}` : null,
      demoLink: portfolioValues[1].demo_link,
    }
    payload.portfolioProjects[1] = portfolio
  }
  
  if (portfolioValues[2].project_title !== "") {
    const portfolio = {
      title: portfolioValues[2].project_title,
      description: portfolioValues[2].project_description,
      thumbnail: portfolioValues[2].project_thumbnail ? `portfolio3-${portfolioValues[2].project_thumbnail.name}` : null,
      demoLink: portfolioValues[2].demo_link,
    }
    payload.portfolioProjects[2] = portfolio
  }

  console.log(payload)

  useEffect(() => {
    const formData = new FormData();

    // append profile photo to form data
    formData.append("profilePhoto", aboutValues.profilePhoto);

    // append portfolio photos to form data
    if (portfolioValues[0].project_thumbnail) {
      formData.append("portfolio1", portfolioValues[0].project_thumbnail);
    }

    if (portfolioValues[1].project_thumbnail) {
      formData.append("portfolio2", portfolioValues[1].project_thumbnail);
    }

    if (portfolioValues[2].project_thumbnail) {
      formData.append("portfolio3", portfolioValues[2].project_thumbnail);
    }

    // append user json body to form data
    formData.append("content", JSON.stringify(payload));

    // [POST] create a profile
    fetch("/api/v1/profiles", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setIsLoading(false);
        setPath(`/profile/${res.slug}`);
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setIsError(true);
        setPath(`/`);
      });

  }, []);

  return (
    <div className={styles.container_form}>
      <div className="container">
        {isLoading && (
          <Stack spacing={6}>
            <Text textAlign="center">
              Generating your portfolio. Please wait...
            </Text>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#8180fc"
                size="xl"
              />
            </Center>
          </Stack>
        )}

        {!isLoading && !isError && (
          <Stack spacing={6}>
            <Alert status="success">
              <AlertIcon />
              Personal portfolio is generated!
            </Alert>
            <Link href={path} className="btn" target="_blank">
              View here
            </Link>
          </Stack>
        )}

        {!isLoading && isError && (
          <Stack spacing={6}>
            <Alert status="error">
              <AlertIcon />
              Oops! An error occurred while generating portfolio. Please try again later.  
            </Alert>
            <Link href={path} className="btn">
              Back to Home
            </Link>
          </Stack>
        )}
      </div>
    </div>
  );
}

export default Success;
