import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-indigo max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to AI Tools Marketplace. These Terms of Service govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these Terms.
        </p>
        
        <h2>2. Definitions</h2>
        <p>
          <strong>"Service"</strong> refers to the AI Tools Marketplace website and all content, services, and products available at or through the website.
          <br />
          <strong>"We," "us," and "our"</strong> refer to AI Tools Marketplace.
          <br />
          <strong>"You"</strong> refers to the individual accessing or using the Service, or the company or organization on behalf of which that individual is accessing the Service.
        </p>
        
        <h2>3. Access and Use of the Service</h2>
        <p>
          AI Tools Marketplace provides a platform for discovering and comparing AI tools. We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Service.
        </p>
        
        <h2>4. Account Registration</h2>
        <p>
          To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
        
        <h2>5. Content and Ownership</h2>
        <p>
          All content included on the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Service, is the property of AI Tools Marketplace or its suppliers and protected by copyright and other laws.
        </p>
        
        <h2>6. User Conduct</h2>
        <p>
          You agree not to use the Service for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the Service.
        </p>
        
        <h2>7. Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites or services that are not owned or controlled by AI Tools Marketplace. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        
        <h2>8. Termination</h2>
        <p>
          We may terminate or suspend your access to all or part of the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        
        <h2>9. Limitation of Liability</h2>
        <p>
          In no event shall AI Tools Marketplace, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
        
        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
        </p>
        
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at info@aitoolsmarketplace.com.
        </p>
      </div>
    </div>
  );
} 