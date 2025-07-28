import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export function ScoreCard({ 
  title, 
  score, 
  maxScore = 100, 
  icon: Icon, 
  description, 
  className 
}: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-600";
    if (percentage >= 60) return "bg-orange-600";
    return "bg-red-600";
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-blue-100">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-gray-900">{title}</CardTitle>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className={cn("text-2xl font-bold", getScoreColor(percentage))}>
              {score}
            </div>
            <div className="text-sm text-gray-600">/{maxScore}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn("h-2 rounded-full transition-all duration-700", getProgressColor(percentage))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}