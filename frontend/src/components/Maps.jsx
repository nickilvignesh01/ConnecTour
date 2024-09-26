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
                 <div
                 className="background-image"
    style={{
        backgroundImage: "url('/images/rameswaram-1657003415_923d56f8f2fe1ac0f94a.webp')",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "150%",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.6, // Set opacity as a decimal value between 0 and 1
        width: "100%",
        filter: "blur(3px)",
        zIndex: -1,
    }}
            ></div>
            </div>
        </div>
    );
};

export default Maps;
