import { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";

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
  const tbTests = missingTbTestsArr.map(coach => coach.email);
  const backgroundTests = missingBackgroundChecksArr.map(coach => coach.email);
  const covidTests = missingCovidTestArr.map(coach => coach.email);


  const emailMissingApplications = async () => {
    console.log(applicationEmails)
    alert(`Your email was sent to ${applicationEmails}`)
    const response = await fetch("http://localhost:8000/applications", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(applicationEmails),
    })
      .then(res => res.json())
  }

  return (
    <>
      <h1 className="is-size-1 has-text-centered">Welcome back, Office manager!</h1>
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
        <CardTemplate messageFunction={emailMissingApplications} name="Applications" arr={missingApplicationsArr} />
        <CardTemplate name="TB tests" arr={missingTbTestsArr} />
        <CardTemplate name="Covid Tests" arr={missingCovidTestArr} />
        <CardTemplate name="Background Checks" arr={missingBackgroundChecksArr} />
      </div>
    </>
  )
}


export default CoachTable

