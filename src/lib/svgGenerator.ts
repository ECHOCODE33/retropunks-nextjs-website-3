// SVG Background Generator Utility
import { BACKGROUNDS, BG_TYPES, getGradientCoords, normalizeColor, type BackgroundEntry } from "./backgroundData";

export function generateBackgroundSVG(entry: BackgroundEntry, index: number, viewBoxSize: number = 48): string {
	const layerType = entry.layerType;
	const paletteRaw = Array.isArray(entry.palette) ? entry.palette : [];
	const palette = paletteRaw.map(normalizeColor);

	// Image type (Rainbow)
	if (layerType === BG_TYPES.Image) {
		// For Rainbow, we'll use a special gradient
		return `<defs>
      <linearGradient id="bg-gradient-${index}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ff0000ff" />
        <stop offset="16.67%" stop-color="#ff7f00ff" />
        <stop offset="33.33%" stop-color="#ffff00ff" />
        <stop offset="50%" stop-color="#00ff00ff" />
        <stop offset="66.67%" stop-color="#0000ffff" />
        <stop offset="83.33%" stop-color="#4b0082ff" />
        <stop offset="100%" stop-color="#9400d3ff" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="url(#bg-gradient-${index})" />`;
	}

	// Solid color
	if (layerType === BG_TYPES.Solid) {
		const color = palette[0] || "#000000ff";
		return `<rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="${color}" />`;
	}

	// Radial gradient
	if (layerType === BG_TYPES.Radial) {
		const n = Math.max(1, palette.length);
		let stops = "";
		for (let i = 0; i < n; i++) {
			const pct = (i / (n - 1 || 1)) * 100;
			const color = palette[i] || palette[palette.length - 1] || "#000000ff";
			stops += `<stop offset="${pct}%" stop-color="${color}" />`;
		}

		return `<defs>
      <radialGradient id="bg-gradient-${index}" cx="50%" cy="50%" r="70%">
        ${stops}
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="url(#bg-gradient-${index})" />`;
	}

  // Linear gradients (smooth or pixelated)
  const coords = getGradientCoords(layerType);
  const isPixelated = [BG_TYPES.P_Vertical, BG_TYPES.P_Horizontal, BG_TYPES.P_Down, BG_TYPES.P_Up].includes(layerType as typeof BG_TYPES.P_Vertical);

	// Handle empty or single color palette
	if (!palette.length) {
		return `<rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="transparent" />`;
	}

	if (palette.length === 1) {
		return `<rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="${palette[0]}" />`;
	}

	const n = palette.length;
	let stops = "";

	if (isPixelated) {
		// Discrete bands for pixelated gradients
		for (let i = 0; i < n; i++) {
			const startPct = (i / n) * 100;
			const endPct = ((i + 1) / n) * 100;

			stops += `<stop offset="${startPct}%" stop-color="${palette[i]}" />`;
			stops += `<stop offset="${Math.max(0, endPct - 0.0001)}%" stop-color="${palette[i]}" />`;

			if (i < n - 1) {
				stops += `<stop offset="${endPct}%" stop-color="${palette[i + 1]}" />`;
			}
		}
	} else {
		// Smooth gradient
		for (let i = 0; i < n; i++) {
			const pct = (i / (n - 1 || 1)) * 100;
			stops += `<stop offset="${pct}%" stop-color="${palette[i]}" />`;
		}
	}

	return `<defs>
    <linearGradient id="bg-gradient-${index}" x1="${coords.x1}" y1="${coords.y1}" x2="${coords.x2}" y2="${coords.y2}">
      ${stops}
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${viewBoxSize}" height="${viewBoxSize}" fill="url(#bg-gradient-${index})" />`;
}

