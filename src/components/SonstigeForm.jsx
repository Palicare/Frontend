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
            {/* Sontige info */}
            <div className="personal-data-form">
                <h2 className="form-title">Sonstige Informationen: </h2>
                <hr className="linie-divider" />

                <div className="form-grid">
                    <div className="form-group">
                        <label className=".form-group label">Zusatzangaben:</label>
                        <input className=".form-group input"type="text" placeholder="Zusätzliche Informationen eingeben" name="zusatz" value={ sonstigeData.zusatz} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Vorlieben:</label>
                        <input type="text" placeholder="Vorlieben eingeben"  name="vorliebe"  value={sonstigeData.vorliebe} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label className=".form-group label">Abneigungen:</label>     
                        <input  type="text" placeholder="Abneigungen eingeben" name="abneigung"  value={sonstigeData.abneigung} onChange={handleChange}  />
                    </div>

     
                </div>
            </div>
        </div>
        
      );
};

export default SonstigeForm;
