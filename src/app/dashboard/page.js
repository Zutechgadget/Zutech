"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel, Container } from "react-bootstrap";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import SingleProduct from "../../components/SingleProduct";
import "@/styles/App.css";
import Ipad from "@/app/ipad/page.js";

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
    <Container fluid className="my-4 mx-5 p-0">
      <Carousel indicators={false} controls={true} interval={3000} fade>
        {CardImages.map((card, index) => (
          <Carousel.Item 
            key={index} 
            className="d-block w-100"
            style={{ 
              height: "clamp(300px, 55vh, 700px)",
              aspectRatio: "16/9"
            }}
          >
            <div className="d-flex justify-content-center align-items-center h-100 p-1">
              <img
                src={`${card.url}?v=${Date.now()}`}
                alt={card.alt}
                className="img-fluid shadow-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
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

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <BigHead />

      <div className="mb-5 mx-0 text-center pb-5" style={{ minHeight: "45vh" }}>
        <CardCarousel />
      </div>

      <div className="mt-5 pt-5">
        <Ipad />
      </div>

      <div className="bg-white">
        <SingleProduct />
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4 mx-4 self-start"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}