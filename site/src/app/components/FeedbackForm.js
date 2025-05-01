'use client';

import { useState, Suspense } from 'react';
import SuccessMessage from './SuccessMessage';

export default function FeedbackForm() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-12 bg-background-alternate">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={null}>
            <SuccessMessage />
          </Suspense>
          
          <div className="bg-background-light p-8 border border-primary/10 rounded-sm">
            <h2 className="text-3xl font-serif text-center mb-2 text-text-primary">We Want Your Feedback!</h2>
            <p className="text-center mb-8 text-text-secondary">
              Help us understand what products or services you&apos;d like to see at Nine Mile Feed & Hardware
            </p>
            
            {/* Direct form submission to FormSubmit.co */}
            <form action="https://formsubmit.co/adenjonah@gmail.com" method="POST">
              {/* FormSubmit configuration */}
              <input type="hidden" name="_next" value="https://ninemilestore.com/?success=true" />
              <input type="hidden" name="_subject" value="New Feedback for Nine Mile Store" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{display: 'none'}} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_debug" value="true" />
              
              <div className="mb-6">
                <label className="block text-text-primary mb-2 font-medium" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
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
                  value={formValues.lastName}
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
                  value={formValues.mobile}
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
                  value={formValues.feedback}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-primary/20 bg-background-light text-text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-background-light rounded-sm font-medium"
                >
                  Submit Feedback
                </button>
              </div>
              
              <p className="mt-8 text-center text-text-secondary bg-background-main p-4 rounded-sm border border-primary/10">
                Your feedback helps us improve our store and better serve our community. Thank you!
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 