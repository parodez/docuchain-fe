import React, { useState } from "react";
import Header from "../../Header";
import "./Documents.css";

function Documents() {
  // const documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18];
  // const documents = [1, 2, 3, 4];
  // const documents = [1, 2];

  const [viewingDocument, setViewingDocument] = useState(null);

  const exitView = () => {
    setViewingDocument(null);
  };

  return (
    <div className="documents">
      <Header />
      <div className="documents-container">
        <div className="documents-main">
          <h1>Documents</h1>
          <div className="documents-content">
            {!viewingDocument && (
              <>
                <div className="documents-search-container">
                  <div className="sort-button">
                    <p>File Type</p>
                    <p>^</p>
                  </div>
                  <div className="documents-search-div">
                    <input
                      type="text"
                      className="documents-search"
                      placeholder="File name"
                    />
                    <div className="search-button">Q</div>
                  </div>
                </div>
                <div className="documents-body">
                  {documents.map((x) => {
                    return (
                      <div
                        key={x}
                        className="document"
                        onClick={() => {
                          setViewingDocument(x);
                        }}
                      >
                        <div />
                        <div>
                          <div>
                            {/* <div /> */}
                            <p className="document-file-name">File {x}</p>
                            <div />
                            <div />
                          </div>
                          <div className="document-view-button">&gt;</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {viewingDocument && (
              <>
                <div className="document-view-head">
                  <div className="document-view-backBtn" onClick={exitView}>
                    &lt;
                  </div>
                  <p>File {viewingDocument}</p>
                  <div />
                </div>
                <div className="document-view-body">
                  <div className="document-view-fileImg" />
                  <div className="document-view-description">
                    File {viewingDocument} Description...
                  </div>
                  <div className="document-view-footer">
                    <button>Download</button>
                    <button>Copy</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
