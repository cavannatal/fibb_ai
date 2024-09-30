import React from 'react';
import { motion } from 'framer-motion';
import logoImage from '../../components/images/FibbLogoBlack.svg'

const TOSPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16">
      <motion.div 
        className="max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <img src={logoImage} alt="Fibb.ai Logo" className="mx-auto mb-8" style={{ width: '200px' }} />
          <h1 className="text-4xl font-bold mb-4 text-[#084248]">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: September 30, 2024</p>
        </header>

        <div className="bg-gray-50 rounded-lg shadow-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">1. Introduction</h2>
            <p className="text-gray-700">
              Fibb.ai is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services. By using Fibb.ai, you agree to the terms outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Uploaded Images:</strong> Fibb.ai collects and stores images you upload for the purpose of photo generation and model training. These images are retained as necessary to provide the requested services.</li>
              <li><strong>Personal Information:</strong> We may collect information such as your name, email address, and payment details when you use our services.</li>
              <li><strong>Payment Information:</strong> All payment processing is handled through secure third-party payment processors. Fibb.ai does not store your credit card or payment details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>To Provide Services:</strong> Your uploaded images and personal information are used solely to deliver the photo generation and model training services you request.</li>
              <li><strong>Service Improvement:</strong> We may use aggregate, non-identifiable data to improve the quality and functionality of our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">4. Data Retention and Storage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Image Storage:</strong> User-uploaded images are stored for the purpose of image generation and model training. These images are retained only as long as necessary to complete the requested services or as required by law.</li>
              <li><strong>Personal Data:</strong> We retain your personal information only for as long as necessary to provide our services, fulfill legal obligations, or resolve disputes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">5. Data Security</h2>
            <p>
              Fibb.ai takes the security of your data seriously. We employ industry-standard encryption and security measures to protect your information from unauthorized access, disclosure, or destruction. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">6. Sharing Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Third-Party Processors:</strong> We do not share your images or personal data with any third parties, except when required to complete a transaction (e.g., payment processors) or as required by law.</li>
              <li><strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid legal requests from government authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">7. Prohibited Use of Services</h2>
            <p>
              Fibb.ai prohibits the use of its services for creating or generating content that includes:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Nudity or sexually explicit material</li>
              <li>Images of minors or illegal activities</li>
              <li>Non-consensual deepfakes or likenesses of individuals without their permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">8. User Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Access:</strong> Request access to the personal data we hold about you.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data after the completion of services.</li>
              <li><strong>Correction:</strong> Correct any inaccuracies in your personal data.</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us at support@fibb.ai.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">9. Changes to This Privacy Policy</h2>
            <p>
              Fibb.ai reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#084248]">10. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> support@fibb.ai
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TOSPage;