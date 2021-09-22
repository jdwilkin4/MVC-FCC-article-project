import FadeIn from 'react-fade-in';


const WelcomePage = (props) => {
  const marginStyles = { marginTop: '15px' };
  const paraStyles = "is-size-4 has-text-centered";

  const btnStyles = {
    backgroundColor: '#008000',
    cursor: 'pointer',
    padding: '20px',
    marginTop: '30px',
    color: 'white',
    borderStyle: 'none',
    borderRadius: '10%'
  }


  return (
    <>

      <h1 style={{ marginTop: '30px' }} className="is-size-1 has-text-centered">Welcome back Office manager!</h1>

      <FadeIn delay={700}>
        <p style={{ marginTop: '60px' }} className={paraStyles}>XYZ High School has just hired 7 new coaches</p>
      </FadeIn>
      <FadeIn delay={2500}>
        <p style={marginStyles} className={paraStyles}>You can monitor each coach application status in the dashboard</p>
      </FadeIn>
      <FadeIn delay={4500}>
        <p style={marginStyles} className={paraStyles}>You can also send reminder emails if coaches are missing application materials</p>
      </FadeIn>
      <FadeIn delay={6500}>
        <div className="has-text-centered">
          <button style={btnStyles} className={paraStyles} onClick={props.showDashboard}>View Dashboard</button>
        </div>
      </FadeIn>


    </>
  )

}
export default WelcomePage;

