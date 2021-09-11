import { useEffect, useState } from "react";

//todo:create columns for completed applications, and tests

const CoachTable = () => {
  const [coachData, setCoachData] = useState([]);
  const [error, setError] = useState(null);

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
      <h1>Welcome back, Office manager!</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Program</th>
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

    </>
  )
}
export default CoachTable