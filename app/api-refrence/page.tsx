"use client";

import React, { FC, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Hash,
  FileJson,
  Server,
  Book,
  Code,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

// Add type declarations for react-markdown components
type ReactMarkdownProps = {
  node: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface RequestExampleProps {
  curl: string;
  http: string;
}

interface ExampleCardProps {
  title: string;
  description: string;
  curl: string;
  http: string;
}

interface MarkdownContentProps {
  content: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 rounded-md bg-surface-800/30 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownContent: FC<MarkdownContentProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({
          node,
          inline,
          className,
          children,
          ...props
        }: ReactMarkdownProps) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock
              code={String(children).replace(/\n$/, "")}
              language={match[1]}
            />
          ) : (
            <code
              className="bg-surface-100 px-1.5 py-0.5 rounded text-primary-600"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <div className="not-prose">{children}</div>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const RequestExample: React.FC<RequestExampleProps> = ({ curl, http }) => {
  const [activeTab, setActiveTab] = useState("curl");

  const tabs = [
    { id: "curl", label: "cURL", content: curl, language: "bash" },
    { id: "http", label: "HTTP", content: http, language: "http" },
  ];

  return (
    <div className="space-y-2 not-prose">
      <div className="flex space-x-2 bg-surface-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-primary-900 shadow-sm"
                : "text-surface-600 hover:text-surface-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map(
        (tab) =>
          tab.id === activeTab && (
            <CodeBlock
              key={tab.id}
              code={tab.content}
              language={tab.language}
            />
          )
      )}
    </div>
  );
};

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  description,
  curl,
  http,
}) => {
  return (
    <div className="enterprise-card overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-primary-950 mb-2">
              {title}
            </h3>
            <p className="text-surface-600">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
              POST
            </span>
          </div>
        </div>
        <RequestExample curl={curl} http={http} />
      </div>
    </div>
  );
};

const ApiReference: FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Enterprise Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-50/20 to-background" />
      </div>

      <div className="relative flex">
        {/* Sidebar - Fixed with scrolling */}
        <div className="w-64 fixed top-20 bottom-0 bg-surface-50 border-r border-surface-200">
          <div className="h-full overflow-y-auto p-4">
            <nav className="space-y-6 sticky top-0">
              <div>
                <h2 className="text-lg font-semibold text-primary-950 mb-2">
                  Documentation
                </h2>
                <div className="space-y-1">
                  {/* Introduction button */}
                  <button
                    onClick={() => scrollToSection("introduction")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      activeSection === "introduction"
                        ? "bg-primary-50 text-primary-900"
                        : "text-surface-600 hover:bg-surface-100"
                    }`}
                  >
                    <Book className="w-4 h-4" />
                    Introduction
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-surface-900 mb-2">
                  API Reference
                </h3>
                <div className="space-y-1">
                  {/* API Reference buttons */}
                  {[
                    {
                      id: "classification",
                      icon: Server,
                      label: "Classification",
                    },
                    {
                      id: "level-one",
                      icon: Hash,
                      label: "Level One Questions",
                    },
                    {
                      id: "level-two",
                      icon: Hash,
                      label: "Level Two Questions",
                    },
                    {
                      id: "streaming",
                      icon: Server,
                      label: "Development Plan",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        activeSection === item.id
                          ? "bg-primary-50 text-primary-900"
                          : "text-surface-600 hover:bg-surface-100"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-surface-900 mb-2">
                  Examples
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => scrollToSection("example-requests")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      activeSection === "example-requests"
                        ? "bg-primary-50 text-primary-900"
                        : "text-surface-600 hover:bg-surface-100"
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    Example Requests
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content - With proper margin and padding */}
        <div className="flex-1 ml-64 p-8 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-slate max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Introduction */}
                <section id="introduction" className="mb-16">
                  <h1 className="text-4xl font-bold mb-8 text-primary-950">
                    GrowthCompass API Documentation
                  </h1>
                  <p className="text-lg text-surface-600 mb-6">
                    Welcome to the GrowthCompass API documentation. Our API
                    provides comprehensive endpoints for leadership assessment,
                    classification, and development tracking.
                  </p>
                  <div className="bg-surface-50 border border-surface-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Base URL</h3>
                    <code className="bg-surface-100 px-3 py-1 rounded text-primary-600">
                      https://growth-compass.vercel.app
                    </code>
                  </div>
                </section>

                {/* Classification API */}
                <section id="classification" className="mb-16">
                  <h2 className="text-3xl font-semibold text-primary-900 mb-6">
                    Classification API
                  </h2>
                  <div className="enterprise-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded">
                        POST
                      </span>
                      <code className="text-primary-600">
                        /api/classification
                      </code>
                    </div>
                    <p className="text-surface-600 mb-6">
                      Analyzes user information to determine their leadership
                      level and role classification.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Request Examples</h4>
                        <RequestExample
                          curl={`curl -X POST https://growth-compass.vercel.app/api/classification \\
