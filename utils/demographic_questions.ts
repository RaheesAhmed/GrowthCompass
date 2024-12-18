import { Question } from "@/types/demographic";

export const DemographicQuestions = async (): Promise<Question[]> => {
  return [
    {
      id: "name",
      type: "text",
      question: "Name",
      placeholder: "Enter your name",
    },
    {
      id: "industry",
      type: "text",
      question: "What industry is your business in?",
      placeholder: "e.g., Healthcare, Technology, Manufacturing, Education",
    },
    {
      id: "employeeCount",
      type: "number",
      question: "How many people work at your company?",
      placeholder: "Enter the total number of employees",
    },
    {
      id: "department",
      type: "text",
      question:
        "What department or division do you primarily work in within your organization?",
      placeholder: "e.g., Finance, Western Region Operations, Company-wide",
    },
    {
      id: "jobTitle",
      type: "text",
      question: "What is your job title?",
      placeholder: "Enter your job title",
    },
    {
      id: "jobFunction",
      type: "select",
      question: "What is your job function?",
      options: [
        {
          value: "individual_contributor",
          label: "Individual Contributor",
          description:
            "Responsible for executing specific tasks, without formal leadership or decision-making responsibilities",
        },
        {
          value: "team_lead",
          label: "Team Lead",
          description:
            "Overseeing a small team, but not setting broad strategic direction",
        },
        {
          value: "department_manager",
          label: "Department Manager",
          description:
            "Responsible for managing people and projects, influencing departmental direction",
        },
        {
          value: "senior_manager",
          label: "Senior Manager",
          description:
            "Managing significant projects or key functions, with an operational and strategic focus",
        },
        {
          value: "director",
          label: "Director",
          description:
            "Responsible for overseeing multiple teams or departments, setting strategic direction",
        },
        {
          value: "executive",
          label: "Executive",
          description:
            "Responsible for large areas or several departments, with broad strategic and operational responsibility",
        },
        {
          value: "c_level",
          label: "C-Level Executive",
          description: "Lead entire organization or major functional sectors",
        },
      ],
    },
    {
      id: "primaryResponsibilities",
      type: "textarea",
      question: "What are the primary responsibilities of your role?",
      placeholder:
        "Please describe your key responsibilities. For example, if you're in a management position, what do you manage? What types of projects or teams do you oversee? If you're an individual contributor, what specific tasks or functions are you responsible for?",
      helperText:
        "Please provide a detailed description of your responsibilities and their impact",
    },
    {
      id: "directReports",
      type: "number",
      question: "How many people report directly to you?",
      placeholder: "Enter a number (0 if none)",
    },
    {
      id: "reportingRoles",
      type: "text",
      question: "What types of roles report directly to you? Please list them.",
      placeholder: "e.g., Manager of Engineering, Sales Coordinator",
      helperText: "If none, please state 'None'",
    },
    {
      id: "hasIndirectReports",
      type: "select",
      question:
        "Do any of your direct reports have direct reports of their own?",
      options: [
        {
          value: "yes",
          label: "Yes",
          description:
            "If yes, please specify the number of direct reports each of your direct reports has",
        },
        {
          value: "no",
          label: "No",
          description: "If no, please state 'None'",
        },
      ],
    },
    {
      id: "decisionLevel",
      type: "select",
      question: "What level of decisions do you primarily make?",
      options: [
        {
          value: "operational",
          label: "Operational",
          description:
            "Day-to-day decisions within your specific role, like processing invoices, responding to customer queries, or maintaining records",
        },
        {
          value: "tactical",
          label: "Tactical",
          description:
            "Medium-term decisions affecting your team or department, such as improving workflow efficiency or determining project timelines",
        },
        {
          value: "strategic",
          label: "Strategic",
          description:
            "Long-term decisions that shape major aspects of the organization, such as developing new company-wide programs, setting overarching business strategies, or leading major organizational changes",
        },
      ],
    },
    {
      id: "typicalProject",
      type: "textarea",
      question: "Describe a typical project or task you are responsible for.",
      placeholder:
        "Please include details about what the task involves, any teams or departments you interact with, and its impact on your organization",
      helperText:
        "Example: 'I develop IT security policies that align with company-wide risk management strategies and coordinate with the legal and tech departments to implement them.'",
    },
    {
      id: "levelsToCEO",
      type: "number",
      question:
        "How many levels are there between you and the highest-ranking executive in your organization?",
      placeholder: "Enter a number",
      helperText:
        "Example: If you report to a Manager, who reports to a VP, who reports to the CEO, you would enter '3'.",
    },
    {
      id: "managesBudget",
      type: "select",
      question: "Does your role require you to manage a budget?",
      options: [
        {
          value: "no",
          label: "No",
          description: "If no, please state 'None'",
        },
        {
          value: "department",
          label: "Yes - Department budget",
          description: "If yes, please specify the department",
        },
        {
          value: "multiple",
          label: "Yes - Multiple departments",
          description: "If yes, please specify the departments",
        },
        {
          value: "company",
          label: "Yes - Company-wide",
          description: "If yes, please specify the company",
        },
      ],
    },
  ];
};
