import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: [
      "Outdoors — I like fresh air and physical space",
      "Indoors — I prefer climate-controlled environments",
      "A mix of both — variety keeps things interesting",
      "Anywhere — I adapt to any environment"
    ],
    category: 'environment'
  },
  {
    id: 2,
    question: "Which hands-on activity sounds most appealing?",
    options: [
      "Building or constructing something from scratch",
      "Fixing or repairing broken equipment",
      "Installing or connecting technical systems",
      "Designing or planning projects on paper/screen"
    ],
    category: 'interest'
  },
  {
    id: 3,
    question: "How do you feel about working with technology?",
    options: [
      "I love it — give me the latest tools and gadgets",
      "I'm comfortable — I can learn new tech quickly",
      "I prefer hands-on work with minimal screens",
      "I like a balance of tech and physical work"
    ],
    category: 'preference'
  },
  {
    id: 4,
    question: "What's your biggest natural strength?",
    options: [
      "Problem-solving — I figure things out logically",
      "Physical coordination — I'm good with my hands",
      "Attention to detail — I notice things others miss",
      "Communication — I work well with people"
    ],
    category: 'strength'
  },
  {
    id: 5,
    question: "How important is earning potential in your career choice?",
    options: [
      "Very important — I want the highest pay possible",
      "Important — but job satisfaction matters more",
      "Somewhat important — I want stability over high pay",
      "Not a priority — I want to do what I love"
    ],
    category: 'preference'
  },
  {
    id: 6,
    question: "What kind of physical work are you comfortable with?",
    options: [
      "Heavy lifting and intense physical labor",
      "Moderate physical activity throughout the day",
      "Light physical work with some desk time",
      "Mostly sedentary with occasional movement"
    ],
    category: 'environment'
  },
  {
    id: 7,
    question: "Which of these projects would you most enjoy?",
    options: [
      "Wiring a house for electrical and smart home systems",
      "Building custom cabinets or furniture",
      "Welding parts for a large structure",
      "Installing and maintaining HVAC systems"
    ],
    category: 'interest'
  },
  {
    id: 8,
    question: "How do you prefer to learn new skills?",
    options: [
      "Hands-on practice — show me and let me try",
      "Structured classroom training with theory",
      "Online courses I can do at my own pace",
      "Apprenticeship — learn on the job from a mentor"
    ],
    category: 'preference'
  },
  {
    id: 9,
    question: "What matters most about your future career?",
    options: [
      "Job security — always in demand",
      "Growth potential — room to advance or start my own business",
      "Work-life balance — predictable schedule",
      "Making an impact — contributing to something meaningful"
    ],
    category: 'preference'
  },
  {
    id: 10,
    question: "Are you open to travel or relocation for work?",
    options: [
      "Yes — I'd love to travel to different job sites",
      "Some travel is fine — within my region",
      "I prefer staying local — close to home",
      "I'm flexible — depends on the opportunity"
    ],
    category: 'environment'
  }
];
