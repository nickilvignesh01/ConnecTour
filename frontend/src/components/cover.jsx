import React from 'react';

const Cover = () => {
  return (
    <div
      className="py-5 text-center text-md-left"
      style={{
        position: "relative",
        color: "white"
      }}
    >
      {/* Background Image */}
      <div
        className="background-image"
        style={{
          backgroundImage: "url('/images/waterfalls-1655142703_c9bb5f0fe1eb890f6a76.webp')",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          filter: "blur(8px)",
          zIndex: -1
        }}
      ></div>
      
      <div className="container" style={{ position: "relative", zIndex: 1, marginTop: "10px" }}>
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h3 className="display-3" style={{ 
              fontSize: "2.5rem", 
              fontFamily: "'Lobster', cursive", 
              fontWeight: "bold", 
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" 
            }}>
              Discover More Than Just a Destination
            </h3>
          </div>
        </div>
        
        <div className="row align-items-center mb-5">
          <div className="col-12 col-md-6">
            <div className="p-4" style={{ 
              backgroundColor: "rgba(0, 0, 0, 0.6)", 
              borderRadius: "10px" 
            }}>
              <h4 style={{ 
                fontSize: "1.75rem", 
                fontFamily: "'Arial', sans-serif", 
                fontWeight: "bold" 
              }}>
                What We Offer:
              </h4>
              <div style={{ marginTop: "1.5rem" }}>
                <p><strong>Places & Hidden Gems:</strong> Discover popular and hidden destinations.</p>
                <p><strong>Guides & Heritage Places:</strong> Access detailed guides to must-see sites.</p>
                <p><strong>Local Food:</strong> Taste local cuisine with our curated guides.</p>
              </div>
              <br />
              <h4 style={{ 
                fontSize: "1.75rem", 
                fontFamily: "'Arial', sans-serif", 
                fontWeight: "bold" 
              }}>
                Why We Stand Out:
              </h4>
              <div style={{ marginTop: "1.5rem" }}>
                <p><strong>Community Contributions:</strong> Add and review places, foods, and stays.</p>
                <p><strong>Memorable Holidays:</strong> Enjoy memorable holidays with local foods and discover hidden gems.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img src="/images/ill7.jpeg" alt="Local Attractions" style={{ 
              maxWidth: "60%", 
              borderRadius: "10px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              marginBottom: "2rem"
            }} />
          </div>
        </div>
        
        <div className="row align-items-center">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img src="/images/foods.jpg" alt="Local Cuisine" style={{ 
              maxWidth: "80%", 
              borderRadius: "10px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              marginBottom: "2rem"
            }} />
          </div>
          <div className="col-12 col-md-6">
            <div className="p-4" style={{ 
              backgroundColor: "rgba(0, 0, 0, 0.6)", 
              borderRadius: "10px" 
            }}>
              <h4 style={{ 
                fontSize: "1.75rem", 
                fontFamily: "'Arial', sans-serif", 
                fontWeight: "bold" 
              }}>
                Discover More:
              </h4>
              <div style={{ marginTop: "1.5rem" }}>
                <p><strong>Exclusive Spots:</strong> Explore tranquil and unique local experiences.</p>
                <p><strong>Food Trails:</strong> Follow guides to the best local dishes.</p>
              </div>
              
              <div style={{ marginTop: "3rem" }}>
                <h4 style={{ 
                  fontSize: "1.75rem", 
                  fontFamily: "'Arial', sans-serif", 
                  fontWeight: "bold" 
                }}>
                  Why Choose Us:
                </h4>
                <div style={{ marginTop: "1.5rem" }}>
                  <p><strong>Comprehensive Guides:</strong> All information for a memorable trip.</p>
                  <p><strong>Empowering Local Communities:</strong> Support local businesses through contributions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
