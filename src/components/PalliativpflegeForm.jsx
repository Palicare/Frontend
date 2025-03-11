import "../styles/AddUserPage.css"; 

const PalliativepflegeForm = ({ pflegebedarf, setPflegebedarf }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPflegebedarf((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div className="personal-data-container">         
        <div className="personal-data-form">
            <h2 className="form-title">Palliativpflege:</h2>
            <hr className="linie-divider" />
            <div className="form-grid-PalliativeForm">
                {/* Palliativ-Form */}
                <div className="form-group">
                    <label>Pflegebedarf:</label>
                    <input className="form-input-PalliativeForm" type="text" placeholder="Palliative Informationen eingeben"  name="pflegebedarf" value={pflegebedarf.pflegebedarf} onChange={handleChange} />
                </div> 
            </div>

        </div>
        </div>
        
      );
};

export default PalliativepflegeForm;