import "../styles/components/informationFieldJSON.css";

const InformationField = ({ title, data }) => {
  let parsedData = {};

  try {
    if (Array.isArray(data)) {
      const jsonString = data.join(" "); 
      parsedData = JSON.parse(jsonString); 
    } else if (typeof data === "string") {
      parsedData = JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }
  
  return (
    <div className="informationField-container">
      <p className="informationField-title">{title}:</p>
      <hr className="informationField-divider" />
      {Object.entries(parsedData).map(([key, value], index) => (
        <div key={index}>
          <div>{key}</div>
          <div className="informationField-box">
            <p>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InformationField;
