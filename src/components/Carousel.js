import React from "react";
import { Carousel, Container } from "react-bootstrap";

const CardImages = [
  {
    url: "https://res.cloudinary.com/dvfiw24p4/image/upload/v1744843703/Screenshot_2025-04-16_at_23.44.01_nf4vkr.png",
    alt: " Card 1"
  },
  {
    url: "https://res.cloudinary.com/dvfiw24p4/image/upload/v1744819957/Screenshot_2025-04-16_at_16.40.36_egzic8.png",
    alt: " Card 2"
  }
];

const CardCarousel = () => {
  return (
    <Container className="mt-3">
      <Carousel indicators={false} controls={true}>
        {CardImages.map((card, index) => (
          <Carousel.Item key={index} className="text-center p-3">
            <div className="d-flex justify-content-center">
              <img
                src={card.url}
                alt={card.alt}
                style={{
                  width: "496px",
                  height: "396px",
                  borderRadius: "30px 30px 30px 30px",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",

                }}
                className=""
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CardCarousel;
