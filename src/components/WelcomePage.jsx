import { useState } from "react";
import CoachTable from './CoachTable';
import FadeIn from 'react-fade-in';


const WelcomePage = () => {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

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
            {showWelcomeMessage
                ?
                (<>
                    <h1 style={{ marginTop: '30px' }} className="is-size-1 has-text-centered">Welcome back Office manager!</h1>


                    <FadeIn delay={700}>
                        <p style={{ marginTop: '60px' }} className={paraStyles}>XYZ High School has just hired 7 new coaches</p>
                    </FadeIn>
                    <FadeIn delay={3000}>
                        <p style={marginStyles} className={paraStyles}>You can monitor each coach application status in the dashboard</p>
                    </FadeIn>
                    <FadeIn delay={5000}>
                        <p style={marginStyles} className={paraStyles}>You can also send reminder emails if coaches are missing application materials</p>
                    </FadeIn>
                    <FadeIn delay={7000}>
                        <div className="has-text-centered">
                            <button style={btnStyles} className={paraStyles} onClick={() => setShowWelcomeMessage(false)}>View Dashboard</button>
                        </div>
                    </FadeIn>
                </>)
                :
                (<CoachTable />)
            }
        </>
    )

}
export default WelcomePage;

