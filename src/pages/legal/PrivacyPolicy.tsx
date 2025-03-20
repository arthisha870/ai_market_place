import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-indigo max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. Introduction</h2>
        <p>
          At AI Tools Marketplace, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        
        <h2>2. Information We Collect</h2>
        <p>
          We may collect several types of information from and about users of our website, including:
        </p>
        <ul>
          <li>Personal information such as name, email address, and other identifiers you choose to provide when registering an account</li>
          <li>Usage information about your activity on our website</li>
          <li>Device and connection information such as IP address, browser type, and operating system</li>
        </ul>
        
        <h2>3. How We Collect Information</h2>
        <p>
          We collect information:
        </p>
        <ul>
          <li>Directly from you when you provide it to us (e.g., when registering an account)</li>
          <li>Automatically as you navigate through the site (e.g., using cookies and similar technologies)</li>
          <li>From third parties that are connected with our services</li>
        </ul>
        
        <h2>4. How We Use Your Information</h2>
        <p>
          We may use the information we collect about you for various purposes, including:
        </p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Communicating with you about our services</li>
          <li>Personalizing your experience</li>
          <li>Monitoring and analyzing usage patterns</li>
          <li>Protecting our services and enforcing our policies</li>
        </ul>
        
        <h2>5. Disclosure of Your Information</h2>
        <p>
          We may disclose your personal information:
        </p>
        <ul>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>With third-party service providers who perform services on our behalf</li>
          <li>With your consent or at your direction</li>
        </ul>
        
        <h2>6. Data Security</h2>
        <p>
          We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
        </p>
        
        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, such as:
        </p>
        <ul>
          <li>The right to access and receive a copy of your personal information</li>
          <li>The right to rectify or update your personal information</li>
          <li>The right to request deletion of your personal information</li>
          <li>The right to restrict or object to our processing of your personal information</li>
        </ul>
        
        <h2>8. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our website. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent.
        </p>
        
        <h2>9. Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13.
        </p>
        
        <h2>10. Changes to Our Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective.
        </p>
        
        <h2>11. Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@aitoolsmarketplace.com
        </p>
      </div>
    </div>
  );
} 