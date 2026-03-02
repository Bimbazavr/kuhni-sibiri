// Утилиты для хранения изображений в IndexedDB и сжатия через canvas

const DB_NAME = 'kuhni-images-db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let dbInstance: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

// Кэш Object URL чтобы не создавать дубли
const urlCache = new Map<string, string>();

export async function saveImageBlob(key: string, blob: Blob): Promise<void> {
  // Инвалидируем кэш для этого ключа
  const old = urlCache.get(key);
  if (old) {
    URL.revokeObjectURL(old);
    urlCache.delete(key);
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(blob, key);
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
  });
}

export async function getImageUrl(key: string): Promise<string | null> {
  if (urlCache.has(key)) return urlCache.get(key)!;

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        if (req.result instanceof Blob) {
          const url = URL.createObjectURL(req.result);
          urlCache.set(key, url);
          resolve(url);
        } else {
          resolve(null);
        }
      };
    });
  } catch {
    return null;
  }
}

export async function deleteImageByKey(key: string): Promise<void> {
  const old = urlCache.get(key);
  if (old) {
    URL.revokeObjectURL(old);
    urlCache.delete(key);
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => resolve();
  });
}

export async function hasImage(key: string): Promise<boolean> {
  if (urlCache.has(key)) return true;
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.count(key);
      req.onsuccess = () => resolve(req.result > 0);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
}

export async function compressImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality = 0.85,
  outputFormat: 'jpeg' | 'png' = 'jpeg'
): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Вычисляем новые размеры с сохранением пропорций
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas недоступен'));
        return;
      }

      if (outputFormat === 'jpeg') {
        // Белый фон нужен только для JPEG (нет поддержки прозрачности)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, width, height });
          } else {
            reject(new Error('Не удалось сжать изображение'));
          }
        },
        outputFormat === 'png' ? 'image/png' : 'image/jpeg',
        outputFormat === 'png' ? undefined : quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Не удалось загрузить изображение'));
    };

    img.src = objectUrl;
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
