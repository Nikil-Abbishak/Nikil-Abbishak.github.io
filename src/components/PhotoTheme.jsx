import { useEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const rgbToHsl = (r, g, b) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h *= 60;
  }

  return [h, s, l];
};

const hslToRgb = (h, s, l) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const toRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
const toRgba = ({ r, g, b }, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

export default function PhotoTheme({ src = './profile.png' }) {
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement('canvas');
      const size = 48;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, size, size);
      const { data } = ctx.getImageData(0, 0, size, size);

      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let count = 0;
      let bestAccent = { score: 0, r: 120, g: 120, b: 120, h: 0, s: 0, l: 0 };
      let bestWarm = { score: 0, r: 160, g: 120, b: 110, h: 20, s: 0, l: 0 };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 200) continue;

        const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        if (luma < 0.05 || luma > 0.95) continue;

        sumR += r;
        sumG += g;
        sumB += b;
        count += 1;

        const [h, s, l] = rgbToHsl(r, g, b);
        if (s > 0.22 && l > 0.15 && l < 0.85) {
          const score = s * (0.6 + l);
          if (score > bestAccent.score) {
            bestAccent = { score, r, g, b, h, s, l };
          }
        }

        if (h > 10 && h < 60 && s > 0.18 && l > 0.2 && l < 0.85) {
          const score = s * 1.1 + l * 0.6;
          if (score > bestWarm.score) {
            bestWarm = { score, r, g, b, h, s, l };
          }
        }
      }

      if (!count) return;

      const avg = {
        r: Math.round(sumR / count),
        g: Math.round(sumG / count),
        b: Math.round(sumB / count),
      };

      const [avgH, avgS] = rgbToHsl(avg.r, avg.g, avg.b);
      const baseHue = avgH;
      const baseSat = clamp(avgS * 0.35, 0.06, 0.16);
      const bgPrimary = `hsl(${baseHue.toFixed(0)}deg, ${(baseSat * 100).toFixed(0)}%, 5%)`;
      const bgElevated = `hsl(${baseHue.toFixed(0)}deg, ${(baseSat * 100).toFixed(0)}%, 8%)`;

      let accentH = bestAccent.h;
      let accentS = bestAccent.s;
      let accentL = bestAccent.l;

      if (!bestAccent.score) {
        const [fallbackH, fallbackS, fallbackL] = rgbToHsl(avg.r, avg.g, avg.b);
        accentH = fallbackH;
        accentS = clamp(fallbackS * 1.2 + 0.2, 0.35, 0.85);
        accentL = clamp(fallbackL * 0.9 + 0.15, 0.35, 0.72);
      } else {
        accentS = clamp(accentS * 1.25, 0.35, 0.85);
        accentL = clamp(accentL * 0.95 + 0.08, 0.35, 0.7);
      }

      const accentRgb = hslToRgb(accentH, accentS, accentL);
      const accent2Rgb = hslToRgb(accentH, accentS * 0.9, clamp(accentL + 0.12, 0.45, 0.82));

      const warmH = bestWarm.score ? bestWarm.h : (accentH + 25) % 360;
      const warmS = bestWarm.score ? clamp(bestWarm.s * 1.1, 0.3, 0.7) : 0.6;
      const warmL = bestWarm.score ? clamp(bestWarm.l * 0.95 + 0.12, 0.35, 0.7) : 0.62;
      const warmRgb = hslToRgb(warmH, warmS, warmL);
      const warm2Rgb = hslToRgb(warmH, warmS * 0.9, clamp(warmL + 0.12, 0.5, 0.82));

      const root = document.documentElement.style;
      root.setProperty('--bg-primary', bgPrimary);
      root.setProperty('--bg-elevated', bgElevated);

      root.setProperty('--accent', toRgb(accentRgb));
      root.setProperty('--accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
      root.setProperty('--accent-soft', toRgba(accentRgb, 0.18));
      root.setProperty('--accent-glow', toRgba(accentRgb, 0.35));
      root.setProperty('--accent-warm', toRgb(warmRgb));
      root.setProperty('--accent-warm-rgb', `${warmRgb.r}, ${warmRgb.g}, ${warmRgb.b}`);

      root.setProperty('--gradient-accent', `linear-gradient(135deg, ${toRgb(accentRgb)}, ${toRgb(accent2Rgb)})`);
      root.setProperty('--gradient-warm', `linear-gradient(135deg, ${toRgb(warmRgb)}, ${toRgb(warm2Rgb)})`);
      root.setProperty(
        '--gradient-aurora',
        `linear-gradient(120deg, ${toRgba(accentRgb, 0.25)}, ${toRgba(warmRgb, 0.18)}, rgba(255, 255, 255, 0))`
      );

      root.setProperty('--glow-1', `radial-gradient(1200px 600px at 80% -10%, ${toRgba(accentRgb, 0.12)}, transparent 60%)`);
      root.setProperty('--glow-2', `radial-gradient(900px 500px at -10% 20%, ${toRgba(warmRgb, 0.12)}, transparent 60%)`);
      root.setProperty('--orb-1', toRgba(accentRgb, 0.08));
      root.setProperty('--orb-2', toRgba(warmRgb, 0.07));
    };

    img.onerror = () => {
      if (cancelled) return;
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return null;
}
