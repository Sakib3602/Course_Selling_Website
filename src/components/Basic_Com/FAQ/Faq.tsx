"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqData = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I enroll in a course?",
    answer:
      "Enrolling is simple! Browse our course catalog, select the course you're interested in, and click the \"Enroll Now\" button. You'll be guided through a quick registration process. Once complete, you'll have immediate access to all course materials.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "Do I need any prerequisites to start learning?",
    answer:
      "Most of our courses are designed for beginners and don't require prior knowledge. However, some advanced courses may recommend foundational knowledge. Each course page clearly lists any prerequisites, so you can choose courses that match your skill level.",
  },
  {
    id: 3,
    category: "Getting Started",
    question: "Can I access courses on mobile devices?",
    answer:
      "Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktops. You can download course materials for offline access on our mobile app, available on iOS and Android.",
  },
  {
    id: 4,
    category: "Payments & Billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and various digital wallets. All transactions are secure and encrypted. We also offer flexible payment plans for certain courses.",
  },

  {
    id: 6,
    category: "Payments & Billing",
    question: "Do you offer discounts or promotional codes?",
    answer:
      "We frequently offer seasonal discounts and promotional codes. Subscribe to our newsletter to stay updated on special offers. We also provide discounts for bulk purchases and corporate training programs.",
  },
  {
    id: 7,
    category: "Course Content",
    question: "How long does it take to complete a course?",
    answer:
      "Course duration varies depending on the subject and depth. Most courses range from 4 to 12 weeks of study. However, you can learn at your own pace—there are no strict deadlines. You have lifetime access to course materials.",
  },
  {
    id: 8,
    category: "Course Content",
    question: "Will I receive a certificate upon completion?",
    answer:
      "Yes! Upon completing all course modules and passing the final assessment, you'll receive a professional certificate. These certificates are recognized by industry leaders and can be added to your LinkedIn profile and resume.",
  },
  {
    id: 9,
    category: "Course Content",
    question: "Can I download course materials?",
    answer:
      "Most course materials including videos, PDFs, and resources can be downloaded for offline access. Some interactive content may require an internet connection. Check individual course pages for specific download options.",
  },
  {
    id: 10,
    category: "Support",
    question: "How can I get help if I'm stuck on a topic?",
    answer:
      "We offer multiple support channels: live chat with instructors, community forums where you can ask peers, detailed FAQ sections, and email support. Most questions are answered within 24 hours. Premium members get priority support.",
  },
  {
    id: 11,
    category: "Support",
    question: "Is there a community or forum to connect with other students?",
    answer:
      "Yes! Each course has a dedicated community forum where students can discuss topics, share projects, and help each other. We also host monthly live Q&A sessions with instructors and networking events for our community members.",
  },
];

function FAQItem({
  item,
  isExpanded,
  onToggle,
}: {
  item: (typeof faqData)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
      >
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800 leading-tight">
            {item.question}
          </h3>
        </div>
        <ChevronDown
          className={`ml-4 h-5 w-5 flex-shrink-0 text-gray-600 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isAnimating && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-100 px-6 py-4 text-gray-600 leading-relaxed text-sm">
            {item.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="poppins min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-[600] tracking-tight text-gray-900 sm:text-4xl font-poppins">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Find answers to common questions about our courses, enrollment,
              payments, and support.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 font-poppins"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 font-poppins ${
              selectedCategory === null
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Topics
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 font-poppins ${
                selectedCategory === category
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
              />
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-base font-poppins">
                No questions found matching your search. Try different keywords
                or browse all topics.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="poppins mb-3 text-2xl font-bold text-gray-900 font-poppins">
            Still have questions?
          </h2>
          <p className="mb-6 text-gray-600 text-base font-poppins">
            Can't find the answer you're looking for? Our support team is here
            to help you 24/7.
          </p>
          <button className="rounded-md bg-[#FFB900] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#ffbb00] active:scale-95 font-poppins">
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
}
