import "../styles/AddUserPage.css"; 


const NotfallkontaktForm = ({ patientData, setPatientData  }) => {//
    
    if (!patientData || !patientData.contact) {
        return <p>Loading...</p>; // **避免崩溃，等待数据加载**
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;
        if(name=="birthDate"){
            formattedValue = new Date(value).toISOString().split("T")[0];
        }
        if (name === "power") {
            formattedValue = value === "Ja";
        }               
         // 更新 `patientData.contact`，不再需要 `notfallData`
        setPatientData(prevData => ({
            ...prevData,
            contact: {
            ...prevData.contact, // 保持其他 `contact` 字段不变
            [name]: formattedValue
            }
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
                        <input className=".form-group input"type="text" placeholder="Name eingeben" name="firstName" value={patientData.contact.firstName|| ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Nachname:</label>
                        <input type="text" placeholder="Nachname eingeben"  name="lastName"  value={patientData.contact.lastName|| ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Geburtsdatum:</label>     
                        <input  type="date" name="birthDate"  value={patientData.contact.birthDate|| ""} onChange={handleChange}  />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Beziehung zu den Patienten:</label>
                        <input type="text" placeholder="Beziehung eingeben"  name="relation" value={patientData.contact.relation|| ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Telefonnummer:</label>
                        <input type="text" placeholder="Telefonnummer eingeben" name="phoneNumber" value={patientData.contact.phoneNumber|| ""} onChange={handleChange}  />
                    </div>

                    <div className="form-group">
                        <label>Vollmacht: </label>
                        <select  name="power"  value={patientData.contact.power|| ""} onChange={handleChange}>
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
