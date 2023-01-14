import { useState } from "react";
import Start from "./Start"
import FormAboutYou from './FormAboutYou'
import FormEducation from './FormEducation'
import FormWork from './FormWork'
import FormPortfolio from './FormPortfolio'
import FormLinks from './FormLinks'
import FormThemeColor from './FormThemeColor'
import Success from './Success'

function UserForm() {

  const [step, setStep] = useState(0)

  // proceed to next step
  const nextStep = () => {
    setStep(prev => prev + 1)
  };

  function handleNextWithError(isError, setError) {
    if (isError) {
      setError(true)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      nextStep()
    }
  }

  // proceed to prev step
  const prevStep = () => {
    setStep(prev => prev - 1)
  };

  // ============================= ABOUT FORM =============================

  // About Yourself form
  const [aboutForm, setAboutForm] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "title": "",
    "selfIntroduction": "",
    "profilePhoto": null,
  })

  // handle fields change for about form
  const handleAboutChange = (event, input) => {
    if (event.target.type === "file") {
      setAboutForm((prev) => ({ ...prev, [input]: event.target.files[0] }));
    } else {
      setAboutForm((prev) => ({ ...prev, [input]: event.target.value }));
    }
  };

  // ============================= EDUCATION FORM =============================

  const [educationForm, setEducationForm] = useState({
      "institution": "",
      "programme": "",
      "startYear": "",
      "endYear": "",
      "educationDescription": "",
  })

  const handleEducationChange = (event, input) => {
    setEducationForm((prev) => ({ ...prev, [input]: event.target.value }));
  };

  // ============================= WORK FORM =============================

  const [workForm, setWorkForm] = useState([
    {
      "position": "",
      "organization": "",
      "startMonthYear": "",
      "endMonthYear": "",
      "workDescription": ""
    },
    {
      "position": "",
      "organization": "",
      "startMonthYear": "",
      "endMonthYear": "",
      "workDescription": ""
    },
    {
      "position": "",
      "organization": "",
      "startMonthYear": "",
      "endMonthYear": "",
      "workDescription": ""
    }
  ])

  const [workCount, setWorkCount] = useState(1)

  const handleWorkChange = (event, ind, input) => {
    let newWorkValues = workForm.map((element, index) => index === ind 
      ? {...element, [input] : event.target.value} 
      : element)
    setWorkForm(newWorkValues)
  }

  // ============================= PORTFOLIO FORM =============================

  const [portfolioForm, setPortfolioForm] = useState([
    {
      "project_title": "",
      "project_description": "",
      "demo_link": "",
      "project_thumbnail": null
    },
    {
      "project_title": "",
      "project_description": "",
      "demo_link": "",
      "project_thumbnail": null
    },
    {
      "project_title": "",
      "project_description": "",
      "demo_link": "",
      "project_thumbnail": null
    }
  ])

  const [portfolioCount, setPortfolioCount] = useState(1)

  const handlePortfolioChange = (event, ind, input) => {
    if (event.target.type === "file") {
      let newPortfolioValues = portfolioForm.map((element, index) => index === ind 
      ? {...element, [input] : event.target.files[0]} 
      : element)
      setPortfolioForm(newPortfolioValues)
    } else {
      let newPortfolioValues = portfolioForm.map((element, index) => index === ind 
      ? {...element, [input] : event.target.value} 
      : element)
      setPortfolioForm(newPortfolioValues)
    }
  };

  // ============================= LINKS FORM =============================

  const [linksForm, setLinksForm] = useState({
    "linkedin": "",
    "github": "",
    "medium": "",
    "dribbble": "",
    "behance": "",
    "youtube": ""
  })

  const handleLinksChange = (event, input) => {
    setLinksForm((prev) => ({ ...prev, [input]: event.target.value }));
  };

  const [themeColorForm, setThemeColorForm] = useState(217)

  switch (step) {
    case 0:
      return <Start nextStep={nextStep}/>
    case 1:
      return (
        <FormAboutYou 
          nextStep={handleNextWithError}
          handleChange={handleAboutChange}
          values={aboutForm}
        />
      )
    case 2:
      return (
        <FormEducation
          prevStep={prevStep}
          nextStep={handleNextWithError}
          handleChange={handleEducationChange}
          values={educationForm}
        />
      )
    case 3:
      return (
        <FormWork
          prevStep={prevStep}
          nextStep={handleNextWithError}
          handleChange={handleWorkChange}
          values={workForm}
          count={workCount}
          setCount={setWorkCount}
        />
      )
    case 4:
      return (
        <FormPortfolio
          prevStep={prevStep}
          nextStep={handleNextWithError}
          handleChange={handlePortfolioChange}
          values={portfolioForm}
          count={portfolioCount}
          setCount={setPortfolioCount}
        />
      )
    case 5:
      return (
        <FormLinks
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleLinksChange}
          values={linksForm}
        />
      )
    case 6:
      return (
        <FormThemeColor
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={setThemeColorForm}
          values={themeColorForm}
        />
    )
    case 7:
      return (
        <Success 
          aboutValues={aboutForm}
          educationValues={educationForm}
          workValues={workForm}
          portfolioValues={portfolioForm}
          linksValues={linksForm}
          themeColorValues={themeColorForm}
        />
      )
    default:
      return <h1>Error</h1>;
  }
}

export default UserForm;
