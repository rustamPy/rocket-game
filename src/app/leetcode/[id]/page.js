'use client';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import Link from 'next/link';
export default function QuestionDetailPage({ params }) {
    const { id } = params;
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        fetch('/questions.json')
            .then((response) => response.json())
            .then((data) => {
                const questionData = data.find((q) => q.id === parseInt(id));
                setQuestion(questionData);
            });
    }, [id]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="m-10">

                <div className="mb-4 md:mb-0 w-full mx-auto relative">
                    <div className="px-4 lg:px-0">
                        <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                            {question.id} - {question.title}
                        </h2>
                        <Link
                            href="/leetcode"
                            className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                        >
                            &lt; all questions
                        </Link>
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                        <p className='mb-10'>
                            <div style={{ width: '100%', height: 1000, overflow: "hidden" }}>
                                <iframe width='100%' height='1000px' style={{ top: -40, position: 'relative' }} src={question.url}></iframe>
                            </div>
                            <ReactMarkdown>{question.content}</ReactMarkdown>
                        </p>
                        <h2 className="text-4xl font-semibold text-gray-800 leading-tight"> Solution: </h2>
                        <p className='mb-10'>
                            <ReactMarkdown>{question.problem_solution}</ReactMarkdown>
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 leading-tight"> Companies: </h2>

                    </div>

                    <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
                        <div className="p-4 border-t border-b md:border md:rounded">
                            <div className="flex py-2">
                                <img src="https://randomuser.me/api/portraits/men/97.jpg"
                                    className="h-10 w-10 rounded-full mr-2 object-cover" />
                                <div>
                                    <p className="font-semibold text-gray-700 text-sm"> Rustam Karimov </p>
                                    <p className="font-semibold text-gray-600 text-xs"> Engineer </p>
                                </div>
                            </div>
                            <p className="text-gray-700 py-3">
                                Rustam pens articles on technology. It's necessary that one's own thoughts don't disturb the landlord; instead, it should be subtle. Dashwood's branches do whatever it does.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
