import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Disclaimer</h1>
      
      <div className="prose prose-indigo max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>1. Website Information</h2>
        <p>
          The information provided on AI Tools Marketplace is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>
        
        <h2>2. Not Professional Advice</h2>
        <p>
          The information on AI Tools Marketplace is not intended as professional advice. Before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice.
        </p>
        
        <h2>3. External Links</h2>
        <p>
          AI Tools Marketplace may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>
        
        <h2>4. Errors and Omissions</h2>
        <p>
          The information given by AI Tools Marketplace is for general guidance on matters of interest only. Even if we take every precaution to ensure that the content of the website is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules, and regulations, there may be delays, omissions, or inaccuracies in the information contained on the website.
        </p>
        
        <h2>5. Fair Use Disclaimer</h2>
        <p>
          AI Tools Marketplace may use copyrighted material that has not always been specifically authorized by the copyright owner. We are making such material available for criticism, comment, news reporting, teaching, scholarship, or research. We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law.
        </p>
        
        <h2>6. Views Expressed Disclaimer</h2>
        <p>
          Any views and opinions that may be expressed in user-generated comments on AI Tools Marketplace are the views and opinions of the individual user and do not reflect the views of AI Tools Marketplace. We reserve the right to monitor all comments and to remove any that can be considered inappropriate, offensive, or in violation of the terms and conditions of this website.
        </p>
        
        <h2>7. No Responsibility Disclaimer</h2>
        <p>
          In no event shall AI Tools Marketplace be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence, or other tort, arising out of or in connection with the use of the service or the contents of the service.
        </p>
        
        <h2>8. "Use at Your Own Risk" Disclaimer</h2>
        <p>
          All information in AI Tools Marketplace is provided "as is," with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.
        </p>
        
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Disclaimer, please contact us at:
          <br />
          Email: info@aitoolsmarketplace.com
        </p>
      </div>
    </div>
  );
} 