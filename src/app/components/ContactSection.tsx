export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to discuss your project? Reach out to us today.
                    </p>
                </div>

                <div className="lg:flex">
                    {/* Form Section */}
                    <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
                        <form action="https://formspree.io/f/xovwgvnv" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div className="lg:w-1/2 lg:pl-12">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <ContactItem
                                    title="Phone"
                                    detail="+31-619-333008"
                                    icon={
                                        <PhoneIcon className="h-6 w-6 text-primary mt-1 mr-4" />
                                    }
                                />
                                <ContactItem
                                    title="Email"
                                    detail="contact@asistensia.com"
                                    icon={
                                        <MailIcon className="h-6 w-6 text-primary mt-1 mr-4" />
                                    }
                                />
                                <ContactItem
                                    title="Address"
                                    detail="Amsterdam, Netherlands"
                                    icon={
                                        <LocationIcon className="h-6 w-6 text-primary mt-1 mr-4" />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactItem({
                         title,
                         detail,
                         icon,
                     }: {
    title: string;
    detail: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex items-start">
            {icon}
            <div>
                <h4 className="font-medium text-gray-900">{title}</h4>
                <p className="text-gray-600">{detail}</p>
            </div>
        </div>
    );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
        </svg>
    );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );
}
