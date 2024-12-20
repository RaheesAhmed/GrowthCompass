import { Question } from "@/types/demographic";

export const DemographicQuestions = async (): Promise<Question[]> => {
  return [
    {
      id: "name",
      type: "text",
      question: "Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "industry",
      type: "text",
      question: "What industry is your business in?",
      placeholder: "e.g., Healthcare, Technology, Manufacturing, Education",
      required: true,
    },
    {
      id: "employeeCount",
      type: "number",
      question: "How many people work at your company?",
      placeholder: "Enter the total number of employees",
      required: true,
    },
    {
      id: "department",
      type: "text",
      question:
        "What department or division do you primarily work in within your organization?",
      placeholder: "e.g., Finance, Western Region Operations, Company-wide",
      required: true,
    },
    {
      id: "jobTitle",
      type: "text",
      question: "What is your job title?",
      placeholder: "Enter your current job title",
      required: true,
    },
    {
      id: "jobFunction",
      type: "toggle",
      question:
        "Which of the following best matches the scope and focus of your responsibilities?",
      options: [
        {
          value: "individual_contributor",
          label: "Individual Contributor",
          description:
            "I focus on completing specific tasks or projects, contributing my expertise directly.",
        },
        {
          value: "team_lead",
          label: "Team Lead",
          description:
            "I guide the work of a small team, providing direction but without formal management responsibilities.",
        },
        {
          value: "department_manager",
          label: "Department Manager",
          description:
            "I manage a team, overseeing their work and supporting departmental goals.",
        },
        {
          value: "senior_manager",
          label: "Senior Manager",
          description:
            "I manage projects or multiple teams, working across departments to achieve larger goals.",
        },
        {
          value: "director",
          label: "Director",
          description:
            "I lead multiple teams or departments, aligning their goals with organizational objectives.",
        },
        {
          value: "executive",
          label: "Executive",
          description:
            "I oversee major areas or business units, shaping strategies and influencing large parts of the organization.",
        },
        {
          value: "c_level",
          label: "C-Level Executive",
          description:
            "I lead the entire organization or a major division, driving overall success and strategy.",
        },
      ],
      required: true,
    },
    {
      id: "primaryResponsibilities",
      type: "textarea",
      question: "What are the primary responsibilities of your role?",
      placeholder:
        "Please describe your key responsibilities. For example, if you're in a management position, what do you manage? What types of projects or teams do you oversee? If you're an individual contributor, what specific tasks or functions are you responsible for?",
      helperText:
        "Be specific about your role's impact and scope of responsibilities",
      required: true,
      minLength: 20,
    },
    {
      id: "directReports",
      type: "number",
      question: "How many people report directly to you?",
      placeholder: "Enter the number of direct reports (0 if none)",
      required: true,
      min: 0,
    },
    {
      id: "reportingRoles",
      type: "textarea",
      question: "What types of roles report directly to you? Please list them.",
      placeholder:
        "e.g., Senior Software Engineer, Product Manager, Marketing Coordinator",
      helperText:
        "List all roles that report to you directly. If none, enter 'None'",
      required: true,
    },
    {
      id: "hasIndirectReports",
      type: "radio",
      question:
        "Do any of your direct reports have direct reports of their own?",
      options: [
        {
          value: "yes",
          label: "Yes",
          description: "My direct reports manage their own teams",
        },
        {
          value: "no",
          label: "No",
          description: "My direct reports do not manage others",
        },
      ],
      required: true,
    },
    {
      id: "decisionLevel",
      type: "radio",
      question: "What type of decisions do you primarily make in your role?",
      options: [
        {
          value: "operational",
          label: "Focus on the quality and timeliness of my own work",
          description:
            "Examples: Completing assigned tasks, contributing to team workflows or processes, ensuring the quality and accuracy of my own work.",
        },
        {
          value: "tactical",
          label:
            "Influence my team or department and often involve collaboration with others",
          description:
            "Examples: Managing team resources, leading improvements to team workflows or processes, coordinating with colleagues to achieve shared goals.",
        },
        {
          value: "strategic",
          label:
            "Impact the broader organization by shaping strategies or driving major initiatives",
          description:
            "Examples: Setting organizational goals, creating cross-departmental initiatives, driving strategies that influence multiple teams or the company's direction.",
        },
      ],
      required: true,
    },
    {
      id: "typicalProject",
      type: "textarea",
      question: "Describe a typical project or task you are responsible for.",
      placeholder:
        "Please include details about what the task involves, any teams or departments you interact with, and its impact on your organization.",
      helperText:
        "Example: 'I develop IT security policies that align with company-wide risk management strategies and coordinate with the legal and tech departments to implement them.'",
      required: true,
      minLength: 20,
    },
    {
      id: "levelsToCEO",
      type: "number",
      question:
        "How many levels are there between you and the highest-ranking executive in your organization?",
      placeholder: "Enter a number",
      helperText:
        "Example: If you report to a Manager, who reports to a VP, who reports to the CEO, you would enter '3'.",
      required: true,
      min: 0,
    },
    {
      id: "managesBudget",
      type: "multipart",
      question: "Do you manage a budget in your role?",
      parts: [
        {
          id: "hasBudget",
          type: "radio",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
          required: true,
        },
        {
          id: "budgetTypes",
          type: "checkbox",
          question: "Type of Budget (Select all that apply):",
          options: [
            {
              value: "department",
              label: "Departmental Budget",
              description: "Operating expenses for a team",
            },
            {
              value: "project",
              label: "Project Budgets",
              description: "Costs for initiatives or projects",
            },
            {
              value: "multiple",
              label: "Multiple Departments",
              description: "Budgets across multiple departments",
            },
            {
              value: "company",
              label: "Company-Wide",
              description: "Company-wide budgets",
            },
          ],
          dependsOn: "hasBudget",
          showWhen: "yes",
        },
        {
          id: "budgetSize",
          type: "text",
          question: "Approximate Size of Budget:",
          placeholder:
            "e.g., $250,000 annually, or $10M across multiple projects",
          dependsOn: "hasBudget",
          showWhen: "yes",
        },
      ],
    },
  ];
};
