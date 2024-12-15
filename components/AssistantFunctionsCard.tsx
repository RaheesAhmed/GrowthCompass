import React from "react";

interface AssistantFunctionsCardProps {
  onCardClick: (description: string) => void;
}

const data = [
  {
    icon: "🎯",
    title: "Leadership Assessment",
    description:
      "Analyze my leadership style and provide personalized development recommendations.",
  },
  {
    icon: "🌱",
    title: "Growth Planning",
    description:
      "Help me create a personalized leadership development plan for the next 6 months.",
  },
  {
    icon: "👥",
    title: "Team Management",
    description:
      "How can I improve my team management and delegation skills effectively?",
  },
  {
    icon: "💡",
    title: "Decision Making",
    description:
      "Guide me through a complex decision-making process using leadership frameworks.",
  },
  {
    icon: "🤝",
    title: "Communication Skills",
    description:
      "What strategies can I use to enhance my leadership communication?",
  },
  {
    icon: "⚡",
    title: "Crisis Leadership",
    description:
      "Help me develop strategies for leading effectively during challenging times.",
  },
];

const AssistantFunctionsCard: React.FC<AssistantFunctionsCardProps> = ({
  onCardClick,
}) => {
  return (
    <div className="w-full bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col gap-2"
              onClick={() => onCardClick(item.description)}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-sm font-medium text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          Select a topic to start exploring leadership insights and strategies
        </p>
      </div>
    </div>
  );
};

export default AssistantFunctionsCard;
