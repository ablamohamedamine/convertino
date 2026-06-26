"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { toast } from 'react-toastify';

/* eslint-disable @next/next/no-img-element */

interface PreviewFile {
  file: File;
  preview: string;
}

interface ConvertedFile {
  name: string;
  blob: Blob;
  url: string;
  originalSize: number;
  compressedSize: number;
}

interface ImageConverterProps {
  fixedInputFormat?: string;   // e.g., 'png'
  fixedOutputFormat?: string;  // e.g., 'webp'
}

const formatMime: Record<string, string> = {
  webp: "image/webp",
  jpeg: "image/jpeg",
  png: "image/png",
  avif: "image/avif",
  svg: "image/svg+xml",
};

const formatOptions = [
  { 
    value: "webp", 
    label: "WebP (Best for web)", 
    color: "green", 
    description: "Modern format with excellent compression and quality",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    value: "jpeg", 
    label: "JPEG", 
    color: "blue", 
    description: "Widely supported, good for photographs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    value: "png", 
    label: "PNG", 
    color: "purple", 
    description: "Lossless format, perfect for graphics and transparency",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    value: "avif", 
    label: "AVIF", 
    color: "pink", 
    description: "Next-generation format with superior compression",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    value: "svg", 
    label: "SVG (no conversion, passthrough)", 
    color: "yellow", 
    description: "Vector format, no conversion applied",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
];

export default function ImageConverter({ fixedInputFormat, fixedOutputFormat }: ImageConverterProps = {}) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [outputFormat, setOutputFormat] = useState(fixedOutputFormat || "webp");
  const [compression, setCompression] = useState(80);
  const [converted, setConverted] = useState<ConvertedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Layout refs to handle automatic dynamic scrolling
  const formatSectionRef = useRef<HTMLDivElement>(null);
  const convertedSectionRef = useRef<HTMLDivElement>(null);

  // Keep output format synchronized if props update dynamically
  useEffect(() => {
    if (fixedOutputFormat) {
      setOutputFormat(fixedOutputFormat);
    }
  }, [fixedOutputFormat]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const mapped = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    
    setFiles((curr) => [...curr, ...mapped]);
    setConverted([]);
    setProgress([]);
    toast.success(`${acceptedFiles.length} image${acceptedFiles.length > 1 ? 's' : ''} uploaded successfully!`);

    // Automatically scroll to the "Select Output Format" section once upload finishes
    setTimeout(() => {
      formatSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fixedInputFormat && formatMime[fixedInputFormat]
      ? { [formatMime[fixedInputFormat]]: [] }
      : { "image/*": [] },
    multiple: true,
  });

  // Clean up previews on unmount
  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
  }, [files]);

  const handleFormatChange = (format: string) => {
    setOutputFormat(format);
    setConverted([]);
    setProgress([]);
    setIsDropdownOpen(false);
  };

  const handleCompressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompression(Number(e.target.value));
    setConverted([]);
    setProgress([]);
  };

  const clearAll = () => {
    setFiles([]);
    setConverted([]);
    setProgress([]);
    toast.info('Cleared all images');
  };

  const convertAll = async () => {
    setProcessing(true);
    setProgress(Array(files.length).fill(0));
    const results: ConvertedFile[] = [];
    let errorOccurred = false;

    for (let i = 0; i < files.length; i++) {
      const { file } = files[i];
      let convertedBlob: Blob | null = null;
      const outName = file.name.replace(/\.[^.]+$/, "." + outputFormat);
      const originalSize = file.size;
      let compressedSize = 0;

      try {
        if (outputFormat === "svg") {
          convertedBlob = file;
        } else {
          const options = {
            maxSizeMB: 5,
            maxWidthOrHeight: 4096,
            initialQuality: compression / 100,
            fileType: formatMime[outputFormat],
            useWebWorker: true,
            onProgress: (p: number) => {
              setProgress((curr) => {
                const next = [...curr];
                next[i] = p;
                return next;
              });
            },
          };
          convertedBlob = await imageCompression(file, options);
        }

        if (!convertedBlob) throw new Error("Conversion failed");
        compressedSize = convertedBlob.size;
        results.push({
          name: outName,
          blob: convertedBlob,
          url: URL.createObjectURL(convertedBlob),
          originalSize,
          compressedSize,
        });
      } catch {
        errorOccurred = true;
        results.push({
          name: outName,
          blob: file,
          url: URL.createObjectURL(file),
          originalSize,
          compressedSize: originalSize,
        });
      }
    }

    setConverted(results);
    setProgress(Array(files.length).fill(100));
    setProcessing(false);

    if (errorOccurred) {
      toast.error('Some images failed to convert.');
    } else {
      toast.success('All images converted successfully!');
      
      // Automatically scroll to the "Converted Images" section when complete
      setTimeout(() => {
        convertedSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    converted.forEach((f) => {
      zip.file(f.name, f.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-images.zip";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success('ZIP downloaded!');
  };

  const selectedFormat = formatOptions.find(option => option.value === outputFormat);

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* Upload Section */}
      <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 hover:border-zinc-600 transition-all duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div { ...getRootProps() } className={`relative cursor-pointer transition-all duration-300 ${isDragActive ? 'scale-105' : 'hover:scale-[1.02]'}`}>
          <input { ...getInputProps() } />
          
          <div className="text-center">
            <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              {uploading ? (
                <div className="w-10 h-10 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              {uploading ? 'Uploading...' : isDragActive ? 'Drop images here' : 'Upload Images'}
            </h3>
            <p className="text-gray-400 mb-4">
              {uploading ? 'Processing your images...' : `Drag & drop ${fixedInputFormat ? fixedInputFormat.toUpperCase() : 'images'} here, or click to browse`}
            </p>
            
            {uploading && (
              <div className="mb-4 max-w-xs mx-auto">
                <div className="w-full h-3 bg-zinc-700 rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-bold px-1">
                    {uploadProgress}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Uploading {uploadProgress}% complete</p>
              </div>
            )}
            
            <button 
              className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </button>
          </div>
        </div>
      </section>

      {/* Image Previews Section */}
      {files.length > 0 && (
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-200">Uploaded Images ({files.length})</h3>
            <button 
              onClick={clearAll} 
              className="text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:cursor-pointer" 
              aria-label="Clear all images"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-3 hover:border-zinc-600 transition-all duration-300 transform hover:scale-105"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 rounded-full p-1 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label={`Remove image ${f.file.name}`}
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== idx));
                    setProgress(progress.filter((_, i) => i !== idx));
                    toast.info('Image removed');
                  }}
                  tabIndex={0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <img
                  src={f.preview}
                  alt={f.file.name}
                  className="w-full h-20 object-cover rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  tabIndex={0}
                />
                
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-300 truncate block" title={f.file.name}>
                    {f.file.name}
                  </span>
                  <span className="text-[10px] text-gray-400">{(f.file.size/1024).toFixed(1)} KB</span>
                </div>
                
                {progress[idx] === 100 ? (
                  <div className="w-full flex justify-center items-center mt-2">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                ) : (processing || progress[idx] > 0) ? (
                  <div className="w-full h-3 bg-zinc-700 rounded-full mt-2 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress[idx] || 0}%` }}
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-bold px-1">
                      {progress[idx] ? `${Math.round(progress[idx])}%` : '0%'}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Format Selection (with assigned scroll ref) */}
      <div ref={formatSectionRef} className="scroll-mt-24">
        {!fixedOutputFormat && (
          <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300 overflow-visible z-20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Select Output Format
              </h2>
              
              <div className="relative overflow-visible">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={processing}
                  className="w-full px-4 py-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-zinc-500 flex items-center justify-between cursor-pointer"
                  aria-label="Select output format"
                >
                  <div className="flex items-center gap-3">
                    {selectedFormat?.icon}
                    <span>{selectedFormat?.label}</span>
                  </div>
                  <div className={`w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`absolute top-full left-0 right-0 mt-2 bg-zinc-800/95 backdrop-blur-sm border border-zinc-600 rounded-lg shadow-2xl overflow-hidden z-[999999] transition-all duration-300 ease-out ${
                  isDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                  {formatOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleFormatChange(option.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 flex items-center gap-3 group hover:cursor-pointer ${
                        outputFormat === option.value ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : ''
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                        opacity: isDropdownOpen ? 1 : 0,
                        transition: `all 0.3s ease ${index * 50}ms`
                      }}
                    >
                      {option.icon}
                      <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{option.label}</span>
                      {outputFormat === option.value && (
                        <svg className="w-4 h-4 text-purple-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <div className="text-sm text-gray-300">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${selectedFormat?.color || 'purple'}-400 animate-pulse`}></span>
                    <strong>{selectedFormat?.value.toUpperCase()}:</strong> {selectedFormat?.description}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Compression Slider */}
      <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Compression Level
            </h2>
            <span className="px-3 py-1 bg-zinc-800 rounded-lg text-blue-400 font-mono font-bold border border-zinc-600">
              {compression}%
            </span>
          </div>
          
          <div className="relative pt-6 pb-2">
            <input
              type="range"
              min="10"
              max="100"
              value={compression}
              onChange={handleCompressionChange}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
              <span>High Compression (Small Size)</span>
              <span>Best Quality (Large Size)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Convert Button */}
      <section className="flex justify-center">
        <button
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
          onClick={convertAll}
          disabled={files.length === 0 || processing}
          aria-label="Convert all images"
        >
          <span className="relative z-10 flex items-center gap-2">
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Converting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Convert All Images
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </section>

      {/* Converted Images Preview (with assigned scroll ref container) */}
      <div ref={convertedSectionRef} className="scroll-mt-24">
        {converted.length > 0 && (
          <section className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Converted Images
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {converted.map((f, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-3 hover:border-zinc-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <button
                      className="absolute top-2 right-2 bg-green-500/20 hover:bg-green-500/30 rounded-full p-1 text-green-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      aria-label={`Download image ${f.name}`}
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = f.url;
                        a.download = f.name;
                        a.click();
                        toast.success('Image downloaded!');
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </button>

                    <img
                      src={f.url}
                      alt={f.name}
                      className="w-full h-20 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      title="Click to download"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = f.url;
                        a.download = f.name;
                        a.click();
                        toast.success('Image downloaded!');
                      }}
                      tabIndex={0}
                      aria-label={`Download image ${f.name}`}
                    />
                    
                    <div className="mt-2 text-center">
                      <span className="text-xs text-gray-300 truncate block" title={f.name}>
                        {f.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {((f.compressedSize || 0) / 1024).toFixed(1)} KB
                        {f.compressedSize && f.originalSize ? (
                          <>
                            {" "}
                            <span className="text-green-400 font-bold">
                              ({Math.round(100 - (f.compressedSize / f.originalSize) * 100)}% smaller)
                            </span>
                          </>
                        ) : null}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Ko-fi Support Section */}
      {converted.length > 0 && (
        <section className="flex justify-center mt-4">
          <a
            href="https://ko-fi.com/ablamohamedamine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#ff38b8] text-white font-semibold rounded-lg shadow-md hover:bg-[#e030a2] transition-all duration-300 hover:scale-105 text-sm hover:cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.723.676-.723.676s-.115 5.537.188 10.378c.371 5.922 4.195 7.684 4.195 7.684s5.807.828 10.222-.162c4.32-.97 5.76-4.564 5.76-4.564s3.111.134 4.183-3.23c1.026-3.216-.467-6.183-.467-6.183zm-4.14 5.626s-.347 1.956-2.316 2.502c-1.848.514-4.707.391-7.143.16-2.583-.245-4.22-.962-4.48-3.791-.321-3.5-.16-7.46-.16-7.46h13.784s.22 3.856.315 8.589zm3.036-1.55c-.492.81-1.42 2.292-.423 3.115.983 0 2.227.173 2.825 1.152.613-1.022-.115-4.267-2.402-4.267z" />
            </svg>
            Support us on Ko-fi
          </a>
        </section>
      )}

      {/* Global ZIP Download Section */}
      {converted.length > 0 && (
        <section className="flex justify-center">
          <button
            className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
            onClick={downloadZip}
            disabled={converted.length === 0}
            aria-label="Download all as ZIP"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download ZIP
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </section>
      )}
    </div>
  );
}