import "../styles/AddUserPage.css"; 


const NotfallkontaktForm = ({ notfallData, setNotfallData }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        const formattedValue = name === "birthDate" ? new Date(value).toISOString().split("T")[0] : value;
        setNotfallData((prevData) => ({
          ...prevData,
          [name]: formattedValue,
        }));
    };
    
    return (
        <div className="personal-data-container">         
            {/* Notfallkontakt Info */}
            <div className="personal-data-form">
                <h2 className="form-title">Notfallkontakt: </h2>
                <hr className="linie-divider" />

                <div className="form-grid">
                    <div className="form-group">
                        <label className=".form-group label">Name:</label>
                        <input className=".form-group input"type="text" placeholder="Name eingeben" name="firstName" value={notfallData.firstName|| ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Nachname:</label>
                        <input type="text" placeholder="Nachname eingeben"  name="lastName"  value={notfallData.lastName|| ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Geburtsdatum:</label>     
                        <input  type="date" name="birthDate"  value={notfallData.birthDate|| ""} onChange={handleChange}  />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Beziehung zu den Patienten:</label>
                        <input type="text" placeholder="Beziehung eingeben"  name="relation" value={notfallData.relation|| ""} onChange={handleChange} />
                    </div>

                    {/* <div className="form-group">
                        <label className=".form-group label">Kontakt Telefonnummer:</label>
                        <input type="text" placeholder="Telefonnummer eingeben" name="telefonnummer" value={notfallData.telefonnummer} onChange={handleChange}  />
                    </div> */}

                    <div className="form-group">
                        <label>Vollmacht: </label>
                        <select  name="power"  value={notfallData.power|| ""} onChange={handleChange}>
                        <option value="" disabled hidden>Bitte wählen...</option>
                        <option>Ja</option>
                        <option>Nein</option>
                        </select>
                    </div>                    
                </div>
            </div>
        </div>
        
      );
};

export default NotfallkontaktForm;
