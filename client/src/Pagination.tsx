import React from 'react';
import './Pagination.css';
import {useRef} from 'react';

type Props = {
    totalAdverts: number,
    advertsPerPage: number,
    setCurrentPage: (arg0: number) => void,
    currentPage: number
}

const Pagination = ({totalAdverts, advertsPerPage, setCurrentPage, currentPage}: Props) => {
    let pages = [];
    const inputRef = useRef<HTMLInputElement | null>(null);

    for (let i = 2; i <= Math.ceil(totalAdverts/advertsPerPage); i++)
    {
        pages.push(i);
    }

    let currentPages = [];
    console.log(currentPage+" "+pages.length);
    if (currentPage === 1)
    {
        currentPages = [1].concat(pages.slice(0,3)).concat([pages.length + 1]);
    }
    else if (currentPage === 2)
    {
        currentPages = [1].concat(pages.slice(0,3)).concat([pages.length + 1]);
    }
    else if (currentPage === pages.length)
    {
        currentPages = [1].concat(pages.slice(pages.length-4,pages.length));
    }
    else if (currentPage === pages.length+1)
    {
        currentPages = [1].concat(pages.slice(pages.length-4,pages.length-1)).concat([pages.length + 1]);
    }
    else
    {
        currentPages = [1].concat(pages.slice(currentPage-3, currentPage)).concat([pages.length + 1]);
    }
     

    return (
        <div>
            <div className='pagination'>
                {
                    currentPages.map((page, index) => {
                        return <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : ""}>{page}</button>
                    })
                }
            </div>
            <div className='pagination'>
                <input ref={inputRef} type='number' id='page' name='page' min="1" max={pages.length+1} defaultValue={1}/>
                <button id="choosePage" onClick={() => setCurrentPage(Number(inputRef.current?.value))}>Go to page</button>
            </div>
        </div>
    )
}

export default Pagination