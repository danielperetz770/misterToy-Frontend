
import heroImg from '../assets/img/toys-Img.png'

export function HomePage() {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="home-hero">
                <div className="page-container">
                    <div className="hero-grid">
                        <div className="hero-text">
                            <h1>Welcome To Toy Page!</h1>
                            <p className="hero-subtitle">Discover fun, colorful, and inspiring toys for everyone.</p>
                            <div className="hero-actions">
                                <a href="/toy" className="btn btn-primary">Explore Toys</a>
                                <a href="/about" className="btn btn-secondary">Learn More</a>
                            </div>
                        </div>
                        <div className="hero-media">
                            <img src={heroImg} alt="Toys hero" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="home-features">
                <div className="page-container">
                    <h2 className="section-title">Why Choose Our Toy Store?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Quality Assured</h3>
                            <p>All our toys meet the highest safety and quality standards</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🚚</div>
                            <h3>Fast Delivery</h3>
                            <p>Quick and reliable shipping to your doorstep</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💝</div>
                            <h3>Perfect Gifts</h3>
                            <p>Find the perfect toy for any occasion</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌟</div>
                            <h3>Customer Satisfaction</h3>
                            <p>Dedicated support to ensure your happiness</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="home-cta">
                <div className="page-container">
                    <div className="cta-content">
                        <h2>Ready to Start Shopping?</h2>
                        <p>Join thousands of happy customers who trust us for their toy needs</p>
                        <a href="/toy" className="btn btn-primary btn-large">Shop Now</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
