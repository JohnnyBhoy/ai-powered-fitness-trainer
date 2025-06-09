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
    title: "1. Introduction",
    content:
      "We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we handle data when you use our services.",
  },
  {
    title: "2. Information We Collect",
    content:
      "We collect information you provide directly (e.g., when registering), and indirectly through cookies, analytics, and usage logs.",
  },
  {
    title: "3. How We Use Your Information",
    content:
      "To improve our services, communicate with users, provide customer support, and meet legal obligations.",
  },
  {
    title: "4. Sharing Your Data",
    content:
      "We do not sell your data. We may share information with trusted third-party partners under strict confidentiality agreements.",
  },
  {
    title: "5. Your Rights",
    content:
      "You have the right to access, update, or delete your personal data. Contact us to exercise your rights.",
  },
  {
    title: "6. Changes to This Policy",
    content:
      "We may update this Privacy Policy. When we do, we will revise the updated date and notify you as required.",
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
