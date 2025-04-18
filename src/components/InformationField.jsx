import "../styles/components/informationField.css";

const InformationField = ({ title, data }) => {
    return (
        <div className="informationField-container">
            <p className="informationField-title">{title}:</p>
            <hr className="informationField-divider" />
            <div className="informationField-tags">
                {data.map((item, index) => (
                    <div key={index} className="informationField-tag">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InformationField;
