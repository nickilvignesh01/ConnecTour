const Video = () => {
    return (
        <div className="video">
            <div
                className="py-5 text-center text-white"
                style={{ position: "relative", overflow: "hidden" }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        minWidth: "100%",
                        height: "100%", // Set height to cover the container
                        zIndex: -100
                    }}
                >
                    <source src="/images/tn.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container py-5">
                    <div className="row">
                        <div
                            className="col-lg-8 col-md-10 mx-auto"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                borderRadius: 10,
                                padding: 20
                            }}
                        >
                            <h1
                                className="mb-4 display-4"
                                style={{
                                    color: "#02c03e",
                                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)"
                                }}
                            >
                             <b>  ConnecTour</b>
                            </h1>
                            <p
                                className="lead mb-5"
                                style={{
                                    color: "#ffffff",
                                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)"
                                }}
                            >
                                "Experience the richness of diverse cultures and vibrant traditions.
                                Embark on a journey through Tamilnadu and uncover its hidden gems!"
                            </p>
                            <a
                                href="/places"
                                className="btn btn-lg btn-primary mx-1"
                                style={{
                                    backgroundColor: "#02c03e",
                                    borderColor: "#02c03e",
                                    color: "white",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "0.25rem",
                                    textDecoration: "none",
                                    display: "inline-block",
                                    fontSize: "1.25rem"
                                }}
                            >
                                Explore
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
