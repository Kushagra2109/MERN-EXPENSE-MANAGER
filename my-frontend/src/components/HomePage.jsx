import React from "react";
import "../styles/Homepage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";

function HomePage() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero d-flex align-items-center">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="text-section">
                            <h1 className="hero-title">
                                Take Control of Your <span>Expenses</span>
                            </h1>
                            <p className="hero-subtitle">
                                Track, manage, and analyze your spending with ease.
                                Your financial freedom starts here.
                            </p>
                            <div className="hero-buttons">
                                <Button variant="primary" size="lg" as={Link} to='/register'>
                                    Get Started
                                </Button>
                                <Button variant="outline-light" size="lg" as={Link} to='/login'>
                                    Login
                                </Button>
                            </div>
                        </Col>
                        <Col md={6} className="image-section">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135679.png"
                                alt="Expense Manager Illustration"
                                className="hero-img"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features py-5">
                <Container>
                    <h2 className="text-center mb-5">Why Choose KS Expense Manager?</h2>
                    <Row>
                        <Col md={4} className="feature-card">
                            <div className="card-body">
                                <i className="bi bi-graph-up-arrow feature-icon"></i>
                                <h4>Smart Tracking</h4>
                                <p>Monitor your income and expenses in real-time.</p>
                            </div>
                        </Col>
                        <Col md={4} className="feature-card">
                            <div className="card-body">
                                <i className="bi bi-wallet2 feature-icon"></i>
                                <h4>Budget Planning</h4>
                                <p>Set monthly budgets and stick to your goals.</p>
                            </div>
                        </Col>
                        <Col md={4} className="feature-card">
                            <div className="card-body">
                                <i className="bi bi-shield-lock feature-icon"></i>
                                <h4>Secure & Private</h4>
                                <p>Your data is encrypted and safe with us.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta text-center">
                <Container>
                    <h2>Start Your Financial Journey Today!</h2>
                    <p>Join thousands of users managing their money smarter.</p>
                    <Button variant="success" size="lg" as={Link} to='/register'>
                        Create Free Account
                    </Button>
                </Container>
            </section>
        </div>
    );
}

export default HomePage;
