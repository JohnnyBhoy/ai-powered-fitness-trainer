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
    content:
      "By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the services.",
  },
  {
    title: "2. Use of Services",
    content:
      "You agree to use our services only for lawful purposes and in accordance with these terms and all applicable laws and regulations.",
  },
  {
    title: "3. User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content, trademarks, and data on this site are the property of their respective owners and protected by intellectual property laws.",
  },
  {
    title: "5. Limitation of Liability",
    content:
      "We are not liable for any damages arising from the use or inability to use our services. Use them at your own risk.",
  },
  {
    title: "6. Changes to Terms",
    content:
      "We reserve the right to modify these Terms at any time. Continued use of our services signifies your acceptance of any updates.",
  },
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
