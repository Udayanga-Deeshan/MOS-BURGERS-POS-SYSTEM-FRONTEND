import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="land-page-body">
        <header className="land-page-header">
          <div className="land-page-logo">MOS BURGERS</div>
        </header>

        <section className="land-page-hero">
          <div className="land-page-hero-content">
            <h1 className="land-page-hero-text">BIG TASTE. ZERO COMPROMISE</h1>
            <p className="land-page-hero-subtext">
              Taste the difference. Fresh, handcrafted, and made just for you.
            </p>

            <div className="get-started-container">
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
                size="large"
                onClick={() => navigate("/home")}
                sx={{
                  borderRadius: "40px",
                  fontSize: "1.4rem",
                  padding: "16px 40px",
                  textTransform: "none",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                  backgroundColor: "#e6b800",
                  "&:hover": {
                    backgroundColor: "#ffcc00",
                    transform: "scale(1.06)",
                  },
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