export function generateFullSVG(imageDataUrl: string, backgroundIndex: number, tokenId: string | number, viewBoxSize: number = 48): string {
	const entry = BACKGROUNDS[backgroundIndex] || BACKGROUNDS[0];
	const backgroundSVG = generateBackgroundSVG(entry, backgroundIndex, viewBoxSize);

	return `<!DOCTYPE html>
<html>
<style>
  body {
    overflow: hidden;
    margin: 0;
  }
  svg {
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
  }
</style>
<body onkeydown="handleKeyPress(event)" onclick="handleClick(event)">
  <div style="height: 100%" id="svg-content-8bit-eto">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">
      <style>
        img {
          width: 100%;
          height: 100%;
          image-rendering: optimizeSpeed;
          image-rendering: -moz-crisp-edges;
          image-rendering: -o-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          -ms-interpolation-mode: nearest-neighbor;
        }
      </style>
      <g id="Background">
        ${backgroundSVG}
      </g>
      <g id="GeneratedImage">
        <foreignObject width="${viewBoxSize}" height="${viewBoxSize}">
          <img xmlns="http://www.w3.org/1999/xhtml" src="${imageDataUrl}" width="100%" height="100%" />
        </foreignObject>
      </g>
    </svg>
  </div>
  <script>
    const BACKGROUNDS = ${JSON.stringify(BACKGROUNDS)};
    const BG_TYPES = ${JSON.stringify(BG_TYPES)};
    const viewBoxSize = ${viewBoxSize};
    
    const svgElement = document.getElementById('svg-content-8bit-eto').getElementsByTagName('svg')[0];
    const backgroundGroup = svgElement.getElementById('Background');
    
    let currentIndex = ${backgroundIndex};
    
    function normalizeColor(col) {
      if (typeof col === 'number') {
        const hex = (col >>> 0).toString(16).padStart(8, '0');
        return '#' + hex.toLowerCase();
      }
      if (typeof col === 'string') {
        let s = col.trim();
        if (!s.startsWith('#')) s = '#' + s;
        let body = s.slice(1);
        if (body.length === 6) body = body + 'ff';
        if (body.length === 8) return '#' + body.toLowerCase();
        return s.toLowerCase();
      }
      return '#000000ff';
    }
    
    function getGradientCoords(layerType) {
      switch (layerType) {
        case 3: case 4:
          return { x1: "0", y1: "0", x2: "0", y2: "1" };
        case 5: case 6:
          return { x1: "0", y1: "0", x2: "1", y2: "0" };
        case 7: case 8:
          return { x1: "0", y1: "0", x2: "1", y2: "1" };
        case 9: case 10:
          return { x1: "0", y1: "1", x2: "1", y2: "0" };
        default:
          return { x1: "0", y1: "0", x2: "0", y2: "1" };
      }
    }
    
    function clearBackgroundGroup() {
      while (backgroundGroup.firstChild) backgroundGroup.removeChild(backgroundGroup.firstChild);
    }
    
    function renderBackgroundEntry(entry, index) {
      clearBackgroundGroup();
      const layerType = entry.layerType;
      const paletteRaw = Array.isArray(entry.palette) ? entry.palette : [];
      const palette = paletteRaw.map(normalizeColor);
      
      if (layerType === BG_TYPES.Image) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradId = 'bg-gradient-' + index;
        const linear = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linear.setAttribute('id', gradId);
        linear.setAttribute('x1', '0'); linear.setAttribute('y1', '0');
        linear.setAttribute('x2', '1'); linear.setAttribute('y2', '1');
        
        const rainbowColors = ['#ff0000ff', '#ff7f00ff', '#ffff00ff', '#00ff00ff', '#0000ffff', '#4b0082ff', '#9400d3ff'];
        const rainbowOffsets = ['0%', '16.67%', '33.33%', '50%', '66.67%', '83.33%', '100%'];
        
        for (let i = 0; i < rainbowColors.length; i++) {
          const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          stop.setAttribute('offset', rainbowOffsets[i]);
          stop.setAttribute('stop-color', rainbowColors[i]);
          linear.appendChild(stop);
        }
        
        defs.appendChild(linear);
        backgroundGroup.appendChild(defs);
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
        rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
        rect.setAttribute('fill', \`url(#\${gradId})\`);
        backgroundGroup.appendChild(rect);
        postToParent();
        return;
      }
      
      if (layerType === BG_TYPES.Solid) {
        const color = palette[0] || '#000000ff';
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
        rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
        rect.setAttribute('fill', color);
        backgroundGroup.appendChild(rect);
        postToParent();
        return;
      }
      
      if (layerType === BG_TYPES.Radial) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradId = 'bg-radial-' + index;
        const radial = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        radial.setAttribute('id', gradId);
        radial.setAttribute('cx', '50%'); radial.setAttribute('cy', '50%'); radial.setAttribute('r', '70%');
        
        const n = Math.max(1, palette.length);
        for (let i = 0; i < n; i++) {
          const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          const pct = (i / (n - 1 || 1)) * 100;
          stop.setAttribute('offset', pct + '%');
          stop.setAttribute('stop-color', palette[i] || palette[palette.length - 1] || '#000000ff');
          radial.appendChild(stop);
        }
        
        defs.appendChild(radial);
        backgroundGroup.appendChild(defs);
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
        rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
        rect.setAttribute('fill', \`url(#\${gradId})\`);
        backgroundGroup.appendChild(rect);
        postToParent();
        return;
      }
      
      const coords = getGradientCoords(layerType);
      const isPixelated = [4, 6, 8, 10].includes(layerType);
      
      if (!palette.length) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
        rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
        rect.setAttribute('fill', 'transparent');
        backgroundGroup.appendChild(rect);
        postToParent();
        return;
      }
      
      if (palette.length === 1) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
        rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
        rect.setAttribute('fill', palette[0]);
        backgroundGroup.appendChild(rect);
        postToParent();
        return;
      }
      
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradId = 'bg-gradient-' + index;
      const linear = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      linear.setAttribute('id', gradId);
      linear.setAttribute('x1', coords.x1); linear.setAttribute('y1', coords.y1);
      linear.setAttribute('x2', coords.x2); linear.setAttribute('y2', coords.y2);
      
      const n = palette.length;
      if (isPixelated) {
        for (let i = 0; i < n; i++) {
          const startPct = (i / n) * 100;
          const endPct = ((i + 1) / n) * 100;
          
          const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          s1.setAttribute('offset', startPct + '%');
          s1.setAttribute('stop-color', palette[i]);
          linear.appendChild(s1);
          
          const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          s2.setAttribute('offset', (Math.max(0, endPct - 0.0001)) + '%');
          s2.setAttribute('stop-color', palette[i]);
          linear.appendChild(s2);
          
          if (i < n - 1) {
            const s3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            s3.setAttribute('offset', endPct + '%');
            s3.setAttribute('stop-color', palette[i + 1]);
            linear.appendChild(s3);
          }
        }
      } else {
        for (let i = 0; i < n; i++) {
          const pct = (i / (n - 1 || 1)) * 100;
          const s = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          s.setAttribute('offset', pct + '%');
          s.setAttribute('stop-color', palette[i]);
          linear.appendChild(s);
        }
      }
      
      defs.appendChild(linear);
      backgroundGroup.appendChild(defs);
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '0'); rect.setAttribute('y', '0');
      rect.setAttribute('width', String(viewBoxSize)); rect.setAttribute('height', String(viewBoxSize));
      rect.setAttribute('fill', \`url(#\${gradId})\`);
      backgroundGroup.appendChild(rect);
      postToParent();
    }
    
    function postToParent() {
      if (window && window.parent) {
        window.parent.postMessage({
          type: 'current-background',
          backgroundIndex: currentIndex + '/' + (BACKGROUNDS.length - 1),
          iframeId: window.frameElement?.id || 'unknown'
        }, '*');
      }
    }
    
    function cycleBackground(direction = 'forward') {
      const dir = String(direction).toLowerCase().trim();
      const step = (dir === 'backward' || dir === 'back' || dir === 'prev' || dir === 'previous') ? -1 : 1;
      currentIndex = (currentIndex + step + BACKGROUNDS.length) % BACKGROUNDS.length;
      const entry = BACKGROUNDS[currentIndex];
      renderBackgroundEntry(entry, currentIndex);
    }
    
    function handleClick(e) {
      cycleBackground();
    }
    
    function handleKeyPress(e) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        cycleBackground('forward');
      }
      if (e.key === 'ArrowLeft') {
        cycleBackground('backward');
      }
    }
    
    window.addEventListener('message', function(event) {
      if (event.data.type === 'background-next') {
        cycleBackground(true);
      }
      if (event.data.type === 'background-prev') {
        cycleBackground(false);
      }
    });
    
    postToParent();
  </script>
</body>
</html>`;
}
