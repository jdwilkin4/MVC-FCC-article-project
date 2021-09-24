import { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";
import FadeIn from 'react-fade-in';
import WelcomePage from './WelcomePage.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [missingApps, setMissingApps] = useState([]);
  const [missingTBTests, setMissingTBTests] = useState([]);
  const [missingBackgroundChecks, setMissingBackgroundChecks] = useState([]);
  const [missingCovidTests, setMissingCovidTests] = useState([]);
  const [error, setError] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const showDashboard = () => setShowWelcomeMessage(false);
  const h2Styles = "is-size-3 has-text-centered";
  const whiteText = "has-text-white";

  useEffect(() => {
    const fetchData = async () => {
      const allCoaches = await fetch('https://mvc-project-backend.herokuapp.com/coaches')
      setCoachData(await allCoaches.json())

      const missingApplications = await fetch('https://mvc-project-backend.herokuapp.com/missingapps')
      setMissingApps(await missingApplications.json())

      const missingCovid = await fetch('https://mvc-project-backend.herokuapp.com/missingcovid')
      setMissingCovidTests(await missingCovid.json())

      const missingTB = await fetch('https://mvc-project-backend.herokuapp.com/missingtb')
      setMissingTBTests(await missingTB.json())

      const missingBackground = await fetch('https://mvc-project-backend.herokuapp.com/missingbackground')
      setMissingBackgroundChecks(await missingBackground.json())

      if (error) {
        console.log(`There was a connection error: ${error}`)
        setError(error)
      }
    }
    fetchData()
  }, [error])


  //this is the list of emails sent to the backend
  const applicationEmails = missingApps.map(coach => coach.email);
  const tbTestsEmails = missingTBTests.map(coach => coach.email);
  const backgroundTestsEmails = missingBackgroundChecks.map(coach => coach.email);
  const covidTestsEmails = missingCovidTests.map(coach => coach.email);

  const sendEmail = async (endpoint, emails, message) => {
    const failureMsg = 'Your email failed to send.';
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
      {showWelcomeMessage ?
        <WelcomePage showDashboard={showDashboard} />
        :
        <>
          <FadeIn delay={500}>
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
              <CardTemplate messageFunction={() => sendEmail('applications', applicationEmails, "Missing Application")} name="Applications" arr={missingApps} />
              <CardTemplate messageFunction={() => sendEmail('tbtests', tbTestsEmails, "Missing TB test")} name="TB tests" arr={missingTBTests} />
              <CardTemplate messageFunction={() => sendEmail('covidtests', covidTestsEmails, "Missing Covid Vaccine")} name="Covid Vaccines" arr={missingCovidTests} />
              <CardTemplate messageFunction={() => sendEmail('backgroundchecks', backgroundTestsEmails, "Missing Background Check")} name="Background Checks" arr={missingBackgroundChecks} />
              <ToastContainer style={{ fontSize: '1.4rem' }} position="top-center" />
            </div>
          </FadeIn>
        </>
      }

    </>
  )
}


export default CoachTable;

