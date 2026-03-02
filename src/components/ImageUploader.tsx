import { useState, useRef, useCallback } from 'react';
import { Upload, X, CheckCircle, Loader2, ImageIcon } from 'lucide-react';
import {
  compressImage,
  saveImageBlob,
  deleteImageByKey,
  formatFileSize,
} from '@/lib/imageStorage';

interface ImageUploaderProps {
  /** Ключ в IndexedDB, например 'hero-bg' */
  imageKey: string;
  /** Подпись поля */
  label: string;
  /** Текущий URL изображения (static или blob) */
  currentSrc: string;
  /** Максимальная ширина после сжатия */
  maxWidth: number;
  /** Максимальная высота после сжатия */
  maxHeight: number;
  /** Качество JPEG 0–1, по умолчанию 0.85 (игнорируется для PNG) */
  quality?: number;
  /** CSS aspect-ratio, например '16/9', '4/3', '3/4', '1/1' */
  aspectRatio?: string;
  /** Формат вывода: 'jpeg' (по умолчанию) или 'png' (сохраняет прозрачность) */
  outputFormat?: 'jpeg' | 'png';
  /** Вызывается при успешной загрузке (blob URL) или сбросе (null) */
  onUpdate: (url: string | null) => void;
}

export function ImageUploader({
  imageKey,
  label,
  currentSrc,
  maxWidth,
  maxHeight,
  quality = 0.85,
  aspectRatio = '4/3',
  outputFormat = 'jpeg',
  onUpdate,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [info, setInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    width: number;
    height: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Выберите файл изображения (JPG, PNG, WebP и др.)');
        return;
      }
      setError(null);
      setIsProcessing(true);
      try {
        const originalSize = file.size;
        const { blob, width, height } = await compressImage(
          file,
          maxWidth,
          maxHeight,
          quality,
          outputFormat
        );
        await saveImageBlob(imageKey, blob);
        const url = URL.createObjectURL(blob);
        setInfo({ originalSize, compressedSize: blob.size, width, height });
        onUpdate(url);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Ошибка при обработке файла'
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [imageKey, maxWidth, maxHeight, quality, outputFormat, onUpdate]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleReset = async () => {
    await deleteImageByKey(imageKey);
    setInfo(null);
    onUpdate(null);
  };

  const isCustom = currentSrc.startsWith('blob:');
  const reduction =
    info && info.compressedSize < info.originalSize
      ? Math.round((1 - info.compressedSize / info.originalSize) * 100)
      : 0;

  return (
    <div className="space-y-2">
      {/* Заголовок */}
      <div className="flex items-center justify-between min-h-[20px]">
        <span className="text-zinc-300 text-sm font-medium">{label}</span>
        {isCustom && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            <X className="w-3 h-3" />
            Сбросить
          </button>
        )}
      </div>

      {/* Зона превью / загрузки */}
      <div
        className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer select-none ${
          isDragging
            ? 'border-amber-400 bg-amber-400/10 scale-[1.01]'
            : 'border-zinc-700 hover:border-zinc-500'
        }`}
        style={{ aspectRatio }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        {/* Изображение фон */}
        {currentSrc ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSrc})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-zinc-600" />
          </div>
        )}

        {/* Оверлей */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${
            isProcessing
              ? 'bg-black/75 opacity-100'
              : isDragging
              ? 'bg-amber-900/50 opacity-100'
              : 'bg-black/50 opacity-0 hover:opacity-100'
          }`}
        >
          {isProcessing ? (
            <div className="text-center pointer-events-none">
              <Loader2 className="w-9 h-9 text-amber-400 animate-spin mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Сжимаем...</p>
              <p className="text-white/50 text-xs mt-1">
                макс {maxWidth}×{maxHeight}px
              </p>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <Upload className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm font-medium">
                {isDragging ? 'Отпустите файл' : 'Нажмите или перетащите'}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {outputFormat === 'png'
                  ? `PNG с прозрачностью, макс ${maxWidth}×${maxHeight}`
                  : `JPG, PNG, WebP → JPEG ${maxWidth}×${maxHeight}`}
              </p>
            </div>
          )}
        </div>

        {/* Бейдж "Загружено" */}
        {isCustom && !isProcessing && (
          <div className="absolute top-2 left-2 bg-amber-500 rounded-full px-2 py-0.5 pointer-events-none">
            <span className="text-black text-xs font-semibold">✓ Загружено</span>
          </div>
        )}
      </div>

      {/* Результат сжатия */}
      {info && (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-950/50 border border-green-500/20 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
          <div className="text-xs text-zinc-400 flex flex-wrap gap-x-3 gap-y-0.5">
            <span>
              {info.width}×{info.height}px
            </span>
            <span>
              {formatFileSize(info.originalSize)} → {formatFileSize(info.compressedSize)}
            </span>
            {reduction > 0 && (
              <span className="text-green-400 font-medium">-{reduction}%</span>
            )}
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && <p className="text-red-400 text-xs px-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
