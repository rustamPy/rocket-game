import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { text } = body;

    const model = genai.GenerativeModel.from_pretrained('models/text-bison-001');
    const response = await model.generateText({ prompt: text, temperature: 0.7 });
    return NextResponse.json({ markdown: response[0].result });
}