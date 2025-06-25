import RegHeader from "@/Components/RegistrationHeader";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { Head, useForm } from '@inertiajs/react';

interface TermsSectionData {
  title: string;
  content: string;
}

const termsSections: TermsSectionData[] = [
  {
    title: "1. Acceptance of Terms",
    content: `Welcome to GoPeakFit. These Terms and Conditions outline the rules governing your use of our AI-powered fitness coaching platform. By using our website, app, or services, you agree to comply with these Terms. If you do not agree, please do not use GoPeakFit.`
  },
  {
    title: "2. Who We Are",
    content: `GoPeakFit is a US-based platform providing AI-powered fitness guidance and coaching messages. While we aim to help users stay motivated and consistent in their fitness journeys, GoPeakFit is not a medical service. Our tools and advice are not a substitute for professional healthcare consultation.`
  },
  {
    title: "3. Eligibility",
    content: `To use GoPeakFit, you must be at least 13 years old or older if required by local laws, and legally able to enter into these Terms. If you are using the platform on behalf of an organization, you confirm that you have the authority to bind that organization to these Terms.`
  },
  {
    title: "4. Account & Responsibility",
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must ensure that all information you provide is accurate and current. We reserve the right to suspend or terminate accounts that violate these Terms.`
  },
  {
    title: "5. AI-Generated Coaching",
    content: `GoPeakFit uses AI to generate personalized coaching messages based on your inputs and activity. These messages are generated automatically without human review and are intended for motivation and general wellness, not clinical advice. As we continuously improve the platform, these messages may change. Always consult a licensed healthcare provider before making any significant health or fitness changes.`
  },
  {
    title: "6. Acceptable Use",
    content: `You agree to use GoPeakFit only for lawful and respectful purposes. You must not upload false, misleading, or inappropriate content, interfere with or disrupt the platform, reverse-engineer or abuse our AI systems, or use bots, scrapers, or other automated tools without permission. We may suspend or terminate your access if you violate these guidelines.`
  },
  {
    title: "7. Subscription & Payments",
    content: `If you subscribe to a paid plan, you agree to pay all fees as disclosed. These fees are non-refundable unless otherwise stated. We reserve the right to change prices and will provide notice before the next billing cycle.`
  },
  {
    title: "8. Intellectual Property",
    content: `All content, code, branding, and designs on GoPeakFit are owned by us or our licensors. You may use the service as intended, but you may not copy, distribute, modify, or exploit any part of it without written permission. You retain rights to content you submit, such as profile data or messages, but grant us a license to use it to operate and improve the platform.`
  },
  {
    title: "9. Termination",
    content: `You may stop using GoPeakFit at any time. We may suspend or terminate your access if you breach these Terms, if required to do so by law, or if we decide to discontinue the platform. Upon termination, your right to use the service ends. However, sections related to intellectual property, disclaimers, and limitations of liability will remain in effect.`
  },
  {
    title: "10. Disclaimers",
    content: `GoPeakFit is provided "as is" without warranties of any kind. We do not guarantee accuracy, completeness, or results from coaching messages. While we work to improve our AI systems, results may vary, and consistency and discipline are still your responsibility.`
  },
  {
    title: "11. Limitation of Liability",
    content: `To the fullest extent permitted by law, GoPeakFit is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the greater of $100 or the amount you paid us in the past six months.`
  },
  {
    title: "12. Governing Law",
    content: `These Terms are governed by the laws of the State of Colorado, without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts of Colorado.`
  },
  {
    title: "13. Changes to These Terms",
    content: `We may update these Terms as our services evolve. If significant changes are made, we will notify you by email or through the app. Continued use of GoPeakFit indicates your acceptance of the updated Terms.`
  }
];



function TermsSection(props: TermsSectionData) {
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

function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cyan-100">
      <Head title="Terms and Conditions" />
      <RegHeader />
      <main className="flex-grow px-4 md:px-12 lg:px-24 py-12">
        <section className="max-w-4xl mx-auto">
          <div className="bg-[#20b5c9] text-white rounded-xl px-6 py-8 shadow-md mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
            <p className="text-base opacity-90">
              Understand the rules before using our services. Your compliance ensures a better experience for everyone.
            </p>
          </div>

          <div className="space-y-4">
            {termsSections.map((section, index) => (
              <TermsSection
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

export default TermsAndConditionsPage;
