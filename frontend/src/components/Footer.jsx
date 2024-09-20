const Footer = () => {
    return ( 
        <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <h2 style={{ color: "#02c03e" }}>ConnecTour</h2>
        <p>
          Explore the world while empowering local communities! Dive into
          vibrant cultures, support sustainable practices, and create lasting
          connections with the people you meet. Your journey not only enriches
          your life but also uplifts the communities you visit. Together, let's
          travel with purpose and make a positive impact globally.
        </p>
      </div>
      <div
        className="col-md-3"
        style={{ color: "#02c03e", marginLeft: "auto" }}
      >
        <h2>Mapsite</h2>
        <ul className="list-unstyled">
          <li>
            <a href="/home" className="text-light">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-light">
              About us
            </a>
          </li>
          <li>
            <a href="/Places" className="text-light">
              places
            </a>
          </li>
          <li>
            <a href="/gallery" className="text-light">
              photos
            </a>
          </li>
        </ul>
      </div>
      <div
        className="col-md-3"
        style={{ color: "#02c03e", marginLeft: "auto" }}
      >
        <h2>Contact</h2>
        <p>
          <a href="#" className="text-light">
            <i className="fa d-inline mr-3 text-muted fa-phone" />
            +91-9442595877
          </a>
        </p>
        <p>
          <a href="#" className="text-light">
            <i className="fa d-inline mr-3 text-muted fa-envelope-o" />
            info@ConnecTour.com
          </a>
        </p>
        <p>
          <a href="#" className="text-light">
            <i className="fa d-inline mr-3 fa-map-marker text-muted" />
            peelamedu,coimbatore.
          </a>
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center mt-3">
        <p>© Copyright 2024 ConnecTour - All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>

     );
}
 
export default Footer;