const fs = require('fs');
const path = 'e:\\Desktop\\mountplus\\mountplus\\assets\\css\\nimo-core.css';
let content = fs.readFileSync(path, 'utf8');

// Repair .nm-hero-1-main-img
// Note: using a safer regex that doesn't rely on exact line breaks but common patterns
const brokenMainImgRegex = /\.nm-hero-1-main-img\s*{\s*transform:\s*translateY\(0\);\s*opacity:\s*1;\s*transition:\s*all\s*0\.8s\s*var\(--nm-cube-1\);\s*}/g;
const correctMainImg = `.nm-hero-1-main-img {
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: start;
  justify-content: end;
  height: 100%;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.8s var(--nm-cube-1);
}`;

// Try a more flexible regex for the broken block
content = content.replace(/\.nm-hero-1-main-img\s*{\s*transform:\s*translateY\(0\);\s*opacity:\s*1;[\s\n\r]*transition:\s*all\s*0\.8s\s*var\(--nm-cube-1\);[\s\n\r]*}/g, correctMainImg);

// Fix .nm-hero-1-disc
content = content.replace(/\.nm-hero-1-disc\s*{([^}]*?)transform:\s*translateY\(100%\);/g, '.nm-hero-1-disc {$1transform: translateY(0); opacity: 1;');

// Fix .nm-hero-1-btn 
content = content.replace(/\.nm-hero-1-btn\s*{([^}]*?)transform:\s*translateY\(160%\);/g, '.nm-hero-1-btn {$1transform: translateY(0); opacity: 1;');

fs.writeFileSync(path, content);
console.log('Fix applied successfully');
