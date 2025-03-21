import "../styles/AddUserPage.css";

const SonstigeForm = ({ sonstigeData, setSonstigeData }) => {
  // handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSonstigeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="personal-data-container">
      {/* Sontige Info */}
      <div className="personal-data-form">
        <h2 className="form-title">Sonstige Informationen: </h2>
        <hr className="linie-divider" />

        <div className="form-grid-two-columns">
          <div className="form-group sonstige">
            <label className="label" htmlFor="vorliebe">
              Vorlieben:
            </label>
            <textarea
              id="vorliebe"
              placeholder="Vorlieben eingeben"
              name="vorliebe"
              value={sonstigeData.vorliebe || ""}
              onChange={handleChange}
              className="multi-line-input"
              rows="4" // Adjust this value to set the number of visible rows
            />
          </div>

          <div className="form-group sonstige">
            <label className="label" htmlFor="abneigung">
              Abneigungen:
            </label>
            <textarea
              id="abneigung"
              placeholder="Abneigungen eingeben"
              name="abneigung"
              value={sonstigeData.abneigung || ""}
              onChange={handleChange}
              className="multi-line-input"
              rows="4" // Adjust this value to set the number of visible rows
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SonstigeForm;
