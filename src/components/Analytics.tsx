import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface AnalyticsProps {
  answeredQuestions: boolean[];
  hintCounts: number[];
  currentRiskCardQuestions: any[];
  selectedRoles: string[];
  totalScore: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Analytics: React.FC<AnalyticsProps> = ({
  answeredQuestions,
  hintCounts,
  currentRiskCardQuestions,
  selectedRoles,
  totalScore,
}) => {
  // Calculate analytics data
  const correctAnswers = answeredQuestions.filter(Boolean).length;
  const incorrectAnswers = answeredQuestions.filter(answer => !answer).length;
  const totalQuestions = answeredQuestions.length;
  const accuracy = (correctAnswers / totalQuestions) * 100;

  const pieData = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
  ];

  const hintUsageData = hintCounts.map((count, index) => ({
    question: `Q${index + 1}`,
    hints: count,
  }));

  const performanceByRole = selectedRoles.map(role => {
    const roleQuestions = currentRiskCardQuestions.filter(q => q.role === role);
    const correctForRole = roleQuestions.filter((_, idx) => answeredQuestions[idx]).length;
    return {
      role,
      score: (correctForRole / roleQuestions.length) * 100 || 0,
    };
  });

  const strengthsData = [
    { subject: 'Knowledge', score: accuracy },
    { subject: 'Hint Independence', score: 100 - (Math.max(...hintCounts) / 2) * 100 },
    { subject: 'Speed', score: 80 }, // This could be calculated based on time if tracked
    { subject: 'Consistency', score: 75 }, // This could be more dynamic based on patterns
    { subject: 'Overall', score: (totalScore / (totalQuestions * 5)) * 100 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
          <div className="text-4xl font-bold">{Math.round(accuracy)}%</div>
          <p className="mt-2">Total Questions: {totalQuestions}</p>
        </div>

        {/* Correct vs Incorrect Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Answer Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hint Usage Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hint Usage by Question</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hintUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hints" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Areas for Improvement</h3>
        <ul className="space-y-2">
          {accuracy < 70 && (
            <li className="flex items-center text-gray-700">
              <span className="mr-2">•</span>
              Focus on improving overall knowledge of security concepts
            </li>
          )}
          {Math.max(...hintCounts) > 1 && (
            <li className="flex items-center text-gray-700">
              <span className="mr-2">•</span>
              Try to solve more questions without using hints
            </li>
          )}
          {performanceByRole.some(role => role.score < 60) && (
            <li className="flex items-center text-gray-700">
              <span className="mr-2">•</span>
              Review materials related to specific roles where performance was lower
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}; 