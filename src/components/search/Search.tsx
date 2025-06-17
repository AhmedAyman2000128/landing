import type { SearchableEntry } from '@/types';
import { plainify } from '@lib/textConverter';
import Fuse from 'fuse.js';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

const descriptionLength = 200;

interface Props {
    searchList: SearchableEntry[];
}

interface SearchResult {
    item: SearchableEntry;
    refIndex: number;
}

const getPath = (entry: SearchableEntry) => {
    return `${entry.collection}/${entry.id.replace('-index', '')}`;
};

// Function to extract headings from the body
const extractHeadings = (body: string) => {
    const headingRegex = /^(#{1,6})\s(.*)$/gm; // Regex to match headings like # Heading, ## Heading, etc.
    const headings: string[] = [];
    let match = headingRegex.exec(body);
    while (match !== null) {
        headings.push(match[2]); // Push the text of the heading (without the #)
        match = headingRegex.exec(body);
    }
    return headings;
};

const SearchPage = ({ searchList }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputVal, setInputVal] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputVal(e.currentTarget.value);
    };

    // Prepare searchable data
    const enhancedSearchList = searchList.map((entry) => ({
        ...entry,
        headings: extractHeadings(entry.body || ''), // Add extracted headings
    }));

    const fuse = new Fuse(enhancedSearchList, {
        keys: [
            'data.title',
            'data.description',
            'id',
            'collection',
            'body',
            'headings', // Add headings to the searchable keys
        ],
        includeMatches: true,
        minMatchCharLength: 3,
        threshold: 0.5,
    });

    useEffect(() => {
        const searchUrl = new URLSearchParams(window.location.search);
        const searchStr = searchUrl.get('q');
        if (searchStr) {
            setInputVal(searchStr);
        }

        setTimeout(() => {
            inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
                searchStr?.length || 0;
        }, 50);
    }, []);

    useEffect(() => {
        const inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
        setSearchResults(inputResult);

        if (inputVal.length > 0) {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('q', inputVal);
            const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
            history.pushState(null, '', newRelativePathQuery);
        } else {
            history.pushState(null, '', window.location.pathname);
        }
    }, [inputVal]);

    return (
        <section className="section-sm">
            <div className="container">
                <div className="row mb-10 justify-center">
                    <div className="col-10 lg:col-8 px-0">
                        <div className="flex flex-nowrap">
                            <input
                                className="w-full glass rounded-lg px-6 py-4 text-white placeholder:text-white  focus:ring-transparent intersect:animate-fadeDown opacity-0 intersect-no-queue"
                                placeholder="search docs"
                                type="search"
                                name="search"
                                value={inputVal}
                                onChange={handleChange}
                                autoComplete="off"
                                autoFocus
                                ref={inputRef}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {searchResults?.length < 1 ? (
                        <div className="col-10 lg:col-8 mx-auto p-2 text-center glass rounded-lg intersect:animate-fadeUp opacity-0">
                            <p>
                                {inputVal.length < 1
                                    ? 'Looking for something?'
                                    : "We couldn't find what you searched for. Try searching again."}
                            </p>
                        </div>
                    ) : (
                        searchResults?.map(({ item }, index) => {
                            // Filter headings that match the search term
                            const matchedHeadings = item.headings.filter((heading) =>
                                heading.toLowerCase().includes(inputVal.toLowerCase()),
                            );

                            return (
                                <div className="py-2 px-0" key={`search-${index}`}>
                                    <a
                                        className="block h-full glass col-10 lg:col-8 mx-auto rounded-lg p-4 intersect:animate-fade opacity-0"
                                        href={`/${getPath(item)}`}
                                    >
                                        <h4 className="mb-2">
                                            <p>{item.data.title}</p>
                                        </h4>
                                        {item.data.description && (
                                            <p className="">{item.data.description}</p>
                                        )}
                                        {!item.data.description &&
                                            item.data.autodescription &&
                                            item.body && (
                                                <p className="">
                                                    {plainify(
                                                        item.body.slice(0, descriptionLength),
                                                    )}
                                                </p>
                                            )}
                                        {matchedHeadings.length > 0 && (
                                            <div className="mt-2">
                                                <strong>Title(s) found:</strong>
                                                <ul>
                                                    {matchedHeadings.map((heading, idx) => (
                                                        <li key={idx}>
                                                            <p className="text-blue-500">
                                                                {heading}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </a>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default SearchPage;
