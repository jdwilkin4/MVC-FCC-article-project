import { useEffect, useState } from "react";

const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('http://localhost:8000/signup')
      response = await response.json()
      setCoachData(response)
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
      <h1>Welcome back, Office manager!</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Program</th>
            <th>Application</th>
            <th>Background Check</th>
            <th>TB test</th>
            <th>Covid Test</th>
          </tr>
        </thead>
        <tbody>
          {error ?
            (<><p>There was an error loading your data.</p></>)
            :
            (<> Database is connected </>)

          }
        </tbody>

      </table>

    </>
  )
}
export default CoachTable