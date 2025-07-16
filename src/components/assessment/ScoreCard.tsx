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
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-danger";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className={cn("assessment-card", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-accent">
              <Icon className="w-5 h-5 text-accent-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={cn("text-2xl font-bold", getScoreColor(percentage))}>
            {score}
          </div>
          <div className="text-sm text-muted-foreground">/{maxScore}</div>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-700", getProgressColor(percentage))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}