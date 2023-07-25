import React, { useState } from 'react';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
import trashBinImage from '../images/Trashbin.png';

const FileList: React.FC = () => {
  // Sample data - Replace this with data fetched from your backend API
  const files = [
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3', lastModified:'07-24-2023' },
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3', lastModified:'07-24-2023'},
    // { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    // { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' , lastModified:'07-24-2023'},
    // { id: '17eKuWffSREjjJWVIgoSrvB0icBBIcByh', name: '3minVideo- Mariel Genodiala.mp4', thumbnailUrl: 'https://lh3.google.com/u/0/d/17eKuWffSREjjJWVIgoSrvB0icBBIcByh=w494-h370-p-k-nu-iv3' },
 
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
    <div style={{ paddingTop:'5rem', width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <form style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 0.8, borderRadius: '40px', height: '30px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', padding: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 0.15, borderRadius: '40px', background: '#fff' }}>
          <FaSearch style={{ paddingLeft: '12px', fontSize: '24px', color: 'gray' }} />
        </div>
        <input
          style={{
            flex: 0.85,
            fontSize: '20px',
            borderRadius: '40px',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            paddingLeft: '12px',
          }}
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <button style={{ marginLeft: '24px', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', fontSize: '20px', height: '70px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="green" className="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm4 8h-3v3H7v-3H4V7h3V4h1v3h3v1z" />
        </svg>
        <span style={{ marginLeft: '12px' }}>New</span>
      </button>

      <button style={{ marginLeft: '24px', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', fontSize: '20px', height: '70px' }}>
        <img src={trashBinImage} alt="Bin" style={{ width: '28px', height: '28px', marginRight: '12px' }} />
        <span>Bin</span>
      </button>


    <button style={{ marginLeft: '24px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '20px', height: '70px' }}>Activity Log</button>

    <div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ color: '#000', marginRight: '12px', marginLeft:'15px', fontSize: '20px' }}>Sort by:</span>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',  // Make the options appear below vertically
      alignItems: 'flex-start', // Align the options to the left
      position: 'relative',     // Required for positioning the dropdown
      fontSize: '15px',
    }}
    onClick={handleDropdownToggle}
  >
    <div
      style={{
        background: '#71C887',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
      }}
    >
      <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>{selectedOption}</span>
      <FaCaretDown style={{ fontSize: '16px', color: '#fff' }} />
    </div>
    {isDropdownOpen && (
      <div
        style={{
          background: '#fff',   // Change the background to white
          borderRadius: '4px',
          position: 'absolute',
          top: '100%',           // Position the dropdown below the main div
          left: 0,               // Align the dropdown with the left side
          marginTop: '8px',
          padding: '8px',
          fontSize: '20px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // Optional: Add a shadow for better visibility
        }}
      >
        <div style={{ cursor: 'pointer', color: '#000' }} onClick={() => handleOptionSelect('All')}>
          All
        </div>
        <div style={{ cursor: 'pointer', color: '#000' }} onClick={() => handleOptionSelect('Date')}>
          Date
        </div>
        <div style={{ cursor: 'pointer', color: '#000' }} onClick={() => handleOptionSelect('Size')}>
          Size
        </div>
      </div>
    )}
  </div>
  <button style={{ marginLeft: '24px', cursor: 'pointer', background: 'none', border: 'none', color: 'red', fontSize: '10px' }}>Clear Filter</button>
</div>

    </form>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '3rem' }}>
  {files.map((file) => (
    <div
      key={file.id}
      style={{
        flex: '0 0 calc(33.33% - 20px)', // Set the initial size of each file item to one-third of the container minus margins
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '20rem', // Set the maximum width of each file item
      }}
    >
      <div style={{ backgroundColor: '#71C887', padding: '20px', borderRadius: '8px' }}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {file.name}
          <span style={{ fontWeight: 'bold', marginLeft: '5px', cursor: 'pointer' }}>
            ...
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img
            src={file.thumbnailUrl}
            alt="Thumbnail preview of a Drive item"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', paddingBottom:'10px' }}
          />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '14px', color: '#888', backgroundColor: 'transparent', padding: '5px', fontStyle:'italic' }}>
        Last Modified: {file.lastModified}
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default FileList;


