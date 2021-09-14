const cardDimensions = {
    width: '300px',
    height: '250px'
};
const btnText = 'Send reminder email';
const btnStyles = {
    backgroundColor: '#008000',
    cursor: 'pointer',
    marginTop: '10px',
    color: 'white',
}


const CardTemplate = (props) => {

    return (
        <div className="card" style={cardDimensions}>
            <h3 className="has-background-info	has-text-white	is-size-4 has-text-centered">{props.name}</h3>
            <div style={{ marginTop: '10px' }}>
                {props.arr.map((app, index) => (
                    <div key={index} className="is-flex is-flex-wrap-wrap is-justify-content-center">
                        <p >{app.name}</p>
                    </div>
                ))}
                <div className="has-text-centered">
                    <button onClick={props.messageFunction} className="button" style={btnStyles}>{btnText}</button>
                </div>
            </div>

        </div >
    )
}
export default CardTemplate;