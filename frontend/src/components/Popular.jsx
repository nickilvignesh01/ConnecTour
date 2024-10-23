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
                                    href="/place-details/67195699f5fa54731107848b"
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
                                src="/images/coimba.jpeg"
                                className="card-img-top"
                                alt="World Heritage Sites"
                            />
                            <div className="card-body">
                                <h5 className="card-title">coimbatore</h5>
                                <p className="card-text">
                                    Explore beauty of coimbatore 
                                </p>
                                <a
                                    href="/place-details/671956a4f5fa54731107848d"
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
                                    href="/place-details/671956b2f5fa54731107848f"
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
                                    href="/place-details/671956bdf5fa547311078491"
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
                                src="/images/ch.jpeg"
                                className="card-img-top"
                                alt="Waterfalls"
                            />
                            <div className="card-body">
                                <h5 className="card-title">chennai</h5>
                                <p className="card-text">
                                    Discover metropolitan chennai beaches,malls,temples.
                                </p>
                                <a
                                    href="/place-details/671956dff5fa547311078493"
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