-H "Content-Type: application/json" \\
-d '{
  "name": "Michael Carter",
  "industry": "Construction",
  "employeeCount": 150,
  "department": "Project Management",
  "jobTitle": "Senior Project Manager",
  "jobFunction": "senior_manager",
  "primaryResponsibilities": "Oversees multiple high-value construction projects...",
  "directReports": 8,
  "reportingRoles": "Site Supervisors, Project Engineers, Safety Officers",
  "hasIndirectReports": "yes",
  "decisionLevel": "tactical",
  "typicalProject": "Managed the construction of a $10M commercial property...",
  "levelsToCEO": 2,
  "managesBudget": {
    "hasBudget": "yes",
    "budgetTypes": ["multiple"],
    "budgetSize": "$5,000,000 annually for project expenses and resources"
  }
}'`}
                          http={`POST /api/classification HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "name": "Michael Carter",
  "industry": "Construction",
  "employeeCount": 150,
  "department": "Project Management",
  "jobTitle": "Senior Project Manager",
  "jobFunction": "senior_manager",
  "primaryResponsibilities": "Oversees multiple high-value construction projects...",
  "directReports": 8,
  "reportingRoles": "Site Supervisors, Project Engineers, Safety Officers",
  "hasIndirectReports": "yes",
  "decisionLevel": "tactical",
  "typicalProject": "Managed the construction of a $10M commercial property...",
  "levelsToCEO": 2,
  "managesBudget": {
    "hasBudget": "yes",
    "budgetTypes": ["multiple"],
    "budgetSize": "$5,000,000 annually for project expenses and resources"
  }
}`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Response</h4>
                        <MarkdownContent
                          content={`\`\`\`json
{
  "success": true,
  "data": {
    "level": 4,
    "role": "Senior Manager / Associate Director",
    "description": "Manages significant projects...",
    "versionInfo": {
      "v1": "A level above a Manager but below a Director...",
      "v2": "Manages key projects or organizational functions..."
    },
    "context": {
      "jobFunction": "senior_manager",
      "decisionLevel": "tactical",
      "directReports": 8,
      "hasIndirectReports": "yes",
      "managesBudget": {
        "hasBudget": "yes",
        "budgetTypes": ["multiple"],
        "budgetSize": "$5,000,000 annually..."
      },
      "qualitativeScore": 0.7896428571428571
    }
  }
}
\`\`\`
`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Level One Questions */}
                <section id="level-one" className="mb-16">
                  <h2 className="text-3xl font-semibold text-primary-900 mb-6">
                    Level One Questions API
                  </h2>
                  <div className="enterprise-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded">
                        GET
                      </span>
                      <code className="text-primary-600">
                        /api/questions/level-one
                      </code>
                    </div>
                    <p className="text-surface-600 mb-6">
                      Retrieves all Level One assessment questions for initial
                      evaluation.
                    </p>

                    <div>
                      <h4 className="font-medium mb-2">Response</h4>
                      <MarkdownContent
                        content={`\`\`\`json
{
  "levelOneQuestions": [
    {
      "Lvl": 10,
      "Role Name": "Chief Officer (e.g., CEO, COO, CFO)",
      "Description": "Oversees the overall strategy and performance of the entire organization...",
      "ratingQuestion": "How effectively do you contribute to a positive and inclusive team environment...",
      "reflection": "How confident are you in your ability to foster a positive team atmosphere..."
    }
  ]
}
\`\`\`
`}
                      />
                    </div>
                  </div>
                </section>

                {/* Level Two Questions */}
                <section id="level-two" className="mb-16">
                  <h2 className="text-3xl font-semibold text-primary-900 mb-6">
                    Level Two Questions API
                  </h2>
                  <div className="enterprise-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded">
                        POST
                      </span>
                      <code className="text-primary-600">
                        /api/questions/level-two
                      </code>
                    </div>
                    <p className="text-surface-600 mb-6">
                      Retrieves detailed Level Two questions based on capability
                      area and Level One responses.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Request Examples</h4>
                        <RequestExample
                          curl={`curl -X POST https://growth-compass.vercel.app/api/questions/level-two \\
-H "Content-Type: application/json" \\
-d '{
  "capability": "Building a Team",
  "level": 3,
  "answers": {
    "skill": 4,
    "confidence": 3
  }
}'`}
                          http={`POST /api/questions/level-two HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "capability": "Building a Team",
  "level": 3,
  "answers": {
    "skill": 4,
    "confidence": 3
  }
}`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Response</h4>
                        <MarkdownContent
                          content={`\`\`\`json
{
  "levelTwoQuestions": [
    {
      "id": "Building a Team-l2-0",
      "capability": "Building a Team",
      "level": 3,
      "theme": "Operational Team Management",
      "question": "How effectively do you handle operational team management?",
      "context": "Ensuring that daily operations run smoothly and team objectives are met efficiently.",
      "subQuestions": [],
      "type": "detailed",
      "requiresReflection": true
    },
    {
      "id": "Building a Team-l2-1",
      "capability": "Building a Team",
      "level": 3,
      "theme": "Work Allocation",
      "question": "How effectively do you handle work allocation?",
      "context": "Aligning team members' tasks with their abilities and the team's needs.",
      "subQuestions": [],
      "type": "detailed",
      "requiresReflection": true
    },
    {
      "id": "Building a Team-l2-2",
      "capability": "Building a Team",
      "level": 3,
      "theme": "Skill Development",
      "question": "How effectively do you handle skill development?",
      "context": "Identifying and nurturing each team member's professional growth within the team's context.",
      "subQuestions": [],
      "type": "detailed",
      "requiresReflection": true
    }
  ]
}
\`\`\`
`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Streaming API */}
                <section id="streaming" className="mb-16">
                  <h2 className="text-3xl font-semibold text-primary-900 mb-6">
                    Development Plan Generation API
                  </h2>
                  <div className="enterprise-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded">
                        POST
                      </span>
                      <code className="text-primary-600">/api/streaming</code>
                    </div>
                    <p className="text-surface-600 mb-6">
                      Generates a personalized development plan using AI, with
                      streaming response for real-time updates. The response is
                      formatted in Markdown with clear headers, tables, and
                      appropriate formatting.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Request Examples</h4>
                        <RequestExample
                          curl={`curl -X POST https://growth-compass.vercel.app/api/streaming \\
-H "Content-Type: application/json" \\
-d '{
  "threadId": "thread_abc123...",
  "userData": {
    "name": "John Doe",
    "role": "Senior Manager"
  },
  "leadershipData": {
    "level": 4,
    "classification": "Senior Manager / Associate Director"
  },
  "responses": {
    "levelOne": [],
    "levelTwo": []
  }
}'`}
                          http={`POST /api/streaming HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "threadId": "thread_abc123...",
  "userData": {
    "name": "John Doe",
    "role": "Senior Manager"
  },
  "leadershipData": {
    "level": 4,
    "classification": "Senior Manager / Associate Director"
  },
  "responses": {
    "levelOne": [],
    "levelTwo": []
  }
}`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Response Headers</h4>
                        <MarkdownContent
                          content={`\`\`\`json
{
  "Content-Type": "text/plain",
  "X-Thread-Id": "thread_abc123..." // Thread ID for future interactions
}
\`\`\`
`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Response Stream</h4>
                        <p className="text-surface-600 mb-4">
                          The API returns a streaming response with the
                          generated development plan in Markdown format. The
                          response includes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-surface-600 mb-4">
                          <li>Executive Summary</li>
                          <li>Current Leadership Profile</li>
                          <li>Key Development Areas</li>
                          <li>Action Items and Timeline</li>
                          <li>Resource Recommendations</li>
                          <li>Success Metrics</li>
                        </ul>
                        <MarkdownContent
                          content={`\`\`\`markdown
# Development Plan for [Name]

## Executive Summary
[Streaming content...]

## Current Leadership Profile
[Streaming content...]

## Key Development Areas
[Streaming content...]

...
\`\`\`
`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Features</h4>
                        <ul className="list-disc list-inside space-y-2 text-surface-600">
                          <li>Real-time streaming response</li>
                          <li>Markdown-formatted output</li>
                          <li>Thread persistence for continued interactions</li>
                          <li>AI-powered personalized recommendations</li>
                          <li>Customizable development plan template</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Error Responses</h4>
                        <MarkdownContent
                          content={`\`\`\`json
{
  "success": false,
  "error": "Error message description"
}
\`\`\`
`}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Example Requests */}
                <section id="example-requests" className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">
                      Example Requests
                    </h2>
                    <p className="text-lg text-surface-600">
                      Explore practical examples of API requests for common use
                      cases.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <ExampleCard
                      title="Classification Request"
                      description="Analyze and determine the leadership level of a user based on their role and responsibilities."
                      curl={`curl -X POST https://growth-compass.vercel.app/api/classification \\
-H "Content-Type: application/json" \\
-d '{
  "name": "Michael Carter",
  "industry": "Construction",
  "employeeCount": 150,
  "department": "Project Management",
  "jobTitle": "Senior Project Manager",
  "jobFunction": "senior_manager",
  "primaryResponsibilities": "Oversees multiple high-value construction projects...",
  "directReports": 8,
  "reportingRoles": "Site Supervisors, Project Engineers, Safety Officers",
  "hasIndirectReports": "yes",
  "decisionLevel": "tactical",
  "typicalProject": "Managed the construction of a $10M commercial property...",
  "levelsToCEO": 2,
  "managesBudget": {
    "hasBudget": "yes",
    "budgetTypes": ["multiple"],
    "budgetSize": "$5,000,000 annually for project expenses and resources"
  }
}'`}
                      http={`POST /api/classification HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "name": "Michael Carter",
  "industry": "Construction",
  "employeeCount": 150,
  "department": "Project Management",
  "jobTitle": "Senior Project Manager",
  "jobFunction": "senior_manager",
  "primaryResponsibilities": "Oversees multiple high-value construction projects...",
  "directReports": 8,
  "reportingRoles": "Site Supervisors, Project Engineers, Safety Officers",
  "hasIndirectReports": "yes",
  "decisionLevel": "tactical",
  "typicalProject": "Managed the construction of a $10M commercial property...",
  "levelsToCEO": 2,
  "managesBudget": {
    "hasBudget": "yes",
    "budgetTypes": ["multiple"],
    "budgetSize": "$5,000,000 annually for project expenses and resources"
  }
}`}
                    />

                    <ExampleCard
                      title="Level Two Questions Request"
                      description="Retrieve detailed assessment questions based on capability area and previous responses."
                      curl={`curl -X POST https://growth-compass.vercel.app/api/questions/level-two \\
-H "Content-Type: application/json" \\
-d '{
  "capability": "Building a Team",
  "level": 3,
  "answers": {
    "skill": 4,
    "confidence": 3
  }
}'`}
                      http={`POST /api/questions/level-two HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "capability": "Building a Team",
  "level": 3,
  "answers": {
    "skill": 4,
    "confidence": 3
  }
}`}
                    />

                    <ExampleCard
                      title="Development Plan Generation"
                      description="Generate a personalized development plan with AI-powered insights and recommendations."
                      curl={`curl -X POST https://growth-compass.vercel.app/api/streaming \\
-H "Content-Type: application/json" \\
-d '{
  "threadId": "thread_abc123...",
  "userData": {
    "name": "John Doe",
    "role": "Senior Manager"
  },
  "leadershipData": {
    "level": 4,
    "classification": "Senior Manager / Associate Director"
  },
  "responses": {
    "levelOne": [],
    "levelTwo": []
  }
}'`}
                      http={`POST /api/streaming HTTP/1.1
Host: growth-compass.vercel.app
Content-Type: application/json

{
  "threadId": "thread_abc123...",
  "userData": {
    "name": "John Doe",
    "role": "Senior Manager"
  },
  "leadershipData": {
    "level": 4,
    "classification": "Senior Manager / Associate Director"
  },
  "responses": {
    "levelOne": [],
    "levelTwo": []
  }
}`}
                    />
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiReference;
