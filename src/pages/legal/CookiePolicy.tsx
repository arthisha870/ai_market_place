import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
      
      <div className="prose prose-indigo max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
        </p>
        
        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for several purposes, including:
        </p>
        <ul>
          <li>Essential cookies: These are necessary for the website to function properly</li>
          <li>Analytical/performance cookies: These allow us to recognize and count visitors and see how they move around our website</li>
          <li>Functionality cookies: These enable the website to provide enhanced functionality and personalization</li>
          <li>Targeting cookies: These record your visit to our website, the pages you visit, and the links you follow</li>
        </ul>
        
        <h2>3. Types of Cookies We Use</h2>
        <p>
          Our website uses the following types of cookies:
        </p>
        
        <h3>3.1 Session Cookies</h3>
        <p>
          These are temporary cookies that are erased when you close your browser. They do not contain personal data and are used to improve your experience on our site.
        </p>
        
        <h3>3.2 Persistent Cookies</h3>
        <p>
          These remain on your device for a specified period or until you delete them manually. They help us remember your preferences and settings.
        </p>
        
        <h3>3.3 First-Party Cookies</h3>
        <p>
          These are set directly by our website.
        </p>
        
        <h3>3.4 Third-Party Cookies</h3>
        <p>
          These are set by third parties who provide services to us, such as analytics providers.
        </p>
        
        <h2>4. Specific Cookies We Use</h2>
        <table className="min-w-full mt-4 mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Purpose</th>
              <th className="px-4 py-2 border">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">auth_token</td>
              <td className="px-4 py-2 border">Authentication</td>
              <td className="px-4 py-2 border">Session</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">preferences</td>
              <td className="px-4 py-2 border">User preferences</td>
              <td className="px-4 py-2 border">1 year</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">_ga</td>
              <td className="px-4 py-2 border">Google Analytics</td>
              <td className="px-4 py-2 border">2 years</td>
            </tr>
          </tbody>
        </table>
        
        <h2>5. Managing Cookies</h2>
        <p>
          You can manage cookies through your browser settings. Most browsers allow you to:
        </p>
        <ul>
          <li>Block all cookies</li>
          <li>Block specific types of cookies</li>
          <li>See what cookies have been stored on your device</li>
          <li>Delete specific cookies</li>
        </ul>
        <p>
          Please note that if you choose to block certain cookies, you may not be able to use all the features of our website.
        </p>
        
        <h2>6. How to Disable Cookies</h2>
        <p>
          You can disable cookies in your browser settings. Here are links to instructions for some popular browsers:
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
        </ul>
        
        <h2>7. Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>
        
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at:
          <br />
          Email: privacy@aitoolsmarketplace.com
        </p>
      </div>
    </div>
  );
} 