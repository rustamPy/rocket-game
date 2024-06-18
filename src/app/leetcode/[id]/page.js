'use client';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import hljs from '@/components/Highlight'; // Ensure this path is correct

import { markdownToHtml } from '@/tools/parser';



export default function QuestionDetailPage({ params }) {
    const { id } = params;
    const [question, setQuestion] = useState(null);
    const [markdownSolution, setMarkdownSolution] = useState('');

    useEffect(() => {
        // Manually trigger highlight.js on page load
        hljs.highlightAll();
    }, []);

    useEffect(() => {
        const fetchQuestionData = async () => {
            const res = await fetch('/questions.json');
            const data = await res.json();
            const questionData = data.find((q) => q.id === parseInt(id));
            setQuestion(questionData);
        };

        const fetchMarkdownContent = async () => {
            const htmlContent = await markdownToHtml(`${id}.md`);
            if (htmlContent) {
                setMarkdownSolution(htmlContent);
            } else {
                setMarkdownSolution('Nothing found')
            }

        };

        fetchQuestionData();
        fetchMarkdownContent();
    }, [id]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <main className="m-10">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                    <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                        {question.id} - {question.title}
                    </h2>
                    <Link href="/leetcode" className="py-2 text-green-700 inline-flex items-center justify-center mb-2">
                        &lt; all questions
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                    <div style={{ width: '100%', height: 1000, overflow: 'hidden' }}>
                        <iframe width='100%' height='1000px' style={{ top: -40, position: 'relative' }} src={question.url}></iframe>
                    </div>
                    <h2 className="text-4xl font-semibold text-gray-800 leading-tight">Solution:</h2>

                    <div className='innerSolution hljs python' dangerouslySetInnerHTML={{ __html: markdownSolution }} />

                    <h2 className="text-xl font-semibold text-gray-800 leading-tight">Companies:</h2>
                    <ul>
                        {question.companies.map(c => {
                            return (<li>{c}</li>)
                        })}
                    </ul>
                </div>

                <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                    <div className="p-4 border-t border-b md:border md:rounded">
                        <div className="flex py-2">
                            <img
                                src="https://avatars.githubusercontent.com/u/35258613?v=4"
                                className="h-10 w-10 rounded-full mr-2 object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-700 text-sm">Rustam Karimov</p>
                                <p className="font-semibold text-gray-600 text-xs">Engineer</p>
                            </div>
                        </div>
                        <p className="text-gray-700 py-3">
                            Rustam pens articles on technology. It's necessary that one's own thoughts don't disturb the landlord; instead, it should be subtle. Dashwood's branches do whatever it does.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
