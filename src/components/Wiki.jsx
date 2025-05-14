import React, { useState } from 'react';
import axios from 'axios';

const Wiki = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setErrorMsg('Please enter a search value');
      setResults([]);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.get(`${url}${searchTerm}`);
      const resultList = response.data.query.search;

      if (resultList.length < 1) {
        setErrorMsg('No results found. Please try again.');
        setResults([]);
        return;
      }

      setResults(resultList);
    } catch (error) {
      setErrorMsg('Something went wrong while fetching data.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Search Wikipedia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="results">
        {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}
        {loading && <div className="text-blue-500">Loading...</div>}
        {!loading && results.length > 0 && (
          <div className="grid gap-4">
            {results.map(({ title, snippet, pageid }) => (
              <a
                key={pageid}
                href={`https://en.wikipedia.org/?curid=${pageid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded hover:bg-gray-50 transition"
              >
                <h4 className="text-lg font-semibold">{title}</h4>
                <p
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: snippet }}
                ></p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wiki;
