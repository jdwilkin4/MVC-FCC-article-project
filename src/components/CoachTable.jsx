import { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const h2Styles = "is-size-3 has-text-centered";
const whiteText = "has-text-white";

const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://mvc-project-backend.herokuapp.com/coaches')
      const json = await response.json()
      setCoachData(json)

      if (error) {
        console.log(`There was a connection error: ${error}`)
        setError(error)
      }
    }
    fetchData()
  }, [error])


  // this is the array of names lists in the coach cards
  const missingApplicationsArr = coachData.filter(app => !app.application);
  const missingTbTestsArr = coachData.filter(test => !test.tbTest);
  const missingBackgroundChecksArr = coachData.filter(check => !check.backgroundCheck);
  const missingCovidTestArr = coachData.filter(covid => !covid.covidTest);

  //this is the list of emails sent to the backend
  const applicationEmails = missingApplicationsArr.map(coach => coach.email);
  const tbTestsEmails = missingTbTestsArr.map(coach => coach.email);
  const backgroundTestsEmails = missingBackgroundChecksArr.map(coach => coach.email);
  const covidTestsEmails = missingCovidTestArr.map(coach => coach.email);

  const sendEmail = async (endpoint, emails, message) => {
    const failureMsg = 'Your email failed to send. Please try again.';
    const successMsg = `Reminder email for ${message} was sent!`;

    await fetch(`https://mvc-project-backend.herokuapp.com/${endpoint}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(emails),
    })
      .then(() => toast(successMsg))
      .catch(() => toast(failureMsg))
  }

  return (
    <>
      <h1 className="is-size-1 has-text-centered">Hello, Office manager!</h1>
      <h2 className={h2Styles}>Recently hired coaches</h2>

      <table className="table is-fullwidth">
        <thead>
          <tr className="has-background-info" >
            <th className={whiteText}>Name</th>
            <th className={whiteText}>Email</th>
            <th className={whiteText}>Program</th>
          </tr>
        </thead>
        <tbody>
          {error ?
            (<><p>There was an error loading your data.</p></>)
            :
            (<>
              {
                coachData.map(data => (
                  <tr key={data._id}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.program}</td>
                  </tr>
                ))
              }
            </>)
          }
        </tbody>
      </table>

      <h2 className={h2Styles}>Missing documents</h2>
      <div className="is-flex is-flex-wrap-wrap	is-justify-content-center">
        <CardTemplate messageFunction={() => sendEmail('applications', applicationEmails, "Missing Application")} name="Applications" arr={missingApplicationsArr} />
        <CardTemplate messageFunction={() => sendEmail('tbtests', tbTestsEmails, "Missing TB test")} name="TB tests" arr={missingTbTestsArr} />
        <CardTemplate messageFunction={() => sendEmail('covidtests', covidTestsEmails, "Missing Covid Vaccine")} name="Covid Tests" arr={missingCovidTestArr} />
        <CardTemplate messageFunction={() => sendEmail('backgroundchecks', backgroundTestsEmails, "Missing Background Check")} name="Background Checks" arr={missingBackgroundChecksArr} />
        <ToastContainer style={{ fontSize: '1.4rem' }} position="top-center" />
      </div>
    </>
  )
}


export default CoachTable;

