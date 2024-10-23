const Experiences = () => {
  return ( 
      <section id="places">
<div className="container my-5">
  <h1
    className="text-center mb-5"
    style={{ fontFamily: "Arial, sans-serif", color: "#333" }}
  >
    Experiences
  </h1>
  <div className="row justify-content-center">
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
      <div
        className="card shadow-sm"
        style={{ borderRadius: 15, overflow: "hidden" }}
      >
        <img
          src="/images/adv.jpg"
          className="card-img-top"
          alt="Adventure"
          style={{ height: 200, objectFit: "cover" }}
        />
        <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Adventure
          </h5>
          <p className="card-text">
            Experience thrilling outdoor activities and stunning panoramic
            views, nestled in the hills of Madurai.
          </p>
          <a
            href="/place-details/671956bdf5fa547311078491"
            className="btn btn-primary"
            style={{ borderRadius: 5, padding: "10px 20px" }}
          >
            Go
          </a>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
      <div
        className="card shadow-sm"
        style={{ borderRadius: 15, overflow: "hidden" }}
      >
        <img
          src="/images/foods.jpg"
          className="card-img-top"
          alt="Local Foods"
          style={{ height: 200, objectFit: "cover" }}
        />
        <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Local Foods
          </h5>
          <p className="card-text">
            Discover a diverse range of local cuisines that capture the
            essence of the region's culinary heritage.
          </p>
          <a
            href="/place-details/605c72ef1b7e3b4c0e8b4567"
            className="btn btn-primary"
            style={{ borderRadius: 5, padding: "10px 20px" }}
          >
            Go
          </a>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
      <div
        className="card shadow-sm"
        style={{ borderRadius: 15, overflow: "hidden" }}
      >
        <img
          src="/images/sprit1.jpg"
          className="card-img-top"
          alt="Spiritual"
          style={{ height: 200, objectFit: "cover" }}
        />
        <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Spiritual
          </h5>
          <p className="card-text">
            Explore serene temples and spiritual sites that offer a glimpse
            into the region's rich cultural and spiritual traditions.
          </p>
          <a
            href="/place-details/67195699f5fa54731107848b"
            className="btn btn-primary"
            style={{ borderRadius: 5, padding: "10px 20px" }}
          >
            Go
          </a>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
      <div
        className="card shadow-sm"
        style={{ borderRadius: 15, overflow: "hidden" }}
      >
        <img
          src="/images/wild.jpeg"
          className="card-img-top"
          alt="Heritage"
          style={{ height: 200, objectFit: "cover" }}
        />
        <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            wild life
          </h5>
          <p className="card-text">
            Immerse yourself in the region's history through its heritage
            sites, showcasing architectural marvels and historical
            significance.
          </p>
          <a
            href="/place-details/671956b2f5fa54731107848f"
            className="btn btn-primary"
            style={{ borderRadius: 5, padding: "10px 20px" }}
          >
            Go
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

   );
}

export default Experiences;