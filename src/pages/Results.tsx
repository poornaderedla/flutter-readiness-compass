import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreCard } from "@/components/assessment/ScoreCard";
import { Badge } from "@/components/ui/badge";
import { AssessmentScores } from "@/types/assessment";
import { careerPaths } from "@/data/assessmentData";
import { 
  Brain, 
  Code, 
  Target, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  TrendingUp,
  BookOpen,
  MapPin
} from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores } = location.state as { scores: AssessmentScores };

  const getRecommendation = (overallScore: number) => {
    if (overallScore >= 75) return { result: 'YES', confidence: 85 + (overallScore - 75) };
    if (overallScore >= 50) return { result: 'MAYBE', confidence: 60 + (overallScore - 50) };
    return { result: 'NO', confidence: 40 + overallScore * 0.5 };
  };

  const recommendation = getRecommendation(scores.overall);

  const getRecommendationColor = (result: string) => {
    switch (result) {
      case 'YES': return 'text-success';
      case 'MAYBE': return 'text-warning';
      case 'NO': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (result: string) => {
    switch (result) {
      case 'YES': return CheckCircle;
      case 'MAYBE': return AlertCircle;
      case 'NO': return XCircle;
      default: return AlertCircle;
    }
  };

  const skillAssessment = [
    { skill: "Dart Programming", current: Math.round(scores.technical * 0.7), required: 70, status: "NEEDS_WORK" },
    { skill: "UI/UX Understanding", current: Math.round(scores.psychometric * 0.8), required: 60, status: "GOOD" },
    { skill: "Logic/Algorithms", current: Math.round(scores.technical * 0.9), required: 70, status: "GOOD" },
    { skill: "State Management", current: Math.round(scores.wiscar.skill * 0.6), required: 60, status: "NEEDS_WORK" },
    { skill: "Problem Solving", current: Math.round(scores.wiscar.cognitive), required: 65, status: "GOOD" }
  ];

  const getSkillStatus = (current: number, required: number) => {
    if (current >= required) return "GOOD";
    if (current >= required * 0.7) return "NEEDS_WORK";
    return "CRITICAL";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GOOD": return "text-success";
      case "NEEDS_WORK": return "text-warning";
      case "CRITICAL": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "GOOD": return "✅";
      case "NEEDS_WORK": return "🚧";
      case "CRITICAL": return "❌";
      default: return "❓";
    }
  };

  const Icon = getRecommendationIcon(recommendation.result);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-card-foreground">
              Your Flutter Readiness Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here's your personalized evaluation and career guidance
            </p>
          </div>

          {/* Main Recommendation */}
          <Card className="assessment-card text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <Icon className={`w-16 h-16 ${getRecommendationColor(recommendation.result)}`} />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Should You Learn Flutter?{" "}
                  <span className={getRecommendationColor(recommendation.result)}>
                    {recommendation.result === 'YES' ? '✅ YES' : 
                     recommendation.result === 'MAYBE' ? '🤔 MAYBE' : '❌ NO'}
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Confidence Score: <span className="font-bold">{Math.round(recommendation.confidence)}%</span>
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                {recommendation.result === 'YES' && (
                  <p className="text-success">
                    Excellent! You show strong alignment with Flutter development. Your combination of 
                    motivation, aptitude, and interest suggests you'll thrive in the Flutter ecosystem.
                  </p>
                )}
                {recommendation.result === 'MAYBE' && (
                  <p className="text-warning">
                    You have potential for Flutter development, but some areas need strengthening. 
                    Focus on the skill gaps below to improve your readiness.
                  </p>
                )}
                {recommendation.result === 'NO' && (
                  <p className="text-danger">
                    Flutter might not be the best fit right now. Consider the alternative paths 
                    suggested below or work on foundational skills first.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Detailed Scores */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ScoreCard
              title="Psychological Fit"
              score={Math.round(scores.psychometric)}
              icon={Brain}
              description="Personality & motivation"
            />
            <ScoreCard
              title="Technical Readiness"
              score={Math.round(scores.technical)}
              icon={Code}
              description="Programming aptitude"
            />
            <ScoreCard
              title="WISCAR Score"
              score={Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)}
              icon={Target}
              description="Multi-dimensional readiness"
            />
            <ScoreCard
              title="Overall Readiness"
              score={Math.round(scores.overall)}
              icon={Award}
              description="Combined assessment"
            />
          </div>

          {/* WISCAR Breakdown */}
          <Card className="assessment-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" />
              WISCAR Framework Breakdown
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(scores.wiscar).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{key}</span>
                    <span className="font-bold">{Math.round(value)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full gradient-primary transition-all duration-700"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Assessment */}
          <Card className="assessment-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Skill Gap Analysis
            </h3>
            <div className="space-y-4">
              {skillAssessment.map((skill) => {
                const status = getSkillStatus(skill.current, skill.required);
                return (
                  <div key={skill.skill} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getStatusIcon(status)}</span>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          Current: {skill.current}% | Required: {skill.required}%
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={status === "GOOD" ? "default" : "secondary"}
                      className={getStatusColor(status)}
                    >
                      {status.replace("_", " ")}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Career Recommendations */}
          <Card className="assessment-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Recommended Career Paths
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {careerPaths.map((career) => (
                <div key={career.role} className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <h4 className="font-semibold text-lg">{career.role}</h4>
                  <p className="text-muted-foreground">{career.description}</p>
                  <div>
                    <div className="text-sm font-medium mb-2">Requirements:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.requirements.map((req) => (
                        <Badge key={req} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Path */}
          <Card className="assessment-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Your Learning Path
            </h3>
            <div className="space-y-6">
              {[
                { stage: "Beginner", topics: ["Dart Basics", "Flutter Widgets", "Basic Layouts"], duration: "4-6 weeks" },
                { stage: "Intermediate", topics: ["Navigation", "State Management", "API Integration"], duration: "6-8 weeks" },
                { stage: "Advanced", topics: ["Animations", "Performance", "App Deployment"], duration: "8-10 weeks" }
              ].map((level, index) => (
                <div key={level.stage} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < 2 && <div className="w-0.5 h-16 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="font-semibold text-lg">{level.stage}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{level.duration}</p>
                    <div className="flex flex-wrap gap-2">
                      {level.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Take Assessment Again
            </Button>
            <Button variant="primary" onClick={() => window.print()}>
              Save Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}