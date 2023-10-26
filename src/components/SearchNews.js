import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import NewsTemplate from './NewsTemplate';
import InfiniteScroll from 'react-infinite-scroll-component';
const TruncatedText = lazy(() => import('./TruncatedText'));

function SearchNews({ setProgress, apiKey, pageSize, query }) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const fetchNews = useCallback(
        async (newPage) => {
            setProgress(10);

            try {
                const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&sortBy=relevancy&page=${newPage}&language=en&pageSize=${pageSize}`;
                const data = await fetch(url, {
                    method: 'GET',
                });

                const parsedData = await data.json();
                if (newPage === 1) {
                    setArticles(parsedData.articles);
                } else {
                    setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
                }
                setTotalResults(parsedData.totalResults);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setProgress(100);
            }
        },
        [setProgress, query, pageSize, apiKey]
    );

    useEffect(() => {
        setArticles([]);
        fetchNews(1);
        document.title = `${capitalizeFirstLetter(query)} - NewsApp`;
    }, [fetchNews, query]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        fetchNews(page + 1);
    };

    return (
        <>
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults}>
                <div className="grid grid-cols-1 gap-4 place-items-center p-2 mt-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {articles.map((item, index) => {
                        if (item.title === null || item.description === null || item.urlToImage === null || item.url === null || item.publishedAt === null || item.author === null || item.source.name === null) {
                            return null;
                        }
                        return (
                            <Suspense key={index} fallback={<div>Loading NewsTemplate...</div>}>
                                <NewsTemplate
                                    title={<TruncatedText text={item.title} maxWords={12} />}
                                    description={<TruncatedText text={item.description} maxWords={20} />}
                                    img={item.urlToImage}
                                    url={item.url}
                                    date={item.publishedAt}
                                    author={item.author}
                                    source={item.source.name}
                                />
                            </Suspense>
                        );
                    })}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default SearchNews;
