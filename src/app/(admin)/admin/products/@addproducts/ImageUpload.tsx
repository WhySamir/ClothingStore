import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

export function ImageUpload({
  files,
  onChange,
  error,
  setError,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let updatedFiles = [...files];

      for (const file of acceptedFiles) {
        // Duplicate check
        if (updatedFiles.some((f) => f.name === file.name)) {
          setError(`File "${file.name}" is already selected`);
          continue;
        }

        // File size check (10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError(`File "${file.name}" exceeds 10MB`);
          continue;
        }

        updatedFiles.push(file);
      }

      // Max files check
      if (updatedFiles.length > 4) {
        setError("You can upload up to 4 images");
        updatedFiles = updatedFiles.slice(0, 4);
      }

      onChange(updatedFiles);
    },
    [files, onChange, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const removeFile = (name: string) => {
    const updated = files.filter((f) => f.name !== name);
    onChange(updated);
    setError(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Upload Image</label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${
          isDragActive ? "bg-gray-100" : "bg-[#2b2d31]"
        }`}
      >
        <input {...getInputProps()} />
        <ImagePlus size={48} className="text-gray-400 mb-2" />
        <span className="text-xs text-gray-500">Upload Hero Image</span>
        <p className="text-xs text-gray-600 mt-1">Max 4 files, 10MB each</p>
      </div>

      {/* Preview */}
      <div className="mt-3 flex gap-3 flex-wrap">
        {files.map((file) => (
          <div key={file.name} className="relative group w-[100px] h-[100px]">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              fill
              className="object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeFile(file.name)}
              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
