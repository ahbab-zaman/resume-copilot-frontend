"use client";

import { useId, useState } from "react";

type UploadDropzoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  title?: string;
  description?: string;
};

export function UploadDropzone({
  file,
  onFileChange,
  title = "Click to upload or drag and drop",
  description = "PDF only, up to 5MB",
}: UploadDropzoneProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={`rounded-md border-2 border-dashed p-6 text-center transition ${
        isDragging
          ? "border-accent bg-surface-secondary"
          : "border-border-strong bg-surface"
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        onFileChange(event.dataTransfer.files?.[0] ?? null);
      }}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-secondary text-[18px] text-text-primary">
        ^
      </div>
      <p className="mt-4 text-[14px] font-medium leading-5 text-text-primary">
        {file ? file.name : title}
      </p>
      <p className="mt-2 text-[12px] leading-4 text-text-muted">{description}</p>
      <label
        htmlFor={inputId}
        className="mt-4 inline-flex h-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-surface px-3 text-[14px] font-medium leading-5 text-text-primary transition hover:bg-surface-secondary"
      >
        Choose file
      </label>
      <input
        id={inputId}
        className="sr-only"
        type="file"
        accept="application/pdf"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
    </div>
  );
}
