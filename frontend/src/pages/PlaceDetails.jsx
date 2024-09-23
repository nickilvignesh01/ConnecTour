import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles.css'; // Adjust the path as needed

const PlaceDetails = () => {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data for placeId:", placeId);
    fetch(`http://localhost:3001/api/places/${placeId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setPlaceData(data);
      })
      .catch(error => {
        console.error('Error fetching place details:', error);
      });
  }, [placeId]);

  const navigateToAddForm = () => {
    navigate(`/add-form/${placeId}`); // Pass placeId to AddForm
  };

  return (
    <div className="place-details">
      {placeData ? (
        <>
          <h1 className="place-name">{placeData.name}</h1>
          <p className="place-description">{placeData.description}</p>
          <img src={placeData.imageUrl} alt={placeData.name} className="place-image" />

          <section>
            <h2 className="section-title">Hotels</h2>
            {placeData.hotels && placeData.hotels.length > 0 ? (
              placeData.hotels.map((hotel, index) => (
                <div key={index} className="hotel-details">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.description}</p>
                  <img src={hotel.image} alt={hotel.name} className="item-image" />
                </div>
              ))
            ) : (
              <p>No hotels available for this place.</p>
            )}
          </section>

          <section>
            <h2 className="section-title">Hidden Places</h2>
            {placeData.hiddenPlaces && placeData.hiddenPlaces.length > 0 ? (
              placeData.hiddenPlaces.map((hiddenPlace, index) => (
                <div key={index} className="hidden-place-details">
                  <h3>{hiddenPlace.name}</h3>
                  <p>{hiddenPlace.description}</p>
                  <img src={hiddenPlace.image} alt={hiddenPlace.name} className="item-image" />
                </div>
              ))
            ) : (
              <p>No hidden places available for this place.</p>
            )}
          </section>

          <section>
            <h2 className="section-title">Foods</h2>
            {placeData.foods && placeData.foods.length > 0 ? (
              placeData.foods.map((food, index) => (
                <div key={index} className="food-details">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>
                  <img src={food.image} alt={food.name} className="item-image" />
                </div>
              ))
            ) : (
              <p>No foods available for this place.</p>
            )}
          </section>

          <section>
            <h2 className="section-title">Guides</h2>
            {placeData.guides && placeData.guides.length > 0 ? (
              placeData.guides.map((guide, index) => (
                <div key={index} className="guide-details">
                  <h3>{guide.name}</h3>
                  <p>{guide.description}</p>
                  <img src={guide.image} alt={guide.name} className="item-image" />
                </div>
              ))
            ) : (
              <p>No guides available for this place.</p>
            )}
          </section>

          <button onClick={navigateToAddForm}>Add</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaceDetails;
