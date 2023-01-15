import Head from "next/head"
import UserForm from "../components/Forms/UserForm"

function Form() {
  return (
    <div>
      <Head>
        <title>ProfileSpace | Form</title>
        <meta name="description" content="Build a personal portfolio website in minutes. Filling up a form is all you need to do. create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserForm />
    </div>
  )
}

export default Form