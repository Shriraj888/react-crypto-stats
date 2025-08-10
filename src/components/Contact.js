import React, { useState, useCallback, useMemo } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
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
  }, []);

  // Memoize form validation
  const isFormValid = useMemo(() => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.message.trim() &&
           formData.email.includes('@');
  }, [formData]);

  // Memoize contact methods to prevent re-rendering
  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      title: "Email us",
      detail: "johndygreen@gmail.com",
      href: "mailto:johndygreen@gmail.com"
    },
    {
      icon: Phone,
      title: "Call us",
      detail: "(903) 905-4567",
      href: "tel:+19039054567"
    },
    {
      icon: MapPin,
      title: "Our location",
      detail: "Vendig Street, NY, US",
      href: "https://maps.google.com/?q=Vendig+Street+NY+US"
    }
  ], []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
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
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  className="contact-method"
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  aria-label={`Contact us via ${method.title}`}
                >
                  <div className="method-icon">
                    <method.icon size={20} />
                  </div>
                  <div className="method-details">
                    <h4>{method.title}</h4>
                    <p>{method.detail}</p>
                  </div>
                  <div className="method-arrow">→</div>
                </a>
              ))}
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
                disabled={submitStatus === 'loading' || !isFormValid}
                aria-label={submitStatus === 'loading' ? 'Sending message...' : 'Submit contact form'}
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
