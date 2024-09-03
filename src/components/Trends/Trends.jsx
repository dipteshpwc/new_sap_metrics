import React, { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import './Trends.css';
import { trendsData } from '../../Data/Data';
import Box from '../Box/Box';

const Trends = () => {

    // State for Dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    
    // State for Date Range Picker
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Refs for parent containers
    const parentRefs = useRef([]);  
  
    const dropdownOptions = ['Dialog Response Time', 'System Dumps', 'Batch Jobs', 'Peak CPU Utilization', 'Memory Usage', 'Disk Usage'];
  
    // Dropdown Handlers
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      console.log(`Selected option: ${option}`);

      // Auto-scroll to the matched Box
      const matchedIndex = trendsData.findIndex(card => card.title === option);
      if (matchedIndex !== -1 && parentRefs.current[matchedIndex]) 
        {
      parentRefs.current[matchedIndex].scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    // Date Range Handlers
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
      console.log(`Start Date: ${e.target.value}`);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
      console.log(`End Date: ${e.target.value}`);
    };

    // Reset Handler
    const handleReset = () => {
      setSelectedOption(null);
      setStartDate('');
      setEndDate('');
    };

  return (
    <>
      <div className='TrendDash'>
        <h1>Trend Page</h1>
        <h4>Version 1.0.0</h4>     
        {/* <Link to="/">Go Back</Link>  */}
        {trendsData.map((card, id)=> {
          return(
              <div key={id} className="parentContainer" ref={el => parentRefs.current[id] = el}>
                  <Box title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
              </div>
          )
        })}
      </div>

      {/* New content for the right section */}
      <div  className='right-content'>
        <h3>Filter</h3>
        <div className="combined-component">
        {/* Dropdown Component */}
          <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              {selectedOption ? selectedOption : 'Select an option'}
              <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                {dropdownOptions.map((option, index) => (
                  <li key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

        {/* Date Range Picker Component */}
          <div className="date-range-picker">
            <input 
              type="date" 
              className="date-input" 
              value={startDate} 
              onChange={handleStartDateChange} 
            />
            <span className="date-separator">to</span>
            <input 
              type="date" 
              className="date-input" 
              value={endDate} 
              onChange={handleEndDateChange} 
            />
          </div>

          {/* Reset Button */}
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
   
  );
};

export default Trends;
