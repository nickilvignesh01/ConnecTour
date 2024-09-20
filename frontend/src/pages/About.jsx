import Video from '../components/Video';
import Slider from '../components/Slider';
import Views from '../components/Views';
import Cover from '../components/cover';
import '../Style.css';  // Import the CSS file

const About = () => {
    return (  
        <section id="about" className="about-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-6 col-12">
                        <img
                            src="/images/GEN 3.webp"
                            className="img-fluid"
                            alt="Map"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 p-5 my-5">
                        <h2>ABOUT US</h2>
                        <p>
                            Welcome to ConnecTour, where we are passionate about transforming the
                            way travelers explore and experience the world. With a commitment to
                            sustainability, cultural authenticity, and innovative travel
                            solutions, we strive to revolutionize the tourism industry for both
                            visitors and local communities.
                            <br /><br />
                            At ConnecTour, we believe that travel should be more than just
                            sightseeing—it should be an immersive journey that connects travelers
                            with the heart and soul of destinations. Our mission is to enrich your
                            travel experience by uncovering hidden local treasures, promoting
                            sustainable tourism practices, and offering diverse and unique
                            accommodation options.
                            <br /><br />
                            Join us on a journey of discovery, sustainability, and cultural
                            immersion. Together, let's create meaningful travel experiences that
                            enrich lives and preserve the beauty of our world for future
                            generations.
                            <br /><br />
                            ConnecTour - Redefining Travel Experiences
                        </p>
                        <div className="call-to-action">
                            <a href="/contact" className="btn btn-primary">Contact Us</a>
                            <a href="/places" className="btn btn-secondary">Explore More</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <Cover />
            <Views />
            <Video />
            <Slider />
        </section>
    );
}

export default About;
