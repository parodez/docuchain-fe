import React, { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { io } from "socket.io-client";
import "../css/Documents.css";

function Documents() {
  const documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18];
  const [viewingDocument, setViewingDocument] = useState(null);

  // QR / Upload States
  const [showQR, setShowQR] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  // Create a unique session per page load
  const sessionId = useMemo(() => {
    // crypto.randomUUID() supported in modern browsers
    return (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now());
  }, []);

  // 🔥 CHANGE THIS to your PC LAN IP
  // Example: "http://192.168.1.10:5000"
  const serverBase = "http://192.168.1.17:5000";

  // URL that phone opens after scanning QR
  const qrUrl = `${serverBase}/mobile.html?sessionId=${sessionId}`;

  const exitView = () => setViewingDocument(null);

  // Connect socket once and listen for uploaded images
  useEffect(() => {
    const socket = io(serverBase, { transports: ["websocket"] });

    socket.on("connect", () => {
      socket.emit("join", sessionId);
    });

    socket.on("image_uploaded", ({ fileUrl }) => {
      setUploadedUrl(`${serverBase}${fileUrl}`);
      setStatusMsg("✅ Image received from phone!");
      setShowQR(false);
    });

    socket.on("connect_error", () => {
      setStatusMsg("⚠️ Cannot connect to server. Check LAN IP and server running.");
    });

    return () => socket.disconnect();
  }, [serverBase, sessionId]);

  const openQR = () => {
    setStatusMsg("");
    setUploadedUrl(null); // optional: clear previous upload
    setShowQR(true);
  };

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

            <div className="doc-upload">
              <button className="Qr-btn" type="button" onClick={openQR}>
                Upload File
              </button>
            </div>

            {statusMsg && <div className="upload-status">{statusMsg}</div>}

            {uploadedUrl && (
              <div className="upload-preview">
                <p className="upload-title">Uploaded Image Preview</p>
                <img src={uploadedUrl} alt="Uploaded from phone" />
              </div>
            )}
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

        {/* QR MODAL */}
        {showQR && (
          <div className="qr-modal" onClick={() => setShowQR(false)}>
            <div className="qr-card" onClick={(e) => e.stopPropagation()}>
              <h3 className="qr-title">Scan to Upload</h3>
              <p className="qr-sub">
                Scan using your phone camera, then take/upload a photo.
              </p>

              <div className="qr-code-wrap">
                <QRCodeCanvas value={qrUrl} size={220} />
              </div>

              <p className="qr-url">{qrUrl}</p>

              <button className="qr-close" onClick={() => setShowQR(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;
