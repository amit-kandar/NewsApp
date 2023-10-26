import React from 'react';

function NewsTemplate({ title, description, source, date, url, img, author }) {
    date = new Date(date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    return (
        <div className="max-w-md sm:max-w-2xl md:max-w-[420px] h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row md:flex-col">
            <a href={url} target='_blank' rel="noreferrer" className="relative sm:min-w-[341px] md:w-full">
                <span className='bg-red-600 text-white px-1 z-10 absolute right-0 top-0 rounded-r-lg rounded-br-lg'>{source}</span>
                <img
                    className="min-w-full rounded-t-lg sm:h-48"
                    src={img}
                    alt={title}
                />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description}
                </p>
                <p className='text-white font-thin mb-3'>
                    By - {author}, at: {date}
                </p>
                <a
                    href={url}
                    rel="noreferrer"
                    target='_blank'
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default NewsTemplate;
