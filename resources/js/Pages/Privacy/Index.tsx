import RegHeader from "@/Components/RegistrationHeader";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { Head, useForm } from '@inertiajs/react';

interface PolicySectionData {
  title: string;
  content: string;
}

const policySections: PolicySectionData[] = [
  {
    title: "1. What We Collect",
    content: `We collect personal data only when it helps us provide, improve, or personalize your coaching experience. This includes your name, email, and password; your fitness preferences, goals, and responses to coaching; any messages or feedback you submit; device and browser information; IP address and session logs; usage patterns and interaction data; and cookies and analytics data used for performance and personalization.`
  },
  {
    title: "2. How We Use Your Data",
    content: `We use your data to generate and deliver AI-driven coaching messages, personalize your fitness experience, improve the accuracy and effectiveness of our AI systems, send service-related communications, and monitor app performance and prevent abuse. We do not use your data to train third-party AI models.`
  },
  {
    title: "3. How AI Is Used",
    content: `Our platform uses AI to generate personalized coaching suggestions, notifications, and progress updates. These messages are based on your inputs and interaction history. Note that AI-generated messages are informational only. They are not medical advice and should not be used as a substitute for professional healthcare consultation.`
  },
  {
    title: "4. Sharing Your Data",
    content: `We may share limited data with third parties when necessary to run our services, such as cloud providers for hosting or storage, analytics services like Google Analytics, and communication tools used for email delivery. We do not sell your personal data—ever.`
  },
  {
    title: "5. Your Rights & Choices",
    content: `You can access, update, or delete your data at any time. You may opt out of marketing emails and request a copy of your personal data. California residents should refer to the CCPA rights section for additional options.`
  },
  {
    title: "6. Your Control Options",
    content: `You can view or update your account information, opt out of non-essential communications, and adjust cookie settings through your browser.`
  },
  {
    title: "7. Data Security",
    content: `We use industry-standard encryption, access controls, and continuous monitoring to safeguard your data. While no system is 100% invulnerable, security remains a top priority.`
  },
  {
    title: "8. Data Retention",
    content: `We retain personal data only as long as your account is active or as legally required. If you delete your account, your data is deleted or anonymized within [X] days.`
  },
  {
    title: "9. Children’s Privacy",
    content: `GoPeakFit is not designed for children under 13. We do not knowingly collect personal data from minors. If we discover that we have, we will delete it immediately.`
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this policy as our services evolve. If we make significant changes, we’ll notify you via email or in-app messaging.`
  },
];



function PolicySection(props: PolicySectionData) {
  const { title, content } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-l-4 border-[#20b5c9] rounded-md p-4 shadow-sm transition-all duration-200 hover:bg-[#f0fbfd]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-lg font-semibold text-gray-800 hover:text-[#20b5c9]"
      >
        {title}
      </button>
      {isOpen && <p className="mt-2 text-gray-700 text-sm">{content}</p>}
    </div>
  );
}

function PrivacyPolicyPage() {
  return (
    
    <div className="flex flex-col min-h-screen bg-cyan-100">
      <Head title="Privacy and Policy" />
      <RegHeader />
      <main className="flex-grow px-4 md:px-12 lg:px-24 py-12">
        <section className="max-w-4xl mx-auto">
          <div className="bg-[#20b5c9] text-white rounded-xl px-6 py-8 shadow-md mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-base opacity-90">
              Transparent. Respectful. Secure. Read how we handle your data.
            </p>
          </div>

          <div className="space-y-4">
            {policySections.map((section, index) => (
              <PolicySection
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
