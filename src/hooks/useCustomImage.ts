import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/imageStorage';

/**
 * Хук для загрузки кастомного изображения из IndexedDB.
 * Если кастомного нет — используется fallback путь из public/.
 */
export function useCustomImage(key: string, fallback: string): string {
  const [src, setSrc] = useState<string>(fallback);

  useEffect(() => {
    let cancelled = false;

    getImageUrl(key)
      .then((url) => {
        if (!cancelled && url) {
          setSrc(url);
        }
      })
      .catch(() => {
        // при ошибке остаётся fallback
      });

    return () => {
      cancelled = true;
    };
  }, [key, fallback]);

  return src;
}

/**
 * Обновляет отображаемое изображение в уже смонтированном компоненте.
 * Используется в связке с ImageUploader в секциях.
 */
export function useCustomImageWithSetter(
  key: string,
  fallback: string
): [string, (url: string | null) => void] {
  const [src, setSrc] = useState<string>(fallback);

  useEffect(() => {
    let cancelled = false;

    getImageUrl(key)
      .then((url) => {
        if (!cancelled && url) setSrc(url);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [key, fallback]);

  const update = (url: string | null) => {
    setSrc(url ?? fallback);
  };

  return [src, update];
}
