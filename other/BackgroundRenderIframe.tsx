"use client";

import { useEffect, useRef, useState } from "react";
import { BACKGROUND_OPTIONS } from "@/lib/backgrounds";

interface Props {
	tokenId: string;
	initialIndex: number;
	punkImageBase64?: string; // optional: if you want to embed the punk itself
	onIndexChange?: (newIndex: number) => void;
}

export default function BackgroundRendererIframe({ tokenId, initialIndex, punkImageBase64, onIndexChange }: Props) {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	useEffect(() => {
		const handler = (e: MessageEvent) => {
			if (e.data?.type === "current-background") {
				const idx = parseInt(e.data.backgroundIndex.split("/")[0], 10);
				if (!isNaN(idx)) {
					setCurrentIndex(idx);
					onIndexChange?.(idx);
				}
			}
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, [onIndexChange]);

	const cycle = (next: boolean) => {
		iframeRef.current?.contentWindow?.postMessage({ type: next ? "background-next" : "background-prev" }, "*");
	};

	// Inject all background definitions into the iframe
	const optionsJson = JSON.stringify(BACKGROUND_OPTIONS);

	const srcDoc = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin:0; overflow:hidden; background:#000; }
    svg { width:100%; height:100%; image-rendering:pixelated; }
  </style>
</head>
<body>
  <svg id="nft-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g id="bg-layer"></g>
    <foreignObject id="punk-layer" width="24" height="24">
      ${punkImageBase64 ? `<img width="100%" height="100%" src="${punkImageBase64}" />` : ""}
    </foreignObject>
  </svg>

  <script>
    const options = ${optionsJson};
    let currentIndex = ${initialIndex};

    const svg = document.getElementById("nft-svg");
    const bgLayer = document.getElementById("bg-layer");

    function updateBackground() {
      // Clear old background
      while (bgLayer.firstChild) bgLayer.removeChild(bgLayer.firstChild);

      const bg = options[currentIndex] || options[0];

      let defs = null;
      let bgElement = null;

      if (bg.type === "solid") {
        bgElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgElement.setAttribute("width", "24");
        bgElement.setAttribute("height", "24");
        bgElement.setAttribute("fill", bg.color || "#000000ff");
      }
      else if (bg.type === "linear") {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        gradient.setAttribute("id", "bg-grad");

        const dirMap = {
          "to right":   {x1:"0%", y1:"0%", x2:"100%", y2:"0%"},
          "to left":    {x1:"100%", y1:"0%", x2:"0%", y2:"0%"},
          "to bottom":  {x1:"0%", y1:"0%", x2:"0%", y2:"100%"},
          "to top":     {x1:"0%", y1:"100%", x2:"0%", y2:"0%"},
          // add diagonal mappings as needed
        };
        const dir = dirMap[bg.direction] || dirMap["to bottom"];
        Object.entries(dir).forEach(([k, v]) => gradient.setAttribute(k, v));

        const step = 100 / bg.colors.length;
        bg.colors.forEach((color, i) => {
          const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          s1.setAttribute("offset", \`\${i * step}%\`);
          s1.setAttribute("stop-color", color);
          gradient.appendChild(s1);

          if (bg.pixelated) {
            const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            s2.setAttribute("offset", \`\${(i + 1) * step}%\`);
            s2.setAttribute("stop-color", color);
            gradient.appendChild(s2);
          }
        });

        defs.appendChild(gradient);
        bgLayer.appendChild(defs);

        bgElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgElement.setAttribute("width", "24");
        bgElement.setAttribute("height", "24");
        bgElement.setAttribute("fill", "url(#bg-grad)");
      }
      else if (bg.type === "radial") {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
        gradient.setAttribute("id", "bg-grad");
        gradient.setAttribute("cx", "50%");
        gradient.setAttribute("cy", "50%");
        gradient.setAttribute("r", "70%");

        const step = 100 / bg.colors.length;
        bg.colors.forEach((color, i) => {
          const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          stop.setAttribute("offset", \`\${i * step}%\`);
          stop.setAttribute("stop-color", color);
          gradient.appendChild(stop);
        });

        defs.appendChild(gradient);
        bgLayer.appendChild(defs);

        bgElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgElement.setAttribute("width", "24");
        bgElement.setAttribute("height", "24");
        bgElement.setAttribute("fill", "url(#bg-grad)");
      }
      else if (bg.type === "image" && bg.imageUrl) {
        bgElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
        bgElement.setAttribute("href", bg.imageUrl);
        bgElement.setAttribute("width", "24");
        bgElement.setAttribute("height", "24");
        bgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
      }

      if (bgElement) bgLayer.appendChild(bgElement);

      // Notify parent
      window.parent.postMessage({
        type: "current-background",
        backgroundIndex: currentIndex + "/" + (options.length - 1),
        iframeId: "${tokenId}"
      }, "*");
    }

    // Initial draw
    updateBackground();

    // Listen for cycle commands
    window.addEventListener("message", (e) => {
      if (e.data.type === "background-next") {
        currentIndex = (currentIndex + 1) % options.length;
        updateBackground();
      }
      if (e.data.type === "background-prev") {
        currentIndex = (currentIndex - 1 + options.length) % options.length;
        updateBackground();
      }
    });
  </script>
</body>
</html>`;

	return (
		<div className="relative w-full h-full">
			<iframe ref={iframeRef} srcDoc={srcDoc} sandbox="allow-scripts" width="100%" height="100%" style={{ border: "none" }} />

			{/* Arrow controls overlay */}
			<div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
				<button className="pointer-events-auto text-4xl text-white/70 hover:text-white" onClick={() => cycle(false)}>
					←
				</button>
				<div className="text-xl font-mono text-white/90 pointer-events-none">
					{currentIndex + 1} / {BACKGROUND_OPTIONS.length}
				</div>
				<button className="pointer-events-auto text-4xl text-white/70 hover:text-white" onClick={() => cycle(true)}>
					→
				</button>
			</div>
		</div>
	);
}
