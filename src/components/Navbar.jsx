'use client';
// Import necessary components and hooks from Next.js and React
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaGamepad } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import useRouter hook from Next.js
import { useEffect, useState } from 'react';

// Define your navigation items
const navigation = [
    { name: 'Games', href: '/games' },
    { name: 'Leetcode', href: '/leetcode' }
];

// Utility function to format current date
function getCurrentFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function component for NavBar
export default function NavBar() {
    const [currentDate, setCurrentDate] = useState(getCurrentFormattedDate());



    const handlePage = (page) => {
        setCurrentPage(page);
    }
    const router = usePathname();

    console.log(router)

    useEffect(() => {
        const liveDate = setInterval(() => setCurrentDate(getCurrentFormattedDate()), 1000);
        return () => clearInterval(liveDate);
    }, []);

    return (
        <Disclosure as="nav" className="bg-customColor-BLUE">
            {({ open }) => (
                <>

                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={'/'} onClick={() => handlePage('/')}>

                                        <FaGamepad style={{ fontSize: 30 }} className={`${router === '/' ? 'text-customColor-ORANGE' : 'text-white'}`} />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">

                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`${router.startsWith(item.href)
                                                    ? 'bg-customColor-ORANGE text-customColor-BLUE'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    } rounded-md px-3 py-2 text-sm font-medium`}
                                                aria-current={router === item.href ? 'page' : undefined}
                                                onClick={() => handlePage(item.href)}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <span style={{ color: 'white' }} className="px-3 py-2 text-sm font-medium">
                                    {currentDate}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu panel */}
                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name} 
                                    href={item.href}
                                    className={`${router.pathname === item.href
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        } block rounded-md px-3 py-2 text-base font-medium`}
                                    aria-current={router.pathname === item.href ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}

                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
