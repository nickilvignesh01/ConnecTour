import Slider from "../components/Slider";

const MyStyledDiv = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#e0f7e9",
        padding: "10px",
        marginBottom: "14%",
        minHeight: '50vh', // Ensure the section covers some viewport height
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src="/images/GEN1.jpg"
        style={{
          width: "100%",
          height: "auto",
          position: 'absolute', // Ensure the image is positioned relative to the container
          top: 0,
          left: 0,
          marginBottom:15
        }}
        alt="Map"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "4rem",
          fontWeight: "bold",
          textShadow: "8px 4px 8px rgba(0, 0, 0, 2.8)",
          textAlign: 'center', // Center text alignment
          zIndex: 1 
        }}
      >
        DESTINATIONS
        <h2>"Empowering Travel - Embracing Diversity"</h2>
      </div>
    </div>
  );
};

const Places = () => {
  return (
    <>
      <MyStyledDiv />
      <section id="places" style={{ backgroundColor: "#DEF9C4" }}>
        <div className="container my-5">
          <div className="des">
            <h1 className="text-center mb-5"> .</h1>
            <div className="row">
              {[
                { src: "/images/ooty-1655457424_bca80f81e8391ebdaaca.webp", alt: "Ooty", title: "Ooty", link: "ootyDetails.html" },
                { src: "/images/thanjavur-1654770546_1a4fa1c088b5a3e91c74.webp", alt: "Thanjavur", title: "Thanjavur", link: "thanjavurDetails.html" },
                { src: "/images/kanyakumari-1654195435_bab3b5c9e1fc90ab56a8.webp", alt: "Kanniakumari", title: "Kanniyakumari", link: "kanyakumariDetails.html" },
                { src: "/images/kodaikanal.jpeg", alt: "Kodaikanal", title: "Kodaikanal", link: "kodaikanalDetails.html" },
                { src: "/images/kanchi.jpeg", alt: "Kancheepuram", title: "Kancheepuram", link: "kancheepuramDetails.html" },
                { src: "/images/chennai.jpeg", alt: "Mahabalipuram", title: "Mahabalipuram", link: "mahabalipuramDetails.html" },
                { src: "/images/mad.jpeg", alt: "Madurai", title: "Madurai", link: "maduraiDetails.html" },
                { src: "/images/ch.jpeg", alt: "Chennai", title: "Chennai", link: "chennaiDetails.html" },
                { src: "/images/vela.jpeg", alt: "Velankanni", title: "Velankanni", link: "velankanniDetails.html" },
                { src: "/images/coimba.jpeg", alt: "Coimbatore", title: "Coimbatore", link: "coimbatoreDetails.html", style: { height: "105%" } },
                { src: "/images/rameswaram-1657003415_923d56f8f2fe1ac0f94a.webp", alt: "Rameswaram", title: "Rameswaram", link: "rameswaramDetails.html" },
                { src: "/images/dharmapuri-1654194392_6e3e3cdfdd3337059dd5.webp", alt: "Dharmapuri", title: "Dharmapuri", link: "dharmapuriDetails.html" }
              ].map((place, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className="card">
                    <a href={place.link}>
                      <div className="card-img-container">
                        <img
                          src={place.src}
                          className="card-img"
                          alt={place.alt}
                          style={place.style}
                        />
                        <h5 className="card-title">{place.title}</h5>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Slider />
      {/* Bootstrap JS and dependencies */}
    </>
  );
}

export default Places;
