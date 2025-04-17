import React from "react";
import { Carousel, Container } from "react-bootstrap";

const CardImages = [
  {
    url: "https://res.cloudinary.com/dvfiw24p4/image/upload/v1744843703/Screenshot_2025-04-16_at_23.44.01_nf4vkr.png",
    alt: "Card 1",
  },
  {
    url: "https://res.cloudinary.com/dvfiw24p4/image/upload/v1744819957/Screenshot_2025-04-16_at_16.40.36_egzic8.png",
    alt: "Card 2",
  },
];

const CardCarousel = () => {
  return (
    <Container fluid className="my-4 px-md-3 px-2">
      <Carousel indicators={false} controls={true} interval={3000} fade>
        {CardImages.map((card, index) => (
          <Carousel.Item key={index} style={{ height: "20vh", minHeight: "300px" }}>
            <div className="d-flex justify-content-center h-100">
              <img
                src={card.url}
                alt={card.alt}
                className="img-fluid shadow-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CardCarousel;