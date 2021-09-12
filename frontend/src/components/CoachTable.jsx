import { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";

const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [error, setError] = useState(null);


  //these filter arrays represent coaches who haven't completed these materials
  const applicationsArr = coachData.filter(app => !app.application);
  const tbTestsArr = coachData.filter(test => !test.tbTest);
  const backgroundChecksArr = coachData.filter(check => !check.backgroundCheck);
  const covidTestArr = coachData.filter(covid => !covid.covidTest);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/signup')
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
        <CardTemplate name="Applications" arr={applicationsArr} />
        <CardTemplate name="TB tests" arr={tbTestsArr} />
        <CardTemplate name="Covid Tests" arr={covidTestArr} />
        <CardTemplate name="Background Checks" arr={backgroundChecksArr} />
      </div>
    </>
  )
}


export default CoachTable

