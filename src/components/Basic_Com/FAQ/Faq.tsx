"use client";

import { useState, useRef } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

// --- Types ---
interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// --- Data ---
const faqData: FaqItem[] = [
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
    question: "Do I need any prerequisites?",
    answer:
      "Most of our courses are designed for beginners and don't require prior knowledge. However, some advanced courses may recommend foundational knowledge. Each course page clearly lists any prerequisites.",
  },
  {
    id: 3,
    category: "Getting Started",
    question: "Can I access courses on mobile?",
    answer:
      "Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktops. You can download course materials for offline access on our mobile app, available on iOS and Android.",
  },
  {
    id: 4,
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and various digital wallets. All transactions are secure and encrypted. We also offer flexible payment plans for certain courses.",
  },
  {
    id: 6,
    category: "Payments",
    question: "Do you offer discounts?",
    answer:
      "We frequently offer seasonal discounts and promotional codes. Subscribe to our newsletter to stay updated on special offers. We also provide discounts for bulk purchases and corporate training programs.",
  },
  {
    id: 8,
    category: "Certificates",
    question: "Will I receive a certificate?",
    answer:
      "Yes! Upon completing all course modules and passing the final assessment, you'll receive a professional certificate. These certificates are recognized by industry leaders and can be added to your LinkedIn profile and resume.",
  },
  {
    id: 10,
    category: "Support",
    question: "How can I get help if I'm stuck?",
    answer:
      "We offer multiple support channels: live chat with instructors, community forums where you can ask peers, detailed FAQ sections, and email support. Most questions are answered within 24 hours.",
  },
];

// --- Individual FAQ Card Component ---
function FAQItem({
  item,
  isExpanded,
  onToggle,
}: {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? "bg-white border-amber-200 shadow-xl shadow-amber-900/5 ring-1 ring-amber-100"
          : "bg-white border-slate-200 shadow-sm hover:border-amber-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-semibold transition-colors duration-300 ${
            isExpanded ? "text-slate-900" : "text-slate-700 group-hover:text-amber-700"
          }`}
        >
          {item.question}
        </span>
        <div
          className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isExpanded
              ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white rotate-180"
              : "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="px-6 pb-6 pt-0">
          <p className="text-base text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(1); // Default open first one
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
    <section className="relative min-h-screen bg-slate-50 selection:bg-amber-100 selection:text-amber-900 overflow-hidden">
      
      {/* --- Background Effects (Matching AllProduct) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-100/40 rounded-full blur-[120px] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 bg-white shadow-sm mb-6 transition-transform hover:scale-105 cursor-default">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase">
              Help Center
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700">
              Questions
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
            Everything you need to know about the product and billing. 
            Can’t find the answer you’re looking for? Please chat to our friendly team.
          </p>
        </div>

        {/* --- Search & Filter --- */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200"
            />
            {/* Decorative shadow for input */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-xl blur opacity-20 -z-10 transition duration-200"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- FAQ Grid --- */}
        <div className="space-y-4 max-w-3xl mx-auto">
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
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No matching questions</h3>
              <p className="text-slate-500 mt-1">Try adjusting your search terms or browse all categories.</p>
            </div>
          )}
        </div>

        {/* --- CTA Footer --- */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 shadow-2xl shadow-slate-900/20 sm:px-12 lg:px-16">
          {/* Abstract glow inside the card */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"></div>
          
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="bg-white/10 p-3 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
               <MessageCircle className="h-8 w-8 text-amber-400" />
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
              Still have questions?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-slate-300 mb-8">
              Can't find the answer you're looking for? Our dedicated support team is here to help you unlock your full potential.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-amber-50 hover:text-amber-700">
              Contact Support
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}