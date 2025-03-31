import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// PDF.js worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeView = ({ userId }) => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch resume when component mounts
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`/api/resume/view/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          responseType: 'blob', // Get the PDF as a blob
        });

        // Create a URL for the PDF blob
        const fileURL = URL.createObjectURL(data);
        setResumeUrl(fileURL);
      } catch (error) {
        console.error('Error fetching resume:', error.response?.data?.message || error.message);
      }
    };

    fetchResume();
  }, [userId]);

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>

      {resumeUrl ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          {/* PDF Viewer */}
          <Document file={resumeUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
              className={`px-4 py-2 rounded-lg ${
                pageNumber === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
              }`}
            >
              Previous
            </button>
            <p className="text-lg">
              Page {pageNumber} of {numPages}
            </p>
            <button
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
              disabled={pageNumber === numPages}
              className={`px-4 py-2 rounded-lg ${
                pageNumber === numPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No resume available to preview.</p>
      )}
    </div>
  );
};

export default ResumeView;
