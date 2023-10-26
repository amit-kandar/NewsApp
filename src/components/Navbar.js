import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ onSearch }) {
    const [navigation, setNavigation] = useState([
        { name: 'General', href: '/', current: true },
        { name: 'Entertainment', href: '/entertainment', current: false },
        { name: 'Business', href: '/business', current: false },
        { name: 'Health', href: '/health', current: false },
        { name: 'Science', href: '/science', current: false },
        { name: 'Sports', href: '/sports', current: false },
        { name: 'Technology', href: '/technology', current: false },
    ]);

    const location = useLocation();
    const navigate = useNavigate();

    const [showAllItems, setShowAllItems] = useState(true);
    const [searchInput, setSearchInput] = useState('')

    const pathname = location.pathname;

    useEffect(() => {
        if (pathname.startsWith('/search/') && searchInput === '') {
            navigate('/');
        }
    }, [pathname, navigate, searchInput])


    const handleWindowResize = () => {
        setShowAllItems(window.innerWidth >= 1200);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleNavigationClick = (e) => {
        const updatedNavigation = navigation.map((item, index) => ({
            ...item,
            current: item.href === e.target.pathname,
        }));
        setNavigation(updatedNavigation);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchInput);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchInput);
        }
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 fixed w-full top-0 z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center justify-start md:items-stretch">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/" className='flex gap-2'>
                                        <img className="h-8 w-auto" src="https://flowbite.com/docs/images/logo.svg" alt="Your Company" />
                                        <h4 className='hidden text-xl font-bold text-white md:block'>NewsApp</h4>
                                    </Link>
                                </div>
                                <div className="hidden md:ml-6 md:block">
                                    <div className="grid grid-flow-col-dense gap-3">
                                        {showAllItems
                                            ? navigation.map((item) => (
                                                <Link key={item.name} to={item.href} className={classNames(item.current ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
                                                    aria-current={item.current ? 'page' : undefined} onClick={handleNavigationClick}>
                                                    {item.name}
                                                </Link>
                                            ))
                                            : navigation.slice(0, 4).map((item) => (
                                                <Link key={item.name} to={item.href} className={classNames(item.current ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
                                                    aria-current={item.current ? 'page' : undefined} onClick={handleNavigationClick}>
                                                    {item.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-1 md:flex-initial justify-between mx-3 md:mx-0 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-50">
                                <input
                                    type="search"
                                    className="block w-[90%] p-2 text-base text-gray-900 bg-transparent border-none outline-none dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search..."
                                    value={searchInput}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                />
                                <Link to={`/search/${searchInput}`} className='flex items-center w-10'>
                                    <button onClick={handleSearch} className='w-full flex justify-center'>
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>

                            <div className="flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    as={Link}
                                    to={item.href}
                                    key={item.name}
                                    className={classNames(
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover-bg-gray-700 hover-text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    onClick={handleNavigationClick}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    );
}
