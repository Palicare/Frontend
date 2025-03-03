import "../styles/components/informationField.css";

const InformationField = ({ title, data }) => {
    return (
        <div className="informationField-container">
            <p className="informationField-title">{title}:</p>
            <hr className="informationField-divider" />
            {data.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
        </div>
    );
};

export default InformationField;

