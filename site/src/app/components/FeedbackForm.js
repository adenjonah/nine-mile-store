'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    feedback: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // This would be replaced with actual form submission logic
      // For demo purposes, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        feedback: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="feedback" className="py-16 bg-background-alternate">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-status-success/10 border border-status-success p-8 rounded-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-status-success mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h2 className="text-2xl font-serif mb-4 text-text-primary">Thank You!</h2>
              <p className="text-text-primary mb-4">Your feedback has been submitted successfully.</p>
              <p className="text-text-primary">We appreciate your input and will use it to improve our store and services.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 bg-primary text-background-light px-6 py-3 rounded-sm font-medium hover:bg-primary-dark"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <div className="bg-background-light p-8 border border-primary/10 rounded-sm">
              <h2 className="text-3xl font-serif text-center mb-2 text-text-primary">We Want Your Feedback!</h2>
              <p className="text-center mb-8 text-text-secondary">
                Help us understand what products or services you&apos;d like to see at Nine Mile Feed & Hardware
              </p>
              
              {error && (
                <div className="mb-6 p-4 bg-status-error/10 border border-status-error rounded-sm">
                  <p className="text-text-primary">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-text-primary mb-2 font-medium" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-primary/20 bg-background-light text-text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-text-primary mb-2 font-medium" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-primary/20 bg-background-light text-text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-text-primary mb-2 font-medium" htmlFor="mobile">
                    Mobile Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-3 border border-primary/20 bg-background-light text-text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-text-primary mb-2 font-medium" htmlFor="feedback">
                    What products or services would you like to see at our store?
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-3 border border-primary/20 bg-background-light text-text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 bg-primary hover:bg-primary-dark text-background-light rounded-sm font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
                
                <p className="mt-8 text-center text-text-secondary bg-background-main p-4 rounded-sm border border-primary/10">
                  Your feedback helps us improve our store and better serve our community. Thank you!
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 