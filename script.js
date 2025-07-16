class ImageScaleApp {
    constructor() {
        this.canvas = document.getElementById('imageScaleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataTable = document.getElementById('dataTableBody');
        this.coordinateDisplay = document.getElementById('coordinateDisplay');
        this.data = [];
        
        this.imageWords = [
            { word: '楽しい', x: -0.3, y: 0.6, color: { x: '#FF6B35', y: '#F7931E', z: '#FFD23F' } },
            { word: '気品のある', x: 0.7, y: 0.4, color: { x: '#6A4C93', y: '#9B72CF', z: '#C8B2DB' } },
            { word: '新鮮な', x: 0.2, y: 0.8, color: { x: '#7FB069', y: '#B8E6B8', z: '#4FB06D' } },
            { word: 'シック', x: 0.8, y: -0.5, color: { x: '#2C3E50', y: '#34495E', z: '#95A5A6' } },
            { word: 'モダン', x: 0.5, y: -0.7, color: { x: '#BDC3C7', y: '#ECF0F1', z: '#95A5A6' } },
            { word: 'エレガント', x: 0.6, y: 0.3, color: { x: '#8E44AD', y: '#BB8FCE', z: '#D7BDE2' } },
            { word: 'ナチュラル', x: -0.4, y: 0.2, color: { x: '#27AE60', y: '#7FB069', z: '#A8D8A8' } },
            { word: 'クール', x: 0.9, y: -0.2, color: { x: '#3498DB', y: '#5DADE2', z: '#AED6F1' } },
            { word: 'ウォーム', x: -0.8, y: 0.1, color: { x: '#E74C3C', y: '#F1948A', z: '#FADBD8' } },
            { word: 'ソフト', x: 0.1, y: 0.9, color: { x: '#F8C8DC', y: '#FADCEB', z: '#FDF2F8' } }
        ];
        
        this.backgroundImage = new Image();
        this.backgroundImage.onload = () => {
            console.log('Background image loaded successfully');
            this.drawImageScale();
        };
        this.backgroundImage.onerror = (error) => {
            console.log('Background image failed to load:', error);
            this.drawImageScale();
        };
        this.backgroundImage.src = 'image/imagescale01.jpg';
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.drawImageScale();
        this.setupEventListeners();
        this.loadData();
        this.renderTable();
    }
    
    setupCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth - 40;
        const containerHeight = container.clientHeight - 40;
        
        const aspectRatio = 4/3;
        let canvasWidth = containerWidth;
        let canvasHeight = canvasWidth / aspectRatio;
        
        if (canvasHeight > containerHeight) {
            canvasHeight = containerHeight;
            canvasWidth = canvasHeight * aspectRatio;
        }
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
    }
    
    drawImageScale() {
        const { width, height } = this.canvas;
        
        if (this.backgroundImage.complete && this.backgroundImage.naturalWidth > 0) {
            try {
                this.ctx.drawImage(this.backgroundImage, 0, 0, width, height);
                console.log('Background image drawn successfully');
            } catch (error) {
                console.log('Failed to draw background image:', error);
                this.drawFallbackBackground(width, height);
            }
        } else {
            console.log('Background image not ready, drawing fallback');
            this.drawFallbackBackground(width, height);
        }
        
        this.drawGridLines(width, height);
        this.drawImageWords();
    }
    
    drawFallbackBackground(width, height) {
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, width, height);
        
        this.ctx.fillStyle = '#e9ecef';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('イメージスケール図', width / 2, height / 2 - 10);
        this.ctx.fillText('(image/imagescale01.jpg)', width / 2, height / 2 + 10);
    }
    
    drawGridLines(width, height) {
        this.ctx.strokeStyle = 'rgba(0, 102, 204, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            const y = (height / 10) * i;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        
        this.ctx.strokeStyle = '#0066cc';
        this.ctx.lineWidth = 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(width / 2, 0);
        this.ctx.lineTo(width / 2, height);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, height / 2);
        this.ctx.lineTo(width, height / 2);
        this.ctx.stroke();
    }
    
    drawImageWords() {
        const { width, height } = this.canvas;
        
        this.imageWords.forEach(item => {
            const x = ((item.x + 1) / 2) * width;
            const y = ((1 - item.y) / 2) * height;
            
            const colorSize = 6;
            
            this.ctx.fillStyle = item.color.x;
            this.ctx.fillRect(x - colorSize, y - colorSize, colorSize, colorSize * 2);
            
            this.ctx.fillStyle = item.color.y;
            this.ctx.fillRect(x, y - colorSize, colorSize, colorSize * 2);
            
            this.ctx.fillStyle = item.color.z;
            this.ctx.fillRect(x + colorSize, y - colorSize, colorSize, colorSize * 2);
            
            this.ctx.strokeStyle = '#333333';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x - colorSize, y - colorSize, colorSize * 3, colorSize * 2);
            
            this.ctx.fillStyle = '#333333';
            this.ctx.font = 'bold 11px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item.word, x + colorSize, y - 20);
        });
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseenter', () => this.showCoordinateDisplay());
        this.canvas.addEventListener('mouseleave', () => this.hideCoordinateDisplay());
        
        document.getElementById('addButton').addEventListener('click', () => this.addNewEntry());
        document.getElementById('downloadCsvButton').addEventListener('click', () => this.downloadCsv());
        document.getElementById('clearAllButton').addEventListener('click', () => this.clearAllData());
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.drawImageScale();
        });
    }
    
    handleCanvasClick(event) {
        console.log('Canvas clicked');
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        console.log('Click position:', x, y);
        
        const normalizedX = ((x / this.canvas.width) * 2) - 1;
        const normalizedY = 1 - ((y / this.canvas.height) * 2);
        
        console.log('Normalized coordinates:', normalizedX, normalizedY);
        
        const nearestWord = this.findNearestImageWord(normalizedX, normalizedY);
        console.log('Nearest word:', nearestWord);
        
        const extractedColors = this.extractColorsFromPosition(x, y);
        console.log('Final colors:', extractedColors);
        
        this.addEntry(nearestWord.word, normalizedX, normalizedY, extractedColors);
        console.log('Entry added to table');
    }
    
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const normalizedX = ((x / this.canvas.width) * 2) - 1;
        const normalizedY = 1 - ((y / this.canvas.height) * 2);
        
        this.updateCoordinateDisplay(normalizedX, normalizedY);
    }
    
    updateCoordinateDisplay(x, y) {
        const displayX = Math.round(x * 1000) / 1000;
        const displayY = Math.round(y * 1000) / 1000;
        this.coordinateDisplay.textContent = `X: ${displayX.toFixed(3)}, Y: ${displayY.toFixed(3)}`;
    }
    
    showCoordinateDisplay() {
        this.coordinateDisplay.style.opacity = '1';
    }
    
    hideCoordinateDisplay() {
        this.coordinateDisplay.style.opacity = '0';
    }
    
    findNearestImageWord(x, y) {
        let minDistance = Infinity;
        let nearest = this.imageWords[0];
        
        this.imageWords.forEach(item => {
            const distance = Math.sqrt(
                Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = item;
            }
        });
        
        return nearest;
    }
    
    extractColorsFromPosition(canvasX, canvasY) {
        console.log('Extracting colors from position:', canvasX, canvasY);
        
        const normalizedX = ((canvasX / this.canvas.width) * 2) - 1;
        const normalizedY = 1 - ((canvasY / this.canvas.height) * 2);
        
        const colors = this.generateColorsFromCoordinates(normalizedX, normalizedY);
        console.log('Generated colors from coordinates:', colors);
        
        return colors;
    }
    
    generateColorsFromCoordinates(x, y) {
        const hue = ((x + 1) / 2) * 360;
        const saturation = Math.abs(y) * 100;
        const lightness = y > 0 ? 70 - (y * 20) : 30 + (Math.abs(y) * 30);
        
        const baseColor = this.hslToHex(hue, saturation, lightness);
        const lighterColor = this.hslToHex(hue, saturation * 0.7, Math.min(90, lightness + 20));
        const darkerColor = this.hslToHex(hue, Math.min(100, saturation * 1.2), Math.max(10, lightness - 25));
        
        return {
            x: baseColor,
            y: lighterColor,
            z: darkerColor
        };
    }
    
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    
    generateColorCombination(r, g, b) {
        const baseColor = this.rgbToHex(r, g, b);
        
        const lighterColor = this.rgbToHex(
            Math.min(255, Math.floor(r * 1.3)),
            Math.min(255, Math.floor(g * 1.3)),
            Math.min(255, Math.floor(b * 1.3))
        );
        
        const darkerColor = this.rgbToHex(
            Math.floor(r * 0.7),
            Math.floor(g * 0.7),
            Math.floor(b * 0.7)
        );
        
        return {
            x: baseColor,
            y: lighterColor,
            z: darkerColor
        };
    }
    
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    addEntry(imageWord, warmCool, softHard, colorCode) {
        const entry = {
            id: Date.now().toString(),
            imageWord: imageWord,
            warmCoolCoord: Math.round(warmCool * 1000) / 1000,
            softHardCoord: Math.round(softHard * 1000) / 1000,
            colorCode: colorCode,
            timestamp: new Date().toISOString()
        };
        
        this.data.push(entry);
        this.saveData();
        this.renderTable();
    }
    
    addNewEntry() {
        const entry = {
            id: Date.now().toString(),
            imageWord: '新しいワード',
            warmCoolCoord: 0,
            softHardCoord: 0,
            colorCode: { x: '#808080', y: '#808080', z: '#808080' },
            timestamp: new Date().toISOString()
        };
        
        this.data.push(entry);
        this.saveData();
        this.renderTable();
    }
    
    deleteEntry(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.saveData();
        this.renderTable();
    }
    
    updateEntry(id, field, value) {
        const entry = this.data.find(item => item.id === id);
        if (entry) {
            if (field === 'colorCode.x' || field === 'colorCode.y' || field === 'colorCode.z') {
                const colorField = field.split('.')[1];
                entry.colorCode[colorField] = value || '#000000';
            } else {
                entry[field] = field.includes('Coord') ? parseFloat(value) || 0 : value;
            }
            this.saveData();
        }
    }
    
    renderTable() {
        this.dataTable.innerHTML = '';
        
        this.data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="text" class="edit-input" value="${entry.imageWord}" 
                           onchange="app.updateEntry('${entry.id}', 'imageWord', this.value)">
                </td>
                <td>
                    <input type="number" class="edit-input" value="${entry.warmCoolCoord}" 
                           step="0.001" min="-1" max="1"
                           onchange="app.updateEntry('${entry.id}', 'warmCoolCoord', this.value)">
                </td>
                <td>
                    <input type="number" class="edit-input" value="${entry.softHardCoord}" 
                           step="0.001" min="-1" max="1"
                           onchange="app.updateEntry('${entry.id}', 'softHardCoord', this.value)">
                </td>
                <td class="color-code">
                    <div style="display: flex; gap: 2px; align-items: center;">
                        <input type="color" class="color-input" value="${entry.colorCode.x}" 
                               onchange="app.updateEntry('${entry.id}', 'colorCode.x', this.value)"
                               style="width: 30px; height: 20px; border: none; cursor: pointer;">
                        <input type="color" class="color-input" value="${entry.colorCode.y}" 
                               onchange="app.updateEntry('${entry.id}', 'colorCode.y', this.value)"
                               style="width: 30px; height: 20px; border: none; cursor: pointer;">
                        <input type="color" class="color-input" value="${entry.colorCode.z}" 
                               onchange="app.updateEntry('${entry.id}', 'colorCode.z', this.value)"
                               style="width: 30px; height: 20px; border: none; cursor: pointer;">
                    </div>
                    <div style="font-size: 9px; margin-top: 2px;">
                        <div>${entry.colorCode.x}</div>
                        <div>${entry.colorCode.y}</div>
                        <div>${entry.colorCode.z}</div>
                    </div>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="app.deleteEntry('${entry.id}')">削除</button>
                </td>
            `;
            this.dataTable.appendChild(row);
        });
    }
    
    downloadCsv() {
        if (this.data.length === 0) {
            alert('出力するデータがありません。');
            return;
        }
        
        const headers = ['イメージワード', 'WARM/COOL軸座標', 'SOFT/HARD軸座標', '色コード(X)', '色コード(Y)', '色コード(Z)', 'タイムスタンプ'];
        const csvContent = [
            headers.join(','),
            ...this.data.map(entry => [
                `"${entry.imageWord}"`,
                entry.warmCoolCoord,
                entry.softHardCoord,
                `"${entry.colorCode.x}"`,
                `"${entry.colorCode.y}"`,
                `"${entry.colorCode.z}"`,
                `"${entry.timestamp}"`
            ].join(','))
        ].join('\n');
        
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `image_scale_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    
    clearAllData() {
        if (confirm('全てのデータを削除しますか？')) {
            this.data = [];
            this.saveData();
            this.renderTable();
        }
    }
    
    saveData() {
        localStorage.setItem('imageScaleData', JSON.stringify(this.data));
    }
    
    loadData() {
        const saved = localStorage.getItem('imageScaleData');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    }
}

const app = new ImageScaleApp();