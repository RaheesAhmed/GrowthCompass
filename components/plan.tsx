import { CircularProgress } from "@/components/ui/circular-progress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";
import { useState } from "react";

interface PlanProps {
  content: string;
  isLoading: boolean;
  onRegenerate?: () => void;
}

export default function Plan({ content, isLoading, onRegenerate }: PlanProps) {
  const [sharing, setSharing] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leadership-plan.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Leadership Development Plan",
          text: content,
        });
      } else {
        await navigator.clipboard.writeText(content);
        alert("Plan copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <CircularProgress />
          <p className="text-lg text-slate-300">
            Generating your personalized leadership plan...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end space-x-4">
            <Button
              onClick={onRegenerate}
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Plan
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Plan
            </Button>
            <Button
              onClick={handleShare}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={sharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {sharing ? "Sharing..." : "Share Plan"}
            </Button>
          </div>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
