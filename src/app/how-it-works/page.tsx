import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Discover Properties",
      description:
        "Browse our curated marketplace of international real estate investments. Filter by country, property type, budget, and expected ROI to find opportunities that match your investment goals.",
    },
    {
      num: "02",
      title: "Request Investment Details",
      description:
        "Found a property that interests you? Submit a request through our lead form to receive a comprehensive investment package, including financial projections, legal requirements, and market analysis.",
    },
    {
      num: "03",
      title: "Expert Consultation",
      description:
        "Connect with our experienced investment agents who specialize in the local market. They will guide you through due diligence, legal requirements, tax implications, and help you make an informed decision.",
    },
    {
      num: "04",
      title: "Legal & Financial Setup",
      description:
        "Our partners will assist with all legal documentation, property inspections, and financial arrangements. We work with trusted local lawyers and accountants to ensure a smooth transaction.",
    },
    {
      num: "05",
      title: "Complete Your Investment",
      description:
        "Finalize your property purchase with full transparency. Our team manages the entire closing process, from signing contracts to property registration and handover.",
    },
    {
      num: "06",
      title: "Earn Returns",
      description:
        "Start generating rental income or benefit from property appreciation. Our property management partners can handle tenant sourcing, maintenance, and ongoing management on your behalf.",
    },
  ];

  const faqs = [
    {
      q: "Who can invest through ISRAVEST?",
      a: "ISRAVEST is primarily designed for Israeli investors looking to diversify their portfolio with international real estate. However, our platform is open to all qualified investors.",
    },
    {
      q: "What is the minimum investment amount?",
      a: "Properties on our platform start from approximately €68,000 in Georgia, with options available across all budget ranges up to premium villas exceeding €500,000.",
    },
    {
      q: "Do I need to visit the property before investing?",
      a: "While we recommend visiting when possible, many of our investors purchase remotely. We provide detailed virtual tours, comprehensive documentation, and local representatives who can visit on your behalf.",
    },
    {
      q: "How are expected ROI figures calculated?",
      a: "ROI projections are based on current market rental data, historical occupancy rates, and property management costs. These are estimates and actual returns may vary based on market conditions.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-primary-800 to-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">How ISRAVEST Works</h1>
          <p className="text-primary-100 text-lg">
            A simple, transparent process from discovery to investment
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Steps */}
        <div className="space-y-8 mb-20">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-6 bg-white rounded-2xl border border-gray-200 p-6 md:p-8"
            >
              <div className="shrink-0 w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                {step.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-primary-50 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our curated selection of international investment properties.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Investments
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
