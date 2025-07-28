import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {options.map((option) => (
            <Button
              key={option.id}
              variant={selectedOption === option.id ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left p-4 h-auto",
                selectedOption === option.id 
                  ? "bg-blue-600 hover:bg-blue-700 text-white ring-2 ring-blue-300 ring-offset-2" 
                  : "hover:bg-gray-50"
              )}
              onClick={() => onOptionSelect(option.id, option.value)}
            >
              <div className="text-sm leading-relaxed">
                {option.text}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}