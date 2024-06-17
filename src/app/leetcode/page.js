'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import 'primeicons/primeicons.css';

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function Leetcode() {
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const iconMap = {
        free: 'pi-minus',
        premium: 'pi-bolt'
    };

    const tasksPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedQuestions, setPaginatedQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/questions.json');
                if (!response.ok) {
                    throw new Error('Network issue');
                }
                const data = await response.json();
                setQuestions(data);
                setFilteredQuestions(data); // Initialize filteredQuestions with all questions
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        // Filter questions whenever searchQuery changes
        const filtered = questions.filter(question =>
            question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.id.toString().includes(searchQuery.toLowerCase())
        );
        setFilteredQuestions(filtered);
    }, [searchQuery, questions]);

    useEffect(() => {
        // Update paginatedQuestions whenever currentPage or filteredQuestions change
        const startIndex = (currentPage - 1) * tasksPerPage;
        const endIndex = Math.min(startIndex + tasksPerPage, filteredQuestions.length);
        setPaginatedQuestions(filteredQuestions.slice(startIndex, endIndex));
    }, [currentPage, filteredQuestions]);

    const totalPages = Math.ceil(filteredQuestions.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="m-10 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg divide-y divide-gray-200">
                            <div className="py-3 px-4">
                                <div className="relative max-w-xs">
                                    <label htmlFor="hs-table-with-pagination-search" className="sr-only">Search</label>
                                    <input
                                        type="text"
                                        name="hs-table-with-pagination-search"
                                        id="hs-table-with-pagination-search"
                                        className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        placeholder="Type id or title of the question"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                        <svg className="size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {filteredQuestions.length >= 1 ? (
                                <>
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                    >
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                    >
                                                        Difficulty
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                    >
                                                        Subscription
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {paginatedQuestions.map(question => (
                                                    <tr key={question.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{question.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                            <Link href={`/leetcode/${question.id}`}>{question.title}</Link>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                            <span className={`inline-flex items-center rounded-md ${question.level == 'easy' ? 'bg-green-100' : question.level == 'medium' ? 'bg-gold-200' : 'gray-100'} px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}>
                                                                {question.level}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                            <span className={`inline-flex items-center rounded-md ${question.lock === 'premium' ? 'bg-purple-200' : 'bg-gray-50'} px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}>
                                                                <i className={`pi ${iconMap[question.lock]}`}></i>
                                                                {question.lock === 'premium' ? 'Locked' : ''}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="py-1 px-4">
                                        <nav className="flex items-center space-x-1">
                                            <button
                                                type="button"
                                                className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <BsArrowLeftCircle />
                                                <span className="sr-only">Previous</span>
                                            </button>

                                            {pageNumbers.map((pageNumber) => (
                                                <button
                                                    key={pageNumber}
                                                    type="button"
                                                    className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full ${currentPage === pageNumber ? 'bg-gray-100' : ''}`}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    aria-current={currentPage === pageNumber ? 'page' : undefined}
                                                >
                                                    {pageNumber}
                                                </button>
                                            ))}

                                            <button
                                                type="button"
                                                className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <span className="sr-only">Next</span>
                                                <BsArrowRightCircle />
                                            </button>
                                        </nav>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-1.5 min-w-full inline-block align-middle"> No questions found based on your request <i className="pi pi-folder-open"></i></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
