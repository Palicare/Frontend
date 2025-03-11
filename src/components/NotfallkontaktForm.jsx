import "../styles/AddUserPage.css"; 


const NotfallkontaktForm = ({ notfallData, setNotfallData }) => {
    // 处理表单输入变化
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNotfallData((prevData) => ({
            ...prevData,
            [name]: value,
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
                        <input className=".form-group input"type="text" placeholder="Name eingeben" name="name" value={notfallData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Nachname:</label>
                        <input type="text" placeholder="Nachname eingeben"  name="nachname"  value={notfallData.nachname} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Geburtsdatum:</label>     
                        <input  type="text" placeholder="tt.mm.jjjj" name="geburtsdatum"  value={notfallData.geburtsdatum} onChange={handleChange}  />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Beziehung zu den Patienten:</label>
                        <input type="text" placeholder="Beziehung eingeben"  name="beziehung" value={notfallData.beziehung} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Kontakt Telefonnummer:</label>
                        <input type="text" placeholder="Telefonnummer eingeben" name="telefonnummer" value={notfallData.telefonnummer} onChange={handleChange}  />
                    </div>

                    <div className="form-group">
                        <label>Vollmacht: </label>
                        <select  name="vollmacht"  value={notfallData.vollmacht} onChange={handleChange}>
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
