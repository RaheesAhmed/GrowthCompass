interface ResponsibilityLevelData {
  "Responsibility Level": string;
  Description: string;
  "v1.0": string;
  "v2.0": string;
}

export const responsibilityLevel: ResponsibilityLevelData[] = [
  {
    "Responsibility Level": "Chief Officer (e.g., CEO, COO, CFO)",
    Description:
      "Oversees the overall strategy and performance of the entire organization, interfaces with the Board, and is accountable for all operational outcomes. Manages a diverse range of executives and indirectly oversees the entire workforce.",
    "v1.0":
      "The highest-ranking executives in an organization, responsible for the company's overall performance and strategy.",
    "v2.0":
      "Oversees the entire organization's strategy and performance. Interfaces with the Board and is ultimately responsible for organizational outcomes. Typically has multiple executive direct reports, and indirectly oversees the entire company.",
  },
  {
    "Responsibility Level": "Executive Vice President",
    Description:
      "Serves on the executive team with responsibility for critical organizational sectors or functions, typically overseeing multiple SVPs and VPs across significant segments of the organization, influencing company-wide strategies.",
    "v1.0":
      "Part of the top executive leadership team and may have a significant role in shaping the company's overall strategy and direction.",
    "v2.0":
      "Part of the executive leadership team, responsible for major sections of the organization or critical corporate functions, often with several SVPs and VPs reporting to them. Typically handles strategic initiatives across large segments of the company.",
  },
  {
    "Responsibility Level": "Senior Vice President",
    Description:
      "Manages large organizational areas or multiple departments with strategic and operational autonomy, usually with several VPs or Senior Directors as direct reports, affecting major portions of the organization.",
    "v1.0":
      "Typically oversee larger portions of the organization or have responsibility for multiple departments or divisions. Part of the executive leadership team.",
    "v2.0":
      "Manages broad organizational areas or multiple departments, with considerable strategic and operational autonomy. Usually has several VPs or Senior Directors reporting to them, indicating a high-level leadership role affecting large portions of the organization.",
  },
  {
    "Responsibility Level": "Senior Director / Vice President",
    Description:
      "Leads multiple departments or significant projects with a mix of strategic planning and operational management, typically with a handful of Directors and many Managers as direct reports.",
    "v1.0":
      "Signify a higher level of leadership within an organization. May have broader responsibilities and manage multiple directors or departments.",
    "v2.0":
      "Provides leadership at a high level, often with responsibility for critical organizational policies and strategic direction. Manages multiple departments or large teams, typically with Directors or Managers reporting to them.",
  },
  {
    "Responsibility Level": "Director",
    Description:
      "Manages several teams or departments, sets strategic objectives, and aligns them with organizational goals, usually overseeing 5-10 Managers or Senior Managers, indicative of a significant leadership role.",
    "v1.0":
      "Typically manage multiple teams or departments within an organization. Responsible for setting strategic goals, making high-level decisions, and overseeing managers and their respective teams.",
    "v2.0":
      "Responsible for overseeing multiple teams or departments. Sets strategic objectives and ensures alignment with broader organizational goals. Direct reports usually include Managers and sometimes Senior Managers, indicating control over significant team segments.",
  },
  {
    "Responsibility Level": "Senior Manager / Associate Director",
    Description:
      "Manages significant projects or key functions within specific areas, focusing primarily on operational leadership and efficiency. Typically responsible for implementing departmental strategies and overseeing 3-5 teams or Managers, but does not engage in the broader, strategic decision-making or have the cross-departmental influence typical of a Director.",
    "v1.0":
      "A level above a Manager but below a Director. Roles with increased responsibilities but not yet at the Director level.",
    "v2.0":
      "Manages key projects or organizational functions just below the director level. Typically oversees several Managers or Supervisors, showing increased responsibility for operational outcomes within a department.",
  },
  {
    "Responsibility Level": "Manager",
    Description:
      "Directly manages a team or department's daily operations, including performance and development, typically overseeing 2-15 employees, including Supervisors or Individual Contributors.",
    "v1.0":
      "Responsible for a team of employees, typically including individual contributors and sometimes supervisors.",
    "v2.0":
      "Oversees the daily operations of a team or department, handling direct supervision, performance management, and team development. Directly manages a team of Supervisors or Individual Contributors, responsible for their performance and development.",
  },
  {
    "Responsibility Level": "Supervisor",
    Description:
      "Oversees individual contributors within a specific team, managing daily activities and ensuring process adherence, usually supervising 3-10 people focused on task efficiency.",
    "v1.0":
      "Oversees a team of individual contributors. Responsible for guiding their team's day-to-day activities, providing feedback, and ensuring that work is completed efficiently.",
    "v2.0":
      "Manages day-to-day operations of a specific team, focusing on process adherence, efficiency, and team guidance. Directly supervises Individual Contributors, ensuring task completion and operational efficiency.",
  },
  {
    "Responsibility Level": "Team Lead",
    Description:
      "Coordinates daily tasks and short-term projects for a small group of Individual Contributors, acting as an intermediate leader without formal supervisory authority but responsible for operational outcomes.",
    "v1.0":
      "An intermediate role between Individual Contributor and Supervisor, often guiding a small group of individual contributors or coordinating tasks, but usually without formal direct reports.",
    "v2.0":
      "Coordinates a group of Individual Contributors, managing daily tasks and short-term projects. Acts as an intermediary leader, often without formal supervisory power but responsible for team coordination and output.",
  },
  {
    "Responsibility Level": "Individual Contributor",
    Description:
      "Specializes in specific tasks within a team, contributing through personal expertise without supervisory responsibilities, under the direction of a Supervisor or Manager.",
    "v1.0":
      "An employee who does not have any direct reports and focuses on their individual tasks and responsibilities.",
    "v2.0":
      "Focuses on specific tasks or projects within a team, contributing expertise without supervisory responsibilities. Works under the direction of a Supervisor or Manager, specializing in particular aspects of departmental objectives.",
  },
];
