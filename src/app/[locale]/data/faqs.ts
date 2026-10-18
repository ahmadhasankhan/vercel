export type Faq = { id: number; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: 1,
    question: "What all DevOps work your team can do?",
    answer: "DevOps Expert team is capable of doing any automation. Setup Continuous Integration and delivery/deployment (CICD). Setup high availability, fail-over, auto-scaling. Analyze infrastructure and do cost optimization. Data migration and conversions. Setup to minimize regional latency."
  },
  {
    id: 2,
    question: "What is included in Monitoring?",
    answer: "Setup alarms, receive, verify, escalate and open tickets. Prepare site reliability reports. Web page scans. Manual application functionality checks on various devices. Retrieve logs through script, analyze and report findings."
  },
  {
    id: 3,
    question: "What is included in Manage Plan?",
    answer: "Managing includes monitoring, upgrades, backups, SSL, DNS and troubleshooting of Development, QA, UAT and production environments. Manage team has decades of experience managing applications and cloud infrastructure. Team slowly ramp management tasks and get better each day as gain more understanding of application stack."
  },
  {
    id: 4,
    question: "How plans and hours work?",
    answer: "Hours in a plan are expected to be used over a month. In some urgency or emergency, hours may be used earlier. Team may also work additional hours if so required. Monitoring or Manage feature may be removed from plan if not needed. Plans can be upgraded, downgraded or cancelled with 30-day notice."
  },
  {
    id: 5,
    question: "No plans. Just have one-off task, will you do?",
    answer: "Yes. In our plans we prefer customer who have possibility to stay with us longer. We do one-off or emergency tasks, however our fees for such tasks will depend on its complexity and urgency and hourly rate will certainly be much higher then in our plans."
  },
  {
    id: 6,
    question: "Can you provide full-time staff?",
    answer: "Yes. We provide junior to senior member on 3+ months. Our member work 40 hours a week and covers some hours in customer time zone or on-site. Advantage of using our team member full-time is that the member has access to architechural level support on customer tasks when needed."
  },
  {
    id: 7,
    question: "What is your response time and uptime guarantee?",
    answer: "Our DevOps team responds to requests within 2 to 4 hours during normal business hours. With mutual agreement DevOps team will be available for some tasks that can't be done during business hours. Our 24/7 team depending on customer requirement can responds from 1-hour to under 15 minutes. We set up PagerDuty, OpsGenie etc. Team can provide SLA based very high uptime guarantees for production environment when required. Such guarantees are provided after few months of on-boarding."
  },
  {
    id: 8,
    question: "Is Asistensia secure?",
    answer: "We serve financial, health and e-commerce sectors also requiring SOC 2, PCI, HIPPA, GDPR and ISO 27001 compliances. We deploy multiple layers of security. This starts from secure workstations to external request logging at our office network. We routinely audit our processes, and add tools to strenthen our defense. Our employees sign NDA and other documents for data security and privacy."
  },
  {
    id: 9,
    question: "How do we get started?",
    answer: "After 30-minutes free consultation, Asistensia will send a commercial proposal. On its acceptance, Service Agreement/NDA to be signed. Soon after we form a team to work on customer’s stack. Our team adopts to customer’s workflow and respond to Slack, Jira, Asana, Microsoft Team or emails requests. Time spent is logged in Toggl. Monthly reports are available on request. Invoice is generated every 30-days which is to be paid by Credit Card, ACH, Wire Transfer"
  },
  {
    id: 10,
    question: "How soon you will get on to our tasks?",
    answer: "We can start work within 24 hours of signing NDA/Agreement. Understanding of application and infrastructure takes time. Depending on how simple or complex setup is, it will take our team a day to few weeks to complete different types of tasks. A gradual ramp up works well with our team."
  },
];
