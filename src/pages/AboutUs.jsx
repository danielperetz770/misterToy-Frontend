export function AboutUs() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="page-container">
                    <div className="about-hero-content">
                        <h1>About Our Toy Store</h1>
                        <p className="hero-subtitle">Bringing joy and imagination to children and families since 2020</p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission">
                <div className="page-container">
                    <div className="mission-grid">
                        <div className="mission-content">
                            <h2>Our Mission</h2>
                            <p>We believe that every child deserves access to high-quality, educational, and fun toys that spark creativity and imagination. Our mission is to provide a carefully curated selection of toys that not only entertain but also contribute to a child's development and learning.</p>
                            <div className="mission-values">
                                <div className="value-item">
                                    <h3>🎯 Quality First</h3>
                                    <p>We only stock toys that meet the highest safety and quality standards</p>
                                </div>
                                <div className="value-item">
                                    <h3>🌟 Educational Value</h3>
                                    <p>Every toy in our collection is chosen for its learning potential</p>
                                </div>
                                <div className="value-item">
                                    <h3>💝 Customer Focus</h3>
                                    <p>Your satisfaction and your child's happiness are our top priorities</p>
                                </div>
                            </div>
                        </div>
                        <div className="mission-image">
                            <div className="image-placeholder">
                                <span>🎨</span>
                                <p>Creative Learning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-story">
                <div className="page-container">
                    <div className="story-content">
                        <h2>Our Story</h2>
                        <p>Founded in 2020, our toy store began with a simple idea: to create a place where parents could find toys that were not only fun but also beneficial for their children's development. What started as a small local shop has grown into a trusted destination for families seeking quality toys.</p>
                        <p>Today, we continue to expand our collection while maintaining the same commitment to quality and customer service that we had when we first opened our doors.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-contact">
                <div className="page-container">
                    <div className="contact-content">
                        <h2>Get in Touch</h2>
                        <p>Have questions about our toys or need recommendations? We'd love to hear from you!</p>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <p>info@mistertoy.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <h4>Address</h4>
                                    <p>123 Toy Street, Play City, PC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
