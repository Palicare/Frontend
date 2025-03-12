import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import Header from "../components/Header.jsx";
import PatientCard from "../components/patientCard.jsx";
import "../styles/patientenProfile.css";
import searchIcon from "../Assets/searchIcon.svg";

const Patientenprofile = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm]);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const endpoint = searchTerm
        ? `${API_BASE_URL}/patients/search?query=${encodeURIComponent(
            searchTerm
          )}&page=${currentPage}&size=${pageSize}`
        : `${API_BASE_URL}/patients?page=${currentPage}&size=${pageSize}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.status}`);
      }

      const data = await response.json();
      setPatients(data.content);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError("Patienten konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxVisiblePages = 8;

    buttons.push(
      <button
        key="first"
        onClick={() => handlePageChange(0)}
        disabled={currentPage === 0}
        className="pagination-button"
      >
        &lt;&lt;
      </button>
    );

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="pagination-button"
      >
        &lt;
      </button>
    );

    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);

      if (currentPage <= halfVisible) {
        startPage = 0;
        endPage = maxVisiblePages - 1;
      } else if (currentPage >= totalPages - halfVisible - 1) {
        startPage = totalPages - maxVisiblePages;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i + 1}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="pagination-button"
      >
        &gt;
      </button>
    );

    buttons.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className="pagination-button"
      >
        &gt;&gt;
      </button>
    );

    return buttons;
  };

  return (
    <div className="patientenprofile-container">
      <Header isHomeScreen={true} />
      <div className="content-container">
        {/* <div className="page-title">
          <h1>Patientenprofile</h1>
        </div> */}

        <div className="search-container">
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <img src={searchIcon} alt="Search" className="search-icon" />
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Patienten werden geladen...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="patients-list">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))
            ) : (
              <div className="no-patients">
                <p>Keine Patienten gefunden</p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="pagination">{renderPaginationButtons()}</div>
        )}
      </div>
    </div>
  );
};

export default Patientenprofile;
