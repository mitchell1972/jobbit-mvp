import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { QuizAnswer, TradeMatch } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { answers }: { answers: QuizAnswer[] } = await request.json();

    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { error: 'Quiz answers are required' },
        { status: 400 }
      );
    }

    const formattedAnswers = answers
      .map((a) => `Q${a.questionId} (${a.category}): ${a.answer}`)
      .join('\n');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are a career matching AI for Jobbit, a platform that matches young people (ages 16-30) with skilled trade careers, union apprenticeships, and certification programs.

Based on the following quiz answers, return exactly 3 trade career matches as a JSON array. Each match must include:
- rank (1-3)
- trade (career name)
- matchScore (0-100 percentage)
- salaryRange (e.g. "$45,000 - $75,000")
- whyMatch (2-3 sentence personalized explanation)
- skillGaps (array of 2-3 skills they'd need to develop)
- actionPlan (array of exactly 6 steps, each with: step number, title, detail, timeEstimate, cost like "Free" or "$200-500", priority as "high"/"medium"/"low")

Quiz Answers:
${formattedAnswers}

Return ONLY valid JSON — no markdown, no code fences, no extra text. Just the JSON array.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    let matches: TradeMatch[];
    try {
      matches = JSON.parse(content.text);
    } catch {
      // Try to extract JSON from response if it contains extra text
      const jsonMatch = content.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        matches = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Match API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate matches. Please try again.' },
      { status: 500 }
    );
  }
}
