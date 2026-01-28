import { BackgroundOption } from '@/lib/backgrounds';

/**
 * Parses the base64 tokenURI and extracts metadata and image.
 */
export const parseTokenURI = (tokenUri: string) => {
  try {
    const jsonPart = tokenUri.split('data:application/json;base64,')[1];
    const metadata = JSON.parse(atob(jsonPart));
    const imageBase64 = metadata.image.split('data:image/svg+xml;base64,')[1];
    const svgString = atob(imageBase64);
    return { metadata, svgString };
  } catch (e) {
    console.error("Error parsing Token URI", e);
    return { metadata: null, svgString: '' };
  }
};

/**
 * Generates a new SVG string by swapping the background.
 * Assumes the standard RetroPunks SVG structure where the first group/rect is the background.
 */
export const generatePreviewSVG = (originalSvg: string, newBg: BackgroundOption): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalSvg, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) return originalSvg;

  // Strategy: Remove existing background element (usually the first child or id='background')
  // and prepend the new background element.
  
  // 1. Find and remove old background (Assuming it's the first rect or g)
  const firstChild = svg.firstElementChild;
  if (firstChild) {
      // In many on-chain SVGs, the background is a rect at 0,0 with width/height 100%
      // We will blindly remove the first element if it looks like a background, 
      // or we just prepend the new one on top (bottom layer) if we want to be safe,
      // but removing is cleaner for transparency.
      svg.removeChild(firstChild);
  }

  // 2. Create new background element
  let newElement: SVGElement | null = null;

  if (newBg.type === 'solid') {
    newElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newElement.setAttribute("width", "100%");
    newElement.setAttribute("height", "100%");
    newElement.setAttribute("fill", newBg.value);
  } else if (newBg.type === 'linear') {
    // simplified linear gradient creation
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    const gradId = `bg-grad-${newBg.id}-${Date.now()}`;
    gradient.setAttribute("id", gradId);
    
    // Parse colors
    const colors = newBg.value.split(',').map(c => c.trim());
    colors.forEach((c, i) => {
        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop.setAttribute("offset", `${(i / (colors.length - 1)) * 100}%`);
        stop.setAttribute("stop-color", c);
        gradient.appendChild(stop);
    });
    
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);

    newElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newElement.setAttribute("width", "100%");
    newElement.setAttribute("height", "100%");
    newElement.setAttribute("fill", `url(#${gradId})`);
  }
  // ... (Implement radial logic similarly if needed)

  if (newElement) {
    svg.insertBefore(newElement, svg.firstChild); // Insert as first child (bottom layer)
  }

  return new XMLSerializer().serializeToString(doc);
};

/**
 * Downloads the SVG as a PNG at specified resolution.
 */
export const downloadPunkAsPng = async (
  svgString: string, 
  resolution: number, 
  fileName: string,
  transparent: boolean = false
) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    
    // If transparent requested, we must remove the background layer from the SVG string
    let finalSvg = svgString;
    if (transparent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (svg && svg.firstElementChild) {
            svg.removeChild(svg.firstElementChild); // Remove bg
        }
        finalSvg = new XMLSerializer().serializeToString(doc);
    }

    const svg64 = btoa(finalSvg);
    const b64Start = `data:image/svg+xml;base64,${svg64}`;
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = resolution;
      canvas.height = resolution;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        // Disable smoothing for pixel art look if desired, or enable for smooth gradients
        ctx.imageSmoothingEnabled = false; 
        ctx.drawImage(img, 0, 0, resolution, resolution);
        
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${fileName}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        resolve();
      } else {
        reject(new Error("Canvas context failed"));
      }
    };
    
    img.src = b64Start;
  });
};