import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqData = [
    {
      question: "What is HACKWAVE?",
      answer:
        "A 36-hour hackathon for dedicated builders and innovators. Unlike traditional hackathons, we give teams time to evolve ideas from concept to reality.",
    },
    {
      question: "When and where is HACKWAVE 2025?",
      answer:
        "August 23-25, 2025. Venue :Chameli Devi Group of instituions.",
    },
    {
      question: "Who can participate?",
      answer:
        "Students, professionals, and anyone passionate about tech innovation. All skill levels welcome - from beginners to experts.",
    },
    {
      question: "How do I register?",
      answer:
        "Registration opens early 2025 on our website. Early bird rates available. Follow our social media for announcements.",
    },
    {
      question: "What are the prizes?",
      answer:
        "₹1 Lakh+ prize pool across multiple categories: Best Overall, Most Innovative, Best Technical Implementation, and Best Design.",
    },
    {
      question: "Can I participate as a team?",
      answer:
        "Yes! Teams up to 4 members. Form teams before the event or find teammates during opening ceremony.",
    },
    {
      question: "What technologies can I use?",
      answer:
        "Any tech stack, language, or framework. Web, mobile, AI/ML, blockchain, IoT, AR/VR - all welcome. Focus on innovation, not specific tech.",
    },
    {
      question: "Will there be mentors?",
      answer:
        "Yes! Industry experts and technical mentors available throughout. Workshops on emerging tech, business models, and presentation skills.",
    },
  ];

  return (
    <div className="bg-[#141414] text-[#fcf2e8] py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto mt-14">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-4xl px-10 sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#fcf2e8] mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#ccc] max-w-3xl mx-auto px-2">
            Everything you need to know about HACKWAVE 2025. Can't find what
            you're looking for? Reach out to us on social media or email.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <Accordion
            type="single"
            collapsible
            className="space-y-3 sm:space-y-4"
          >
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#fcf2e8] text-[#141414] rounded-lg sm:rounded-xl border border-[#141414]/10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-[#141414] hover:text-[#141414]/80 transition-colors text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-[#141414]/80 leading-relaxed font-medium text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 sm:mt-16 px-2 sm:px-4">
          <div className="bg-[#fcf2e8] text-[#141414] rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-[#141414]/10 sm:mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-[#141414] mb-3 sm:mb-4">
              Still have questions?
            </h3>
            <p className="text-[#141414]/80 mb-4 sm:mb-6 font-medium text-sm sm:text-base">
              We're here to help! Reach out to our team and we'll get back to
              you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:hello@hackwave.dev"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-[#141414] text-[#fcf2e8] rounded-lg font-medium hover:bg-[#141414]/90 transition-colors text-sm sm:text-base"
              >
                Email Us
              </a>
              <a
                href="https://twitter.com/hackwave"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-[#141414] text-[#141414] rounded-lg font-medium hover:bg-[#141414] hover:text-[#fcf2e8] transition-colors text-sm sm:text-base"
              >
                Follow on Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
