'use client';
import { useEffect, useState } from "react";

export default function Hello() {
    const Q = [
        { id: 1, title: 'Hello' },
        { id: 2, title: 'Bye' },
        { id: 3, title: 'Salam' },
        { id: 4, title: 'Salam' },
        { id: 5, title: 'Salam' },
    ];

    const tasksPerPage = 2;
    const totalPages = Math.ceil(Q.length / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedQuestions, setPaginatedQuestions] = useState([]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * tasksPerPage;
        const endIndex = Math.min(startIndex + tasksPerPage, Q.length);
        setPaginatedQuestions(Q.slice(startIndex, endIndex));
    }, [currentPage]);

    return (
        <>
            {paginatedQuestions.map(q => (
                <div key={q.id}>
                    <h1>{q.title}</h1>
                </div>
            ))}

            <div>
                {pageNumbers.map(p => (
                    <h1
                        key={p}
                        className="cursor-pointer"
                        onClick={() => handlePageChange(p)}
                    >
                        {p}
                    </h1>
                ))}
            </div>
            {currentPage}
        </>
    );
}
