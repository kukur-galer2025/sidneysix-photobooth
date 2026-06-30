import React, { useState, useRef, useEffect } from 'react';
import { frames, elements, filters } from './utils/assets';
import { Camera, Download, RefreshCcw, Trash2, Upload, Palette } from 'lucide-react';
import './index.css';

var MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB

function App() {
  var _selectedFrame = useState(frames[0]);
  var selectedFrame = _selectedFrame[0], setSelectedFrame = _selectedFrame[1];

  var _activeElements = useState([]);
  var activeElements = _activeElements[0], setActiveElements = _activeElements[1];

  // Each shot: { dataUrl: string, filterId: string } or null
  var _capturedShots = useState([null, null, null, null]);
  var capturedShots = _capturedShots[0], setCapturedShots = _capturedShots[1];

  // Per-slot filter editing: index of slot being edited, or null
  var _editingSlotFilter = useState(null);
  var editingSlotFilter = _editingSlotFilter[0], setEditingSlotFilter = _editingSlotFilter[1];

  var _isCapturing = useState(false);
  var isCapturing = _isCapturing[0], setIsCapturing = _isCapturing[1];

  var _countdown = useState(null);
  var countdown = _countdown[0], setCountdown = _countdown[1];

  var _flash = useState(false);
  var flash = _flash[0], setFlash = _flash[1];

  var _stream = useState(null);
  var stream = _stream[0], setStream = _stream[1];

  var _draggingIdx = useState(null);
  var draggingIdx = _draggingIdx[0], setDraggingIdx = _draggingIdx[1];

  var _selectedFilter = useState(filters[0]);
  var selectedFilter = _selectedFilter[0], setSelectedFilter = _selectedFilter[1];

  var _uploadError = useState(null);
  var uploadError = _uploadError[0], setUploadError = _uploadError[1];

  var videoRef = useRef(null);
  var canvasRef = useRef(null);
  var fileInputRef = useRef(null);

  var slotCount = selectedFrame.slots.length;
  var currentSlotIndex = capturedShots.findIndex(function(s) { return s === null; });
  var allFilled = currentSlotIndex === -1;

  // Helper: get filter object by id
  function getFilterById(filterId) {
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].id === filterId) return filters[i];
    }
    return filters[0];
  }

  // Reset shots when frame changes
  useEffect(function() {
    var newSlots = [];
    for (var i = 0; i < selectedFrame.slots.length; i++) {
      newSlots.push(null);
    }
    setCapturedShots(newSlots);
    setEditingSlotFilter(null);
  }, [selectedFrame]);

  // Camera init
  useEffect(function() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      .then(function(s) {
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(function(err) { console.error("Error accessing camera", err); });

    return function() {
      if (stream) stream.getTracks().forEach(function(t) { t.stop(); });
    };
  }, []);

  useEffect(function() {
    if (videoRef.current && stream && videoRef.current.srcObject !== stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  function sleep(ms) {
    return new Promise(function(r) { setTimeout(r, ms); });
  }

  // Camera capture — always saves RAW (unfiltered) photo
  // The live camera filter is just for preview; the per-slot filter defaults to the currently selected one
  function handleCaptureSingle() {
    if (isCapturing || currentSlotIndex === -1 || !videoRef.current) return;
    setIsCapturing(true);

    // Capture the current filter id at time of click
    var captureFilterId = selectedFilter.id;

    var doCapture = async function() {
      for (var c = 3; c > 0; c--) {
        setCountdown(c);
        await sleep(1000);
      }
      setCountdown(null);
      setFlash(true);

      var video = videoRef.current;
      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = video.videoWidth || 800;
      tempCanvas.height = video.videoHeight || 600;
      var ctx = tempCanvas.getContext('2d');

      // Save RAW (no filter applied to canvas)
      ctx.translate(tempCanvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      var dataUrl = tempCanvas.toDataURL('image/jpeg', 0.9);

      setCapturedShots(function(prev) {
        var newShots = prev.slice();
        newShots[currentSlotIndex] = { dataUrl: dataUrl, filterId: captureFilterId };
        return newShots;
      });

      setTimeout(function() { setFlash(false); }, 200);
      await sleep(200);
      setIsCapturing(false);
    };

    doCapture();
  }

  // Upload photo
  function handleUploadClick() {
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;

    e.target.value = '';

    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadError('Ukuran file melebihi 10MB. Silakan pilih file yang lebih kecil.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (JPG, PNG, dll).');
      return;
    }

    setUploadError(null);

    var reader = new FileReader();
    reader.onload = function(ev) {
      var dataUrl = ev.target.result;
      // Store raw, with current filter as default
      insertShot(dataUrl, selectedFilter.id);
    };
    reader.readAsDataURL(file);
  }

  function insertShot(dataUrl, filterId) {
    setCapturedShots(function(prev) {
      var idx = prev.findIndex(function(s) { return s === null; });
      if (idx === -1) return prev;
      var newShots = prev.slice();
      newShots[idx] = { dataUrl: dataUrl, filterId: filterId };
      return newShots;
    });
  }

  function handleRetake(index) {
    setCapturedShots(function(prev) {
      var newShots = prev.slice();
      newShots[index] = null;
      return newShots;
    });
    if (editingSlotFilter === index) {
      setEditingSlotFilter(null);
    }
  }

  // Change filter for a specific slot
  function handleSlotFilterChange(slotIndex, newFilterId) {
    setCapturedShots(function(prev) {
      var newShots = prev.slice();
      if (newShots[slotIndex]) {
        newShots[slotIndex] = { dataUrl: newShots[slotIndex].dataUrl, filterId: newFilterId };
      }
      return newShots;
    });
  }

  // Toggle filter editor for a slot
  function toggleSlotFilterEdit(index) {
    if (editingSlotFilter === index) {
      setEditingSlotFilter(null);
    } else {
      setEditingSlotFilter(index);
    }
  }

  async function composeFinalImage() {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');

    canvas.width = selectedFrame.canvasWidth;
    canvas.height = selectedFrame.canvasHeight;

    function loadImage(src) {
      return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = reject;
        img.src = src;
      });
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < slotCount; i++) {
      var slot = selectedFrame.slots[i];
      var shotObj = capturedShots[i];
      if (slot && shotObj) {
        try {
          var shotImg = await loadImage(shotObj.dataUrl);

          // Apply per-slot filter via a temp canvas
          var slotFilter = getFilterById(shotObj.filterId);
          var filteredCanvas = document.createElement('canvas');
          filteredCanvas.width = shotImg.width;
          filteredCanvas.height = shotImg.height;
          var fCtx = filteredCanvas.getContext('2d');

          if (slotFilter.canvas !== 'none') {
            fCtx.filter = slotFilter.canvas;
          }
          fCtx.drawImage(shotImg, 0, 0);

          // Now draw filtered image into slot with cover-fit
          var sRatio = filteredCanvas.width / filteredCanvas.height;
          var dRatio = slot.w / slot.h;
          var sx = 0, sy = 0, sw = filteredCanvas.width, sh = filteredCanvas.height;

          if (sRatio > dRatio) {
            sw = filteredCanvas.height * dRatio;
            sx = (filteredCanvas.width - sw) / 2;
          } else {
            sh = filteredCanvas.width / dRatio;
            sy = (filteredCanvas.height - sh) / 2;
          }

          ctx.drawImage(filteredCanvas, sx, sy, sw, sh, slot.x, slot.y, slot.w, slot.h);
        } catch(e) { console.error("Failed to draw shot", i); }
      }
    }

    if (selectedFrame.src) {
      try {
        var frameImg = await loadImage(selectedFrame.src);
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      } catch(e) { console.error("Failed to load frame"); }
    }

    for (var j = 0; j < activeElements.length; j++) {
      var el = activeElements[j];
      try {
        var elImg = await loadImage(el.src);
        var x = (el.x / 100) * canvas.width;
        var y = (el.y / 100) * canvas.height;
        var size = 0.15 * canvas.width;
        ctx.drawImage(elImg, x - size/2, y - size/2, size, size);
      } catch(e) { console.error("Failed to draw element"); }
    }

    return canvas.toDataURL('image/png');
  }

  async function handleDownload() {
    var resultUrl = await composeFinalImage();
    var a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'sidney-six-photobooth.png';
    a.click();
  }

  function addElement(element) {
    setActiveElements(activeElements.concat([
      { id: element.id, name: element.name, src: element.src, x: 50, y: 50, uuid: Math.random().toString() }
    ]));
  }

  function removeElement(uuid) {
    setActiveElements(activeElements.filter(function(e) { return e.uuid !== uuid; }));
  }

  function handleMouseMove(e) {
    if (draggingIdx === null) return;
    var container = e.currentTarget.getBoundingClientRect();
    var x = ((e.clientX - container.left) / container.width) * 100;
    var y = ((e.clientY - container.top) / container.height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    var updated = activeElements.slice();
    updated[draggingIdx] = Object.assign({}, updated[draggingIdx], { x: x, y: y });
    setActiveElements(updated);
  }

  function handleMouseUp() { setDraggingIdx(null); }

  function getSlotStyle(idx) {
    var slot = selectedFrame.slots[idx];
    if (!slot) return {};
    return {
      left: ((slot.x / selectedFrame.canvasWidth) * 100) + '%',
      top: ((slot.y / selectedFrame.canvasHeight) * 100) + '%',
      width: ((slot.w / selectedFrame.canvasWidth) * 100) + '%',
      height: ((slot.h / selectedFrame.canvasHeight) * 100) + '%',
    };
  }

  function handleResetAll() {
    var newSlots = [];
    for (var i = 0; i < slotCount; i++) {
      newSlots.push(null);
    }
    setCapturedShots(newSlots);
    setEditingSlotFilter(null);
  }

  var cameraFilterStyle = selectedFilter.css !== 'none'
    ? { filter: selectedFilter.css }
    : {};

  var previewMaxWidth = 'calc(60vh * ' + (selectedFrame.canvasWidth / selectedFrame.canvasHeight) + ')';
  var previewAspectRatio = selectedFrame.canvasWidth + ' / ' + selectedFrame.canvasHeight;

  var captureLabel = isCapturing
    ? 'Menyiapkan...'
    : 'Jepret Kotak ' + (currentSlotIndex + 1) + ' / ' + slotCount;

  return (
    <div className="app-container">
      <header>
        <h1>Sidney Six Studio</h1>
        <p className="subtitle">Interactive photobooth experience. Capture your best angles.</p>
      </header>

      <main className="main-content">

        {/* Kolom 1: Kamera + Filter + Upload */}
        <div className="camera-section">
          <h2 className="section-title">📷 Kamera</h2>
          <div className="big-camera-container">
            <video
              ref={videoRef}
              autoPlay muted playsInline
              style={cameraFilterStyle}
            ></video>
            {countdown !== null && (
              <div className="countdown-overlay">
                <span className="countdown-number">{countdown}</span>
              </div>
            )}
            {flash && <div className="flash-overlay flash-animation"></div>}
          </div>

          {/* Capture + Upload buttons */}
          <div className="controls-panel">
            {!allFilled ? (
              <div className="controls-buttons">
                <button
                  className="btn-primary capture-action"
                  onClick={handleCaptureSingle}
                  disabled={isCapturing}
                >
                  <Camera size={20} /> {captureLabel}
                </button>
                <button
                  className="btn-upload"
                  onClick={handleUploadClick}
                  disabled={isCapturing}
                  title="Upload foto dari perangkat (maks 10MB)"
                >
                  <Upload size={18} /> Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="success-msg">
                {'Sesi pemotretan selesai! 🎉'}
              </div>
            )}
          </div>

          {/* Upload error message */}
          {uploadError && (
            <div className="upload-error">
              ⚠️ {uploadError}
            </div>
          )}

          {/* Filter Strip - for live camera */}
          <div className="filter-section">
            <h3 className="filter-title">🎨 Filter Kamera (Live)</h3>
            <div className="filter-strip">
              {filters.map(function(f) {
                var isSelected = selectedFilter.id === f.id;
                var itemClass = 'filter-item' + (isSelected ? ' filter-selected' : '');
                return (
                  <div
                    key={f.id}
                    className={itemClass}
                    onClick={function() { setSelectedFilter(f); }}
                  >
                    <div
                      className="filter-preview-circle"
                      style={f.css !== 'none' ? { filter: f.css } : {}}
                    ></div>
                    <span className="filter-label">{f.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom 2: Bingkai Hasil */}
        <div className="result-section">
          <h2 className="section-title">🎞️ Pratinjau</h2>
          <p className="slot-filter-hint">Klik 🎨 pada foto untuk mengubah filter per kotak</p>
          <div className="preview-wrapper">
            <div
              className="preview-container"
              style={{
                width: '100%',
                maxWidth: previewMaxWidth,
                aspectRatio: previewAspectRatio
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img src={selectedFrame.src} className="frame-overlay" alt="frame" />

              {selectedFrame.slots.map(function(slot, i) {
                var shotObj = capturedShots[i];
                var isActive = currentSlotIndex === i;
                var slotClass = 'slot ' + (shotObj ? 'filled-slot' : 'empty-slot');

                // Get per-slot CSS filter
                var slotCssFilter = {};
                if (shotObj) {
                  var slotFilterObj = getFilterById(shotObj.filterId);
                  if (slotFilterObj.css !== 'none') {
                    slotCssFilter = { filter: slotFilterObj.css };
                  }
                }

                return (
                  <div key={i} className={slotClass} style={Object.assign({}, getSlotStyle(i), { zIndex: 5 })}>
                    {shotObj && (
                      <>
                        <img src={shotObj.dataUrl} alt={'Shot ' + i} style={slotCssFilter} />
                        <div className="slot-actions">
                          <button
                            className="slot-filter-btn"
                            onClick={function() { toggleSlotFilterEdit(i); }}
                            title="Ubah filter kotak ini"
                          >
                            <Palette size={14} />
                          </button>
                          <button className="retake-btn" onClick={function() { handleRetake(i); }} title="Hapus">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                    {!shotObj && isActive && (
                      <div className="active-slot-indicator">Membidik...</div>
                    )}
                  </div>
                );
              })}

              {/* Draggable Elements */}
              <div className="draggables-container" style={{zIndex: 20}}>
                {activeElements.map(function(el, idx) {
                  var dragClass = 'draggable-item' + (draggingIdx === idx ? ' active-drag' : '');
                  return (
                    <div
                      key={el.uuid}
                      className={dragClass}
                      style={{ left: el.x + '%', top: el.y + '%', width: '15%', height: 'auto', aspectRatio: '1/1' }}
                      onMouseDown={function(e) { e.preventDefault(); setDraggingIdx(idx); }}
                    >
                      <button
                        className="remove-btn"
                        onMouseDown={function(e) { e.stopPropagation(); removeElement(el.uuid); }}
                      >
                        &times;
                      </button>
                      <img src={el.src} alt={el.name} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Per-slot filter picker (shown below preview when editing) */}
          {editingSlotFilter !== null && capturedShots[editingSlotFilter] && (
            <div className="slot-filter-picker">
              <div className="slot-filter-picker-header">
                <span>🎨 Filter untuk Kotak {editingSlotFilter + 1}</span>
                <button className="slot-filter-close" onClick={function() { setEditingSlotFilter(null); }}>&times;</button>
              </div>
              <div className="slot-filter-strip">
                {filters.map(function(f) {
                  var shotObj = capturedShots[editingSlotFilter];
                  var isSelected = shotObj && shotObj.filterId === f.id;
                  var itemClass = 'slot-filter-chip' + (isSelected ? ' slot-filter-chip-active' : '');
                  var slotIdx = editingSlotFilter;
                  return (
                    <div
                      key={f.id}
                      className={itemClass}
                      onClick={function() { handleSlotFilterChange(slotIdx, f.id); }}
                    >
                      <div
                        className="slot-filter-preview"
                        style={f.css !== 'none' ? { filter: f.css } : {}}
                      ></div>
                      <span className="slot-filter-chip-label">{f.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons for Result */}
          {allFilled && (
            <div className="actions" style={{ marginTop: '20px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={handleResetAll}>
                <RefreshCcw size={20} /> Ulangi
              </button>
              <button className="btn-primary" onClick={handleDownload}>
                <Download size={20} /> Unduh
              </button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="capture-canvas"></canvas>

        {/* Kolom 3: Sidebar */}
        <div className="sidebar">
          <div>
            <h2 className="section-title">🖼️ Layout Bingkai</h2>
            <div className="frame-list">
              {frames.map(function(frame) {
                var frameClass = 'frame-item' + (selectedFrame.id === frame.id ? ' selected' : '');
                return (
                  <div
                    key={frame.id}
                    className={frameClass}
                    onClick={function() { setSelectedFrame(frame); }}
                  >
                    <img src={frame.src} className="frame-thumbnail" alt={frame.name} />
                    <span style={{marginTop: '0.8rem', fontSize: '0.85rem', fontWeight: '500', textAlign: 'center'}}>{frame.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{marginTop: '2rem'}}>
            <h2 className="section-title">✨ Aksesoris Mewah</h2>
            <p style={{fontSize:'0.85rem', color:'#888', marginBottom:'15px'}}>Seret (drag) aksesoris ke atas Pratinjau Bingkai.</p>
            <div className="element-list">
              {elements.map(function(el) {
                return (
                  <div
                    key={el.id}
                    className="element-item"
                    onClick={function() { addElement(el); }}
                    title="Klik untuk menambahkan"
                  >
                    <img src={el.src} className="element-thumbnail" alt={el.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
