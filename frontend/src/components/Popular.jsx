// src/components/Popular.jsx
import React from 'react';
import '../Style.css'; // Make sure to import your CSS file

const Popular = () => {
    return ( 
        <>
        {/*-places*/}
        <section id="places" style={{ backgroundColor: "#E7F0DC" }}>
            <div className="container my-5">
                <h1 className="text-center mb-5" style={{ color: "#006400" }}>Popular</h1>
                <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/ooty-1655457424_bca80f81e8391ebdaaca.webp"
                                className="card-img-top"
                                alt="Ooty"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Ooty</h5>
                                <p className="card-text">
                                    Experience the beauty of Ooty's hills and tea estates.
                                </p>
                                <a
                                    href="/place-details/605c72ef1b7e3b4c0e8b4567"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/alagar-kovil-1656162510_8c9dad4870cf75c56674.webp"
                                className="card-img-top"
                                alt="Alagar Kovil"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Alagar Kovil</h5>
                                <p className="card-text">
                                    Situated on a hill ,a popular destination
                                    in Madurai.
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/world-heritage-sites-1655143670_a557d11ac840b3cde674.webp"
                                className="card-img-top"
                                alt="World Heritage Sites"
                            />
                            <div className="card-body">
                                <h5 className="card-title">World Heritage Sites</h5>
                                <p className="card-text">
                                    Explore the world's heritage sites 
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/brihadeeswara-temple-1654763464_bfe471b31611964a6a2c.webp"
                                className="card-img-top"
                                alt="Brihadeeswara Temple"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Brihadeeswara Temple</h5>
                                <p className="card-text">
                                    Discover the grandeur of Brihadeeswara Temple, a UNESCO World
                                    Heritage site.
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/dharmapuri-1654194392_6e3e3cdfdd3337059dd5.webp"
                                className="card-img-top"
                                alt="Dharmapuri"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Dharmapuri</h5>
                                <p className="card-text">
                                    Explore the serene landscapes and cultural richness of
                                    Dharmapuri.
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <img
                                src="/images/waterfalls-1655142703_c9bb5f0fe1eb890f6a76.webp"
                                className="card-img-top"
                                alt="Waterfalls"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Waterfalls</h5>
                                <p className="card-text">
                                    Discover breathtaking waterfalls and natural wonders.
                                </p>
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Popular;
