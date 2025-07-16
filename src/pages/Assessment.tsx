import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentLayout } from "@/components/assessment/AssessmentLayout";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ScoreCard } from "@/components/assessment/ScoreCard";
import { Button } from "@/components/ui/button";
import { assessmentSections } from "@/data/assessmentData";
import { AssessmentResponse, AssessmentScores } from "@/types/assessment";
import { Brain, Code, Target, Award } from "lucide-react";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentSection = assessmentSections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = responses.length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  const handleOptionSelect = (optionId: string, value: number) => {
    if (!currentQuestion) return;

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      optionId,
      value
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNext = () => {
    if (!currentSection) return;

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < assessmentSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = assessmentSections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const getCurrentResponse = () => {
    return responses.find(r => r.questionId === currentQuestion?.id);
  };

  const canGoNext = () => {
    if (!currentQuestion) return true;
    return !!getCurrentResponse();
  };

  const canGoPrevious = () => {
    return currentSectionIndex > 0 || currentQuestionIndex > 0;
  };

  const calculateScores = (): AssessmentScores => {
    const psychometricQuestions = responses.filter(r => 
      assessmentSections[1]?.questions.some(q => q.id === r.questionId)
    );
    const technicalQuestions = responses.filter(r => 
      assessmentSections[2]?.questions.some(q => q.id === r.questionId)
    );
    const wiscarQuestions = responses.filter(r => 
      assessmentSections[3]?.questions.some(q => q.id === r.questionId)
    );

    const psychometric = psychometricQuestions.length > 0 
      ? psychometricQuestions.reduce((sum, r) => sum + r.value, 0) / psychometricQuestions.length 
      : 0;

    const technical = technicalQuestions.length > 0 
      ? technicalQuestions.reduce((sum, r) => sum + r.value, 0) / technicalQuestions.length 
      : 0;

    const wiscarByCategory = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    wiscarQuestions.forEach(response => {
      const question = assessmentSections[3]?.questions.find(q => q.id === response.questionId);
      if (question) {
        const category = question.category as keyof typeof wiscarByCategory;
        if (wiscarByCategory.hasOwnProperty(category)) {
          wiscarByCategory[category] = response.value;
        }
      }
    });

    const overall = (psychometric + technical + Object.values(wiscarByCategory).reduce((a, b) => a + b, 0) / 6) / 3;

    return {
      psychometric,
      technical,
      wiscar: wiscarByCategory,
      overall
    };
  };

  const handleViewResults = () => {
    const scores = calculateScores();
    navigate('/results', { state: { scores, responses } });
  };

  if (!currentSection) {
    return <div>Loading...</div>;
  }

  if (isComplete) {
    const scores = calculateScores();
    
    return (
      <AssessmentLayout
        title="Assessment Complete!"
        subtitle="Here's a preview of your scores"
        progress={100}
        onNext={handleViewResults}
        nextLabel="View Detailed Results"
        canGoPrevious={false}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ScoreCard
            title="Psychological Fit"
            score={Math.round(scores.psychometric)}
            icon={Brain}
            description="Personality and motivation alignment"
          />
          <ScoreCard
            title="Technical Readiness"
            score={Math.round(scores.technical)}
            icon={Code}
            description="Programming and logical aptitude"
          />
          <ScoreCard
            title="WISCAR Assessment"
            score={Math.round(Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6)}
            icon={Target}
            description="Multi-dimensional readiness"
          />
          <ScoreCard
            title="Overall Score"
            score={Math.round(scores.overall)}
            icon={Award}
            description="Combined readiness index"
          />
        </div>
      </AssessmentLayout>
    );
  }

  if (currentSection.questions.length === 0) {
    // Introduction section
    return (
      <AssessmentLayout
        title={currentSection.title}
        subtitle={currentSection.description}
        progress={progress}
        onNext={handleNext}
        canGoPrevious={canGoPrevious()}
        onPrevious={handlePrevious}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="assessment-card">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              🚀 Should I Learn Flutter?
            </h2>
            <div className="space-y-4 text-card-foreground">
              <div>
                <h3 className="text-lg font-semibold mb-2">🔍 Purpose</h3>
                <p>To assess whether Flutter, a cross-platform UI toolkit, aligns with your interests, mindset, current skills, and career goals.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">💡 What is Flutter?</h3>
                <p>Flutter is an open-source UI toolkit from Google for building natively compiled applications for mobile, web, and desktop from a single codebase using the Dart language.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">🧑‍💻 Careers Associated with Flutter:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Flutter Developer</li>
                  <li>Mobile App Developer</li>
                  <li>Cross-platform Engineer</li>
                  <li>Frontend Developer</li>
                  <li>UI/UX Developer</li>
                  <li>App Architect</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">✅ Who Thrives with Flutter?</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Problem-solvers with design & logic balance</li>
                  <li>Creatives who enjoy building interfaces</li>
                  <li>Developers who want efficient, scalable codebases</li>
                  <li>People who value fast results and tangible output</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  return (
    <AssessmentLayout
      title={currentSection.title}
      subtitle={currentSection.description}
      progress={progress}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={canGoNext()}
      canGoPrevious={canGoPrevious()}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-center text-sm text-muted-foreground">
            Question {answeredQuestions + 1} of {totalQuestions}
          </div>
        </div>
        
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={getCurrentResponse()?.optionId}
          onOptionSelect={handleOptionSelect}
        />
      </div>
    </AssessmentLayout>
  );
}