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
    <Container className="mt-3">
      <Carousel indicators={false} controls={true}>
        {CardImages.map((card, index) => (
          <Carousel.Item key={index} className="text-center p-2">
            <div className="d-flex justify-content-center">
              <img
                src={card.url}
                alt={card.alt}
                className="img-fluid shadow-lg"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  borderRadius: "30px",
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
