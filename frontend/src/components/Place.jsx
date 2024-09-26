import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Place = () => {
  const { id } = useParams(); // Extracting 'id' from the URL
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      console.log('Fetching place with ID:', id); // Log the ID to ensure it's correct
      // Ensure the ID is valid before making the request
      if (id && id.length === 24) {
        try {
          const response = await axios.get(`http://localhost:5000/api/places/${id}`);
          setPlace(response.data);
        } catch (error) {
          console.error('Error fetching place data:', error.response ? error.response.data : error.message);
          setError(error.response?.data?.message || 'Error fetching place data. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid Place ID format');
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleAddSectionClick = () => {
    navigate(`/add-section/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      {place ? (
        <>
          <h1>{place.name}</h1>
          <p>{place.description}</p>

          <SectionList title="Hotels" sections={place.sections.filter(sec => sec.type === 'stays')} />
          <SectionList title="Hidden Places" sections={place.sections.filter(sec => sec.type === 'hidden')} />
          <SectionList title="Guides" sections={place.sections.filter(sec => sec.type === 'guides')} />
          <SectionList title="Foods" sections={place.sections.filter(sec => sec.type === 'food')} />

          <button onClick={handleAddSectionClick} style={{ display: 'block', marginTop: '20px' }}>
            Add Section
          </button>
        </>
      ) : (
        <p>No place details found.</p>
      )}
    </div>
  );
};

const SectionList = ({ title, sections }) => (
  <>
    <h2>{title}</h2>
    {sections.length > 0 ? (
      sections.map((sec, index) => (
        <div key={index}>
          <img src={sec.image} alt={sec.description} style={{ maxWidth: '100%', height: 'auto' }} />
          <p>{sec.description}</p>
        </div>
      ))
    ) : (
      <p>No {title.toLowerCase()} available.</p>
    )}
  </>
);

SectionList.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Place;
