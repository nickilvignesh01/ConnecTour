import React, { useState } from 'react';
import axios from 'axios';
import Video from '../components/Video';
import Slider from '../components/Slider';
import Views from '../components/Views';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/contact', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact">
        <div className="container box">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-12">
              <img src="/images/wildlife-1655142647_42a29910ad254ba4440d.webp" alt="Contact" />
            </div>
            <div className="col-lg-6 col-md-6 col-12 p-lg-5 p-2 my-5">
              <h1>Contact Us</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <textarea
                  className="form-control"
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button className="btn signin" style={{ color: "#fff9f9" }} type="submit">
                  Send Message
                </button>
              </form>
              {responseMessage && <p>{responseMessage}</p>}
            </div>
          </div>
        </div>
      </section>
      <Views />
      <Video />
      <Slider />
    </>
  );
};

export default Contact;
