import { motion } from "motion/react";
import { HeartPulse, Home as HomeIcon, HandHeart, ShieldAlert } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SERVICES_DATA = [
  {
    icon: <HeartPulse size={40} className="text-rose-500" />,
    sector: "Health",
    objective: "Other Health Services",
    service: "Rehabilitative medical services",
    description: "Outpatient therapeutic care; includes nature cure centers, yoga clinics, physical therapy centers.",
    color: "bg-rose-50 border-rose-100",
    textColor: "text-rose-900",
    badgeColor: "bg-rose-100 text-rose-700"
  },
  {
    icon: <ShieldAlert size={40} className="text-emerald-600" />,
    sector: "Health",
    objective: "Mental Health and Crisis Intervention",
    service: "Crisis intervention",
    description: "Outpatient services and counsel in acute mental health situations; includes suicide prevention and support to victims of assault and abuse.",
    color: "bg-emerald-50 border-emerald-100",
    textColor: "text-emerald-900",
    badgeColor: "bg-emerald-100 text-emerald-700"
  },
  {
    icon: <HomeIcon size={40} className="text-blue-600" />,
    sector: "Development and Housing",
    objective: "Housing",
    service: "Housing assistance",
    description: "Organizations providing housing search, legal services and related assistance.",
    color: "bg-blue-50 border-blue-100",
    textColor: "text-blue-900",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: <HandHeart size={40} className="text-amber-600" />,
    sector: "Philanthropic Intermediaries",
    objective: "Voluntarism Promotion",
    service: "Fund-raising organizations",
    description: "Federated, collective fund-raising organizations, includes lotteries.",
    color: "bg-amber-50 border-amber-100",
    textColor: "text-amber-900",
    badgeColor: "bg-amber-100 text-amber-700"
  }
];

export function Services() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["Health Rehabilitation", "Crisis Intervention", "Housing Assistance", "Philanthropic Fund-raising"],
    "provider": {
      "@type": "NGO",
      "name": "The Protea Collective"
    },
    "areaServed": "South Africa",
    "description": "Comprehensive services including outpatient therapeutic care, mental health support, housing assistance, and federated fundraising."
  };

  return (
    <div className="w-full flex justify-center py-16 bg-stone-50">
      <Helmet>
        <title>Our Services | The Protea Collective</title>
        <meta name="description" content="Explore the diverse services provided by The Protea Collective including rehabilitative health, crisis intervention, housing assistance, and philanthropic fund-raising." />
        <meta name="keywords" content="NGO services, mental health, housing support, philanthropy, physical therapy, crisis hotline, South Africa" />
        <meta property="og:title" content="Our Services | The Protea Collective" />
        <meta property="og:description" content="Our services tackle multifaceted community challenges through targeted interventions in health, housing, and philanthropic infrastructure." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Our Services & Focus Areas</h1>
          <p className="text-lg text-stone-600 font-light leading-relaxed">
            The Protea Collective tackles multifaceted community challenges through targeted interventions in health, housing, and philanthropic infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border ${item.color} flex flex-col`}
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  {item.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${item.badgeColor}`}>
                  {item.sector}
                </span>
              </div>
              
              <div className="mb-2">
                <p className={`text-sm font-bold uppercase tracking-wider mb-2 opacity-70 ${item.textColor}`}>
                  Objective: {item.objective}
                </p>
                <h2 className={`text-2xl font-serif font-bold mb-4 ${item.textColor}`}>
                  {item.service}
                </h2>
              </div>
              
              <p className={`mt-auto text-lg leading-relaxed mix-blend-multiply opacity-80 ${item.textColor}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
