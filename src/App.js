import React, { useState, lazy, Suspense } from 'react';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const News = lazy(() => import('./components/News'));
const SearchNews = lazy(() => import('./components/SearchNews'));

function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  console.log(apiKey);
  const pageSize = 10;

  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchResultsVisible(true);
  };

  var toTopButton = document.getElementById("to-top-button");

  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      toTopButton.classList.remove("hidden");
      toTopButton.classList.add("flex");
    } else {
      toTopButton.classList.remove("flex");
      toTopButton.classList.add("hidden");
    }
  }

  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Router>
        <Navbar onSearch={handleSearch} />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route exact path="/" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="news" pageSize={pageSize} category="general" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/business" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category="business" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/entertainment" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/general" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="news" pageSize={pageSize} category="general" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/health" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} category="health" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/science" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} category="science" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/sports" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} category="sport" country="us" type='top-headlines' />
          </Suspense>} />
          <Route exact path="/technology" element={<Suspense fallback={<div>Loading...</div>}>
            <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} category="technology" country="us" type='top-headlines' />
          </Suspense>} />
          {
            searchResultsVisible && (
              <Route path={`/search/${searchQuery}`} element={<Suspense fallback={<div>Loading...</div>}>
                <SearchNews setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" query={searchQuery} />
              </Suspense>} />
            )
          }
        </Routes>
      </Router>
      <button
        id="to-top-button"
        onClick={goToTop}
        title="Go To Top"
        className="hidden fixed z-50 bottom-8 right-8 border-0 w-10 h-10 rounded-md drop-shadow-md bg-blue-500 text-white text-xl font-bold justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 stroke-current"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}

export default App;
