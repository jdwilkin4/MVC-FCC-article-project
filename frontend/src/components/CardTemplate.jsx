const cardDimensions = { width: '300px', height: '30%' };
const btnText = 'Send reminder email';

const CardTemplate = (props) => {
    return (
        <div className="card" style={cardDimensions}>
            <div className="card-content">
                <h3 className="has-background-info	has-text-white	is-size-4 has-text-centered">{props.name}</h3>
                {props.arr.map((app, index) => (
                    <div className="is-flex is-flex-wrap-wrap	is-justify-content-center">
                        <p key={index}>{app.name}</p>
                    </div>
                ))}
                <div class="has-text-centered">
                    <button className="button is-info " style={{ cursor: 'pointer', marginTop: '10px' }}>{btnText}</button>
                </div>
            </div>
        </div>
    )
}
export default CardTemplate;