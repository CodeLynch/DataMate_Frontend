import React, { useState } from 'react';
import { FaSearch, FaCaretDown } from 'react-icons/fa';


const FileList: React.FC = () => {
  // Sample data - Replace this with data fetched from your backend API
  const files = [
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3', lastModified:'07-24-2023' },
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3', lastModified:'07-24-2023'},
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' },
    // Add more files as needed
  ];


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All'); // Set initial selected option

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option:any) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
  };


  return (
    <div style={{ padding: '5rem', width: '100%', }}>
    {/* <form style={{ width: '100%', maxWidth: '75%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', borderBottom: '1px solid #cbd5e0', paddingTop: '8px', paddingBottom: '8px' }}>
          <input
            style={{ flex: 1, maxWidth: '25%', padding: '12px 16px', fontSize: '10px', borderRadius: '4px', border: '1px solid #a0aec0' }}
            type="text"
            placeholder="Search Forms"
            aria-label="Search Forms"
          />
          <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm4 8h-3v3H7v-3H4V7h3V4h1v3h3v1z" />
            </svg>
          </button>
          <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M1.5 4.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v.5H1v-.5z" />
              <path d="M4.293 1.293a1 1 0 0 1 1.414 0L8 3.586l2.293-2.293a1 1 0 1 1 1.414 1.414L9.414 5l2.293 2.293a1 1 0 0 1-1.414 1.414L8 6.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 5 4.293 2.707a1 1 0 0 1 0-1.414z" />
              <path fillRule="evenodd" d="M.5 6.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v9a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v-9z" />
            </svg>
          </button>
          <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>Activity Log</button>
          <select style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>
            <option>Sort by</option>
            <option>Name</option>
            <option>Date</option>
            <option>Size</option>
          </select>
          <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>Clear Filter</button>
        </div>
      </form> */}
       <form style={{ width: '100%', maxWidth: '75%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }}>
        
               <div
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '25%',
        borderRadius: '20px', // Changing the border radius to make it oval shape
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', // Adding a bottom shadow
      }}
    >
          <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
         
          padding: '10px',
          borderRadius: '20px', // Match the border radius with the outer div to maintain the oval shape
        }}
      >
        <FaSearch style={{ fontSize: '14px', color: 'gray' }} /> {/* Search icon */}
      </div>
      <input
        style={{
          flex: 1,
          // padding: '12px 16px',
          fontSize: '10px',
          borderRadius: '20px', // Match the border radius with the outer div to maintain the oval shape
          border: 'none', // Remove the border
          outline: 'none', // Remove the default input focus outline
          boxShadow: 'none', // Remove any existing box shadow from the input
        }}
        type="text"
        placeholder="Search Forms"
        aria-label="Search Forms"
      />
  
    </div>
              

  <div style={{ display: 'flex', alignItems: 'center' }}>
  <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-plus-circle" viewBox="0 0 16 16">
      <path d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm4 8h-3v3H7v-3H4V7h3V4h1v3h3v1z" />
    </svg>
    <span style={{ marginLeft: '4px' }}>New</span>
  </button>
  <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
      <path d="M0 2.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5V4h-16V2.5zM1 2v-.5A1.5 1.5 0 0 1 2.5 0h11A1.5 1.5 0 0 1 15 1.5V2H1z"/>
      <path fillRule="evenodd" d="M.5 5.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v9a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v-9zm2-.5V14h12V5H2z"/>
    </svg>
    <span style={{ marginLeft: '4px' }}>Bin</span>
  </button>
</div>



              <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>Activity Log</button>
              {/* <select style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>
                <option>Sort by</option>
                <option>Name</option>
                <option>Date</option>
                <option>Size</option>
              </select> */}
             <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ color: '#000', marginRight: '8px' }}>Sort by:</span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#48bb78',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
        onClick={handleDropdownToggle} // Toggle the dropdown when the caret icon is clicked
      >
        <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '4px' }}>{selectedOption}</span>
        <FaCaretDown style={{ fontSize: '12px', color: '#fff' }} />
      </div>
      {isDropdownOpen && ( // Display the dropdown options if the state isDropdownOpen is true
        <div
          style={{
            background: '#48bb78',
            borderRadius: '4px',
            position: 'absolute',
            marginTop: '4px',
            padding: '4px',
          }}
        >
          <div style={{ cursor: 'pointer', color: '#fff' }} onClick={() => handleOptionSelect('All')}>
            All
          </div>
          <div style={{ cursor: 'pointer', color: '#fff' }} onClick={() => handleOptionSelect('Date')}>
            Date
          </div>
          <div style={{ cursor: 'pointer', color: '#fff' }} onClick={() => handleOptionSelect('Size')}>
            Size
          </div>
        </div>
      )}
    </div>
              <button style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none', color:'red' }}>Clear Filter</button>
            </div>
          </form>
    <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'left', marginTop: '3rem' }}>
      {files.map((file) => (
        <div
          key={file.id}
          style={{
            width: '100%',
            maxWidth: '20rem', // Adjust this value to set the maximum width of each file item
            flex: '1 1 auto', // Allow file containers to grow to occupy the space in a row
            backgroundColor: '#f1f1f1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
            <div style={{ cursor: 'pointer' }}>...</div>
          </div>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={file.thumbnailUrl} alt="Thumbnail preview of a Drive item" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '14px', color: '#888' }}>
        Last Modified: {file.lastModified}
        </div>
        </div>
        
      ))}
      
    </div>
    </div>
  );
};

export default FileList;


