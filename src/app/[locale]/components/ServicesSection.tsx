import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWordpress,
  faAws,
  faMicrosoft,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faGlobe,
  faMobile,
  faSitemap,
  faVial,
  faCloud,
  faCogs,
  faServer,
  faCloudUploadAlt,
  faTools,
  faCodeBranch,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const icons = [
  {
    icon: <FontAwesomeIcon icon={faGem} className="h-7 w-7 text-[#e0115f]" />,
  },
  {
    icon: <FontAwesomeIcon icon={faCode} className="h-7 w-7 text-[#8993be]" />,
  },
  {
    icon: <FontAwesomeIcon icon={faCogs} className="h-7 w-7 text-[#28a745]" />,
  },
  {
    icon: (
      <FontAwesomeIcon icon={faSitemap} className="h-7 w-7 text-[#4a90e2]" />
    ),
  },
  {
    icon: (
      <FontAwesomeIcon icon={faWordpress} className="h-7 w-7 text-[#21759b]" />
    ),
  },
  {
    icon: (
      <FontAwesomeIcon icon={faMobile} className="h-7 w-7 text-[#0d9488]" />
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faVial} className="h-7 w-7 text-[#9333ea]" />,
  },
  {
    icon: <FontAwesomeIcon icon={faAws} className="h-7 w-7 text-[#ff9900]" />,
  },
  {
    icon: (
      <FontAwesomeIcon icon={faMicrosoft} className="h-7 w-7 text-[#0078d4]" />
    ),
  },
  {
    icon: (
      <FontAwesomeIcon icon={faGoogle} className="h-7 w-7 text-[#4285f4]" />
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faCloud} className="h-7 w-7 text-[#0080ff]" />,
  },
  {
    icon: (
      <FontAwesomeIcon icon={faServer} className="h-7 w-7 text-[#38bdf8]" />
    ),
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faCloudUploadAlt}
        className="h-7 w-7 text-[#06b6d4]"
      />
    ),
  },
  {
    icon: (
      <FontAwesomeIcon icon={faCodeBranch} className="h-7 w-7 text-[#6366f1]" />
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faTools} className="h-7 w-7 text-[#14b8a6]" />,
  },
  {
    icon: <FontAwesomeIcon icon={faGlobe} className="h-7 w-7 text-[#4ade80]" />,
  },
];

type ServiceText = { title: string; description: string };

export default function ServicesSection() {
  const t = useTranslations("Services");
  const items = t.raw("items") as ServiceText[];
  const services = items.map((it, i) => ({ ...it, icon: icons[i]?.icon }));
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-surface p-8 rounded-xl hover:shadow-lg transition duration-500 transform"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-primary">{service.title}</h3>
              <p className="text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
}
