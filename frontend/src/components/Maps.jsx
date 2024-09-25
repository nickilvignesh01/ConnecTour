import React from "react";
import "../Maps.css"; // Import CSS for styling

const Maps = () => {
    return (
        <div className="maps-container">
            <h2 className="maps-title">Explore Our destinations</h2> {/* Catchy title */}
            <div className="iframe-container">
                <iframe
                    src="https://www.google.com/maps/d/embed?mid=1pHg5zgPN17fyo_oVqGD3_8229kxNvto&ehbc=2E312F"
                    width="900"
                    height="600" /* Increased width and height */
                    title="Google Map"
                ></iframe>
            </div>
        </div>
    );
};

export default Maps;
