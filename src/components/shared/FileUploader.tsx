'use client';

import React, { useState, useRef } from 'react';
import { Cloud, Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  label?: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in MB
  onUploadComplete?: (url: string) => void;
  className?: string;
}

const FileUploader = ({
  label = "Upload Document",
  description = "Aadhar card or Profile Picture (Max 5MB)",
  accept = "image/*,.pdf",
  maxSize = 5,
  onUploadComplete,
  className
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setErrorMessage(`File is too large. Max size is ${maxSize}MB.`);
      setStatus('error');
      return;
    }

    setFile(selectedFile);
    setStatus('idle');
    setErrorMessage(null);

    // Create preview if image
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus('uploading');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        if (onUploadComplete) onUploadComplete(data.url);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && <label className="block text-sm font-semibold text-zinc-300 ml-1">{label}</label>}
      
      <div 
        className={cn(
          "relative group border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden",
          status === 'idle' && "border-zinc-800 bg-zinc-900/40 hover:border-primary/50 hover:bg-primary/5",
          status === 'uploading' && "border-primary/50 bg-primary/5 cursor-wait",
          status === 'success' && "border-emerald-500/50 bg-emerald-500/5",
          status === 'error' && "border-rose-500/50 bg-rose-500/5",
        )}
        onClick={() => status !== 'uploading' && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          className="hidden"
          disabled={isUploading}
        />

        {file ? (
          <div className="w-full space-y-4">
            {preview ? (
              <div className="relative w-24 h-24 mx-auto rounded-xl overflow-hidden border border-zinc-700 shadow-xl">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                {!isUploading && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(); }}
                    className="absolute top-1 right-1 p-1 bg-zinc-900/80 text-white rounded-full hover:bg-rose-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-zinc-800 rounded-2xl">
                <Cloud className="w-8 h-8 text-zinc-400" />
              </div>
            )}
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-white truncate max-w-[200px] mx-auto">{file.name}</p>
              <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {status === 'idle' && (
              <button 
                onClick={(e) => { e.stopPropagation(); uploadFile(); }}
                className="px-6 py-2 bg-white text-zinc-950 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 mx-auto"
              >
                <Upload className="w-4 h-4" /> Start Upload
              </button>
            )}

            {status === 'uploading' && (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-primary font-semibold animate-pulse">Uploading...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center gap-2 text-emerald-400">
                <CheckCircle className="w-6 h-6" />
                <p className="text-xs font-bold">Successfully Uploaded</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-7 h-7 text-zinc-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Click or drag to upload</p>
              <p className="text-xs text-zinc-500">{description}</p>
            </div>
          </>
        )}

        {status === 'error' && errorMessage && (
          <div className="mt-4 flex items-center gap-2 text-rose-400 bg-rose-400/10 px-3 py-2 rounded-lg text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
