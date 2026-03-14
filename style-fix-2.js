const fs = require('fs');
const path = 'e:\\Desktop\\mountplus\\mountplus\\assets\\css\\nimo-core.css';
let content = fs.readFileSync(path, 'utf8');

const targetHeader = '.nm-hero-1-main-img {';
const startIndex = content.indexOf(targetHeader);
if (startIndex !== -1) {
    const endIndex = content.indexOf('}', startIndex);
    if (endIndex !== -1) {
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
        content = content.substring(0, startIndex) + correctMainImg + content.substring(endIndex + 1);
        console.log('Main image block repaired');
    }
}

// Simple string replacement for the others
content = content.replace('.nm-hero-1-disc {\n  max-width: 520px;\n  font-size: 22px;\n  color: #e3e3e3;\n  transform: translateY(100%);', '.nm-hero-1-disc {\n  max-width: 520px;\n  font-size: 22px;\n  color: #e3e3e3;\n  transform: translateY(0);\n  opacity: 1;');

fs.writeFileSync(path, content);
console.log('Fix applied successfully');
