import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setSubmitStatus('loading');
    
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "support@cryptotracker.com",
      description: "Get in touch via email"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "24/7 customer support"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "123 Blockchain Street, Crypto City, CC 12345",
      description: "Our headquarters"
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>Have questions or need support? We're here to help you succeed in your crypto journey</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    <p className="contact-value">{info.content}</p>
                    <p className="contact-desc">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="modern-button"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  <CheckCircle size={16} />
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
