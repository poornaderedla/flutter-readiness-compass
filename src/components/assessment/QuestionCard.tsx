import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuestionOption {
  id: string;
  text: string;
  value: number;
}

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedOption?: string;
  onOptionSelect: (optionId: string, value: number) => void;
  className?: string;
}

export function QuestionCard({ 
  question, 
  options, 
  selectedOption, 
  onOptionSelect, 
  className 
}: QuestionCardProps) {
  return (
    <Card className={cn("assessment-card", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          {question}
        </h3>
      </div>
      
      <div className="space-y-3">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={selectedOption === option.id ? "primary" : "outline"}
            className={cn(
              "w-full justify-start text-left p-4 h-auto",
              selectedOption === option.id && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => onOptionSelect(option.id, option.value)}
          >
            <div className="text-sm leading-relaxed">
              {option.text}
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}