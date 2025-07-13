import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link 
              href="/" 
              className="text-orange-500 hover:text-orange-600 transition-colors duration-200 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                DataInYourself E-Learning (OPC) Pvt Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our e-learning platform.
              </p>
              <p className="text-gray-700 mb-4">
                By using our Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Create an account on our platform</li>
                <li>Enroll in courses</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Educational background and interests</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Profile information and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>To provide and maintain our e-learning platform</li>
                <li>To process course enrollments and payments</li>
                <li>To communicate with you about your account and courses</li>
                <li>To send you updates, newsletters, and promotional materials</li>
                <li>To improve our services and develop new features</li>
                <li>To provide customer support and respond to enquiries</li>
                <li>To ensure platform security and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our platform, processing payments, or providing customer support.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
                <li><strong>Safety and Security:</strong> We may share information to protect the safety and security of our users and platform.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small files stored on your device that help us:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookie settings through your browser preferences, though disabling cookies may affect platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request deletion of your personal information, subject to legal requirements.</li>
                <li><strong>Portability:</strong> You can request a copy of your data in a portable format.</li>
                <li><strong>Opt-out:</strong> You can opt out of marketing communications at any time.</li>
                <li><strong>Withdrawal of Consent:</strong> You can withdraw consent for data processing where applicable.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will delete or anonymize your information when it is no longer needed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>DataInYourself E-Learning (OPC) Pvt Ltd</strong><br />
                  Email: mukulsharma1602@gmail.com<br />
                  Phone: 9558092200, 8839381619<br />
                  Address: [Your Business Address]
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising from this policy shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 