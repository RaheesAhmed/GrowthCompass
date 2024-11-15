import { CircularProgress } from "@/components/ui/circular-progress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, Star } from "lucide-react";
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
    <div className="min-h-screen bg-slate-900 text-white mt-10">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <Star className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">
              Your Development Plan
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-slate-700">
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <CircularProgress />
              <div className="space-y-2 text-center">
                <p className="text-xl font-medium text-white">
                  Crafting Your Leadership Journey
                </p>
                <p className="text-slate-400">
                  Generating your personalized development plan...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700">
            {/* Action Buttons */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={onRegenerate}
                  className="relative group px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white rounded-lg hover:opacity-90 transition-all"
                  disabled={isLoading}
                >
                  <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Regenerate Plan
                </Button>
                <Button
                  onClick={handleDownload}
                  className="relative group px-4 py-2 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white rounded-lg hover:opacity-90 transition-all"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                  Download Plan
                </Button>
                <Button
                  onClick={handleShare}
                  className="relative group px-4 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-lg hover:opacity-90 transition-all"
                  disabled={sharing}
                >
                  <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {sharing ? "Sharing..." : "Share Plan"}
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="prose prose-slate prose-invert max-w-none ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="markdown-content text-white"
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700/50 bg-slate-900/30">
              <p className="text-sm text-slate-400 text-center">
                This plan is tailored to your assessment results and leadership
                level. You can download, share, or regenerate it at any time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
