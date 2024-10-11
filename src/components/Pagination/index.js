import React, { useEffect, useState } from "react";
import './index.css'
import Home from '../Home'
import axios from "axios";

const Pagination = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0); 

  const handlePageChange = (event) => {
        // Assuming event.target.id contains a JSON string representing the page number
        const pageNumber = JSON.parse(event.target.id); 
        this.setState({
            currentPage: Number(pageNumber), // Make sure to convert it to a number if needed
        });
    };

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      const response = await axios.get(
        "https://apis.ccbp.in/blogs"
      ); 
      setData(response.data);
      setLoading(false) 
      setTotalItems(response.data.length); // Total items if provided by the API
    };

    fetchData();
  }, []);
  console.log(data)

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}

  // Total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <ul>
        {currentItems.map(each=>(
            <Home key={each.id} homeDetails={each} loading={loading}/>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

       <ul className="pagination">
            {pageNumbers.map((number) => (
                 <li key={number} id={number} onClick={handlePageChange} style={{ display: 'inline', margin: '5px', cursor: 'pointer' }}>
                    {number}
                </li>
             ))}            
		</ul>
        <span>
        
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
