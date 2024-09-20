import React, { useState, useEffect, useRef } from 'react';
import '../Style.css'; // Import your CSS file

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const showSlides = () => {
      const slides = slidesRef.current;
      const dots = dotsRef.current;

      if (slides.length === 0 || dots.length === 0) return; // Guard clause

      slides.forEach((slide) => {
        slide.style.display = 'none';
        slide.style.opacity = 0;
      });

      if (slideIndex > slides.length) setSlideIndex(1);
      if (slideIndex < 1) setSlideIndex(slides.length);

      slides[slideIndex - 1].style.display = 'block';
      setTimeout(() => {
        slides[slideIndex - 1].style.opacity = 1;
      }, 50);

      dots.forEach((dot) => dot.classList.remove('active'));
      if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
      }
    };

    showSlides();
    const slideInterval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex % slidesRef.current.length) + 1);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slideIndex]);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + n;
      return newIndex > slidesRef.current.length ? 1 : newIndex < 1 ? slidesRef.current.length : newIndex;
    });
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <section id="slider">
      <div className="slideshow-container">
        <div className="mySlides fade" ref={(el) => (slidesRef.current[0] = el)}>
          <img src="/images/rameswaram-1657461832_79c34f9c9aa78af777bc.webp" style={{ width: '100%' }} alt="Slide 1" />
        </div>
        <div className="mySlides fade" ref={(el) => (slidesRef.current[1] = el)}>
          <img src="/images/palaces-1655143260_215be284dbb80b6725f7.webp" style={{ width: '100%' }} alt="Slide 2" />
        </div>
        <div className="mySlides fade" ref={(el) => (slidesRef.current[2] = el)}>
          <img src="/images/chembarambakkam-tank-1657466906_4e7afa1759927255c91f.webp" style={{ width: '100%' }} alt="Slide 3" />
        </div>
        <div className="mySlides fade" ref={(el) => (slidesRef.current[3] = el)}>
          <img src="/images/dhanushkodi-1657617190_a01160e4f134648aa6de.webp" style={{ width: '100%' }} alt="Slide 4" />
        </div>
        <div className="mySlides fade" ref={(el) => (slidesRef.current[4] = el)}>
          <img src="/images/agni-theertham-beach-1656502937_91425150d5d4e1e8b260.webp" style={{ width: '100%' }} alt="Slide 5" />
        </div>
        <div className="mySlides fade" ref={(el) => (slidesRef.current[5] = el)}>
          <img src="/images/pichavaram-1657806568_0d280b5f92dc337bc53a.webp" style={{ width: '100%' }} alt="Slide 6" />
        </div>
        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <span className="dot" ref={(el) => (dotsRef.current[0] = el)} onClick={() => currentSlide(1)}></span>
        <span className="dot" ref={(el) => (dotsRef.current[1] = el)} onClick={() => currentSlide(2)}></span>
        <span className="dot" ref={(el) => (dotsRef.current[2] = el)} onClick={() => currentSlide(3)}></span>
      </div>
    </section>
  );
};

export default Slider;
