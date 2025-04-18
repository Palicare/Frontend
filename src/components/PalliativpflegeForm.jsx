import "../styles/AddUserPage.css"; 
import { useState } from "react";

const PalliativepflegeForm = ({ pflegebedarf, setPflegebedarf }) => {
    const [pflegeInput, setPflegeInput] = useState("");

    // 处理输入框变化
    const handleChange = (event) => {
        setPflegeInput(event.target.value);
    };

    // 添加 Pflegebedarf
    const addPflegebedarf = () => {
        if (pflegeInput.trim()) {
            setPflegebedarf((prevData) => ({
                ...prevData,
                careNeeds: [...prevData.careNeeds, pflegeInput.trim()] // ✅ 直接存入数组
            }));
            setPflegeInput(""); // 清空输入框
        }
    };

    // 移除 Pflegebedarf
    const removePflegebedarf = (index) => {
        setPflegebedarf((prevData) => ({
            ...prevData,
            careNeeds: prevData.careNeeds.filter((_, i) => i !== index) // ✅ 过滤数组
        }));
    };

    return (
        <div className="personal-data-container">         
        <div className="personal-data-form">
             <h2 className="form-title">Palliativpflege:</h2>
             <hr className="linie-divider" />

                {/* Pflegebedarf 输入框 */}
            <div className="medical-section">
             <label className="medical-label">Pflegebedarf:</label>
                <div className="medical-input-group">
                    <input
                            type="text"
                            name="careNeeds"
                            value={pflegeInput|| ""}
                            onChange={handleChange}
                            placeholder="Palliative Informationen eingeben"
                            className="medical-input"
                    />
                    <button onClick={addPflegebedarf} className="medical-add-button">+</button>
                    </div>
            
                    {/* 渲染 Pflegebedarf 列表 */}
                    {pflegebedarf.careNeeds.length > 0 && (
                        <ul className="medical-display">
                            {pflegebedarf.careNeeds.map((careNeed, index) => (
                                <span key={index} className="medical-item">
                                    {careNeed} <button onClick={() => removePflegebedarf(index)} className="medical-remove-button">x</button>
                                </span>
                            ))}
                        </ul>
                    )}
              </div>  
            </div>
        </div>
    );
};

export default PalliativepflegeForm;
