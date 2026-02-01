import React, { useState } from "react";
import "../css/Documents.css";

function Documents() {
  const documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18];
  const [viewingDocument, setViewingDocument] = useState(null);

  const exitView = () => setViewingDocument(null);

  return (
    <div className="documents">
      <div className="documents-content">
        {!viewingDocument && (
          <>
            <div className="documents-toolbar">
              <button className="doc-close" type="button">
                ×
              </button>

              <div className="doc-form-pill">Form - 137</div>

              <div className="doc-search">
                <input type="text" placeholder="Name / LRN" />
              </div>

              <button className="doc-search-btn" type="button">
                Search
              </button>
            </div>

            <div className="documents-body">
              {documents.map((x) => (
                <div
                  key={x}
                  className="document"
                  onClick={() => setViewingDocument(x)}
                >
                  <div className="document-icon" />
                  <div className="document-meta">
                    <p className="document-file-name">Name</p>
                    <p className="document-sub">1234567890</p>
                  </div>
                  <div className="document-view-button">&gt;</div>
                </div>
              ))}
            </div>
          </>
        )}

        {viewingDocument && (
          <>
            <div className="documents-toolbar view">
              <button className="doc-close" type="button" onClick={exitView}>
                ×
              </button>
              <div className="doc-form-bar">Form - 137</div>
            </div>

            <div className="doc-view-grid">
              <div className="doc-preview">
                <div className="doc-preview-icon" />
              </div>

              <div className="doc-info" />
            </div>

            <div className="doc-actions">
              <button type="button" className="doc-btn">
                Download
              </button>
              <button type="button" className="doc-btn">
                Authenticity Key
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Documents;
