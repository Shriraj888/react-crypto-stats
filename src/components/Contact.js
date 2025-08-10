import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Large CONTACT Background Text */}
        <div className="contact-bg-text">CONTACT</div>
        
        <div className="contact-content">
          {/* Left side - Contact Info */}
          <div className="contact-info">
            <div className="contact-header">
              <div className="contact-badge">
                <div className="contact-icon-small">
                  <Mail size={16} />
                </div>
                <span>Contact</span>
              </div>
              <h2>Get in touch</h2>
              <p>Have questions or ready to transform your business with AI automation?</p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <Mail size={20} />
                </div>
                <div className="method-details">
                  <h4>Email us</h4>
                  <p>johndygreen@gmail.com</p>
                </div>
                <div className="method-arrow">→</div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Phone size={20} />
                </div>
                <div className="method-details">
                  <h4>Call us</h4>
                  <p>(903) 905-4567</p>
                </div>
                <div className="method-arrow">→</div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <MapPin size={20} />
                </div>
                <div className="method-details">
                  <h4>Our location</h4>
                  <p>Vendig Street, NY, US</p>
                </div>
                <div className="method-arrow">→</div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Message"
                  className="form-textarea"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  'Submit'
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
