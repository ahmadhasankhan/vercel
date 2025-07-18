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

const services = [
  {
    title: "Ruby & Ruby on Rails",
    description:
      "Expert consulting for Ruby applications and Rails framework development, optimization, and maintenance.",
    icon: <FontAwesomeIcon icon={faGem} className="h-8 w-8 text-[#e0115f]" />,
  },
  {
    title: "PHP & Laravel",
    description:
      "Custom PHP solutions and Laravel framework expertise for scalable web applications.",
    icon: <FontAwesomeIcon icon={faCode} className="h-8 w-8 text-[#8993be]" />,
  },
  {
    title: "DevOps Solutions",
    description:
      "CI/CD pipelines, infrastructure automation, monitoring, scaling and cost-efficiency.",
    icon: <FontAwesomeIcon icon={faCogs} className="h-8 w-8 text-[#28a745]" />,
  },
  {
    title: "API Development",
    description:
      "Design and implementation of secure & robust RESTful APIs for seamless integration.",
    icon: (
      <FontAwesomeIcon icon={faSitemap} className="h-8 w-8 text-[#4a90e2]" />
    ),
  },
  {
    title: "WordPress",
    description: "Custom wordpress website, optimiztion and SEO friendly.",
    icon: (
      <FontAwesomeIcon icon={faWordpress} className="h-8 w-8 text-[#21759b]" />
    ),
  },
  {
    title: "Mobile Development",
    description:
      "Asistensia has expertise in both native and cross-platform technologies",
    icon: (
      <FontAwesomeIcon icon={faMobile} className="h-8 w-8 text-[#0d9488]" />
    ),
  },
  {
    title: "Software Testing",
    description:
      "Numerous types of quality assurance testing for web and mobile applications",
    icon: <FontAwesomeIcon icon={faVial} className="h-8 w-8 text-[#9333ea]" />,
  },
  {
    title: "AWS DevOps",
    description:
      "We use AWS for provision and managing thousands of containers for startups.",
    icon: <FontAwesomeIcon icon={faAws} className="h-8 w-8 text-[#ff9900]" />,
  },
  {
    title: "Microsoft Azure DevOps",
    description:
      "Do you prefer Microsoft Azure? Asistensia has Azure Cloud experts for your need.",
    icon: (
      <FontAwesomeIcon icon={faMicrosoft} className="h-8 w-8 text-[#0078d4]" />
    ),
  },
  {
    title: "Google Cloud Platform DevOps",
    description:
      "Want to build scalable apps using Googles global, reliable infrastructure",
    icon: (
      <FontAwesomeIcon icon={faGoogle} className="h-8 w-8 text-[#4285f4]" />
    ),
  },
  {
    title: "Digital Ocean DevOps",
    description:
      "Using Digital Ocean? Asistensia help setup and manage their complete stack on 24/7 basis.",
    icon: <FontAwesomeIcon icon={faCloud} className="h-8 w-8 text-[#0080ff]" />,
  },
  {
    title: "Managed Kubernetes",
    description:
      "Asistensia can bootstrap a new Kubernetes cluster, or help manage an existing Kubernetes cluster.",
    icon: (
      <FontAwesomeIcon icon={faServer} className="h-8 w-8 text-[#38bdf8]" />
    ),
  },
  {
    title: "Infrastructure as code",
    description:
      "Asistensia can convert your Cloud infrastructure into version controlled Terraform templates.",
    icon: (
      <FontAwesomeIcon
        icon={faCloudUploadAlt}
        className="h-8 w-8 text-[#06b6d4]"
      />
    ),
  },
  {
    title: "CI & CD",
    description:
      "We setup and manage both integration and continuous delivery pipelines for startups and software development companies.",
    icon: (
      <FontAwesomeIcon icon={faCodeBranch} className="h-8 w-8 text-[#6366f1]" />
    ),
  },
  {
    title: "Cloud Automation",
    description:
      "Using different automation tools and frameworks, we draw a plan to convert available resources into infrastructure as a code.",
    icon: <FontAwesomeIcon icon={faTools} className="h-8 w-8 text-[#14b8a6]" />,
  },
  {
    title: "Cloud Management",
    description:
      "Many times our team takes full responsibility of managing customer app stack running on AWS, Azure, GCP or Digital Ocean.",
    icon: <FontAwesomeIcon icon={faGlobe} className="h-8 w-8 text-[#4ade80]" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Specialized Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions to meet your unique software development needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-500 transform"
            >
              <div className="">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <hr/>
    </section>
  );
}
