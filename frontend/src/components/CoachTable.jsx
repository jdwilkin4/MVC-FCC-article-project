import { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/coaches')
      const json = await response.json()
      setCoachData(json)

      if (error) {
        console.log(`There was a connection error: ${error}`)
        setError(error)
      }
    }
    fetchData()
  }, [])
  console.log(coachData)


  const missingApplicationsArr = coachData.filter(app => !app.application);
  const missingTbTestsArr = coachData.filter(test => !test.tbTest);
  const missingBackgroundChecksArr = coachData.filter(check => !check.backgroundCheck);
  const missingCovidTestArr = coachData.filter(covid => !covid.covidTest);

  const applicationEmails = missingApplicationsArr.map(coach => coach.email);
  const tbTestsEmails = missingTbTestsArr.map(coach => coach.email);
  const backgroundTestsEmails = missingBackgroundChecksArr.map(coach => coach.email);
  const covidTestsEmails = missingCovidTestArr.map(coach => coach.email);

  const sendEmail = async (endpoint, emails, message) => {
    const notify = () => toast(`Reminder email for ${message} was sent!`);
    notify()

    await fetch(`http://localhost:8000/${endpoint}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(emails),
    })
      .then(res => res.json())
  }

  return (
    <>
      <h1 className="is-size-1 has-text-centered">Hello, Office manager!</h1>
      <h2 className="is-size-3 has-text-centered">Recently hired coaches</h2>

      <table className="table is-fullwidth">
        <thead>
          <tr className="has-background-info" >
            <th className="has-text-white">Name</th>
            <th className="has-text-white">Email</th>
            <th className="has-text-white">Program</th>
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

      <h2 className="is-size-3 has-text-centered">Missing documents</h2>
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

