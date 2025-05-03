export interface AssessmentData {
  id: string;
  timestamp: string;
  selectedRoles: string[];
  scores: {
    cardId: string;
    cardTitle: string;
    score: number;
    maxScore: number;
    answeredQuestions: boolean[];
    selectedAnswers: number[];
  }[];
  hintCounts?: number[];
}

class AssessmentStore {
  private assessments: AssessmentData[] = [];

  addAssessment(assessment: AssessmentData) {
    this.assessments.push(assessment);
  }

  getAssessments(): AssessmentData[] {
    return this.assessments;
  }

  getAssessmentById(id: string) {
    return this.assessments.find(a => a.id === id);
  }
}

export const assessmentStore = new AssessmentStore(); 