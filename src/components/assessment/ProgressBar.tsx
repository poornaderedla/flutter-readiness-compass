import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ progress, className, showPercentage = true }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Progress</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}