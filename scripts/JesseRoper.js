// JesseRoper.js

class FloaterButton {
    constructor(options = {}) {
        this.buttonId = options.buttonId || 'btn-qrtdogd-floating-button';
        this.popupId = options.popupId || 'btn-qrtdogd-popup';
        this.tooltipText = options.tooltipText || 'Frost Byte';
        this.iframeSrc = options.iframeSrc || './scripts/popout.js';
        this.createStyles();
        this.createButton();
        this.createPopup();
        this.createTooltip();
        this.attachEventListeners();
    }

    createStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .btn-qrtdogd-floating-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background-color: transparent;
                z-index: 1000;
                border-radius: 50%;
                width: 80px;
                height: 80px; 
                background-image: url('https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/GameIconsSnowman-2.png');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }

            .btn-qrtdogd-popup {
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                max-width: 700px;
                background-color: #7c8286;
                color: #e5e7eb;
                padding: 12px; 
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 1001;
                box-sizing: border-box;
            }

            .btn-qrtdogd-popup iframe {
                width: 100%;
                height: 480px; 
                border: none; 
                display: block;
                border-radius: 4px;
            }

            .btn-qrtdogd-close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #bb1133;
                border: none;
                color: #ffffff;
                border-radius: 50%;
                width: 36px; 
                height: 36px; 
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 18px; 
            }

            .btn-qrtdogd-tooltip {
                position: absolute;
                background-color: #000;
                color: #f8f8f2;
                border-radius: 5px;
                padding: 6px 12px; 
                font-size: 14px; 
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1001;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 12px;
            }

            .btn-qrtdogd-tooltip.visible {
                opacity: 1;
            }

           
            @media (max-width: 768px) {
                .btn-qrtdogd-floating-button {
                    width: 60px;
                    height: 60px;
                }
                .btn-qrtdogd-popup {
                    max-width: 90%;
                    padding: 16px;
                }
                .btn-qrtdogd-popup iframe {
                    height: 360px;
                }
                .btn-qrtdogd-close-button {
                    width: 30px;
                    height: 30px;
                    font-size: 16px;
                }
            }

            @media (max-width: 480px) {
                .btn-qrtdogd-floating-button {
                    width: 50px;
                    height: 50px;
                }
                .btn-qrtdogd-popup iframe {
                    height: 280px;
                }
                .btn-qrtdogd-close-button {
                    width: 28px;
                    height: 28px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createButton() {
        this.button = document.createElement('div');
        this.button.id = this.buttonId;
        this.button.className = 'btn-qrtdogd-floating-button';
        document.body.appendChild(this.button);
    }

    createPopup() {
        this.popup = document.createElement('div');
        this.popup.id = this.popupId;
        this.popup.className = 'btn-qrtdogd-popup';
        this.popup.innerHTML = `
            <button class="btn-qrtdogd-close-button">x</button>
            <iframe src="${this.iframeSrc}" title="Floater Content"></iframe>
        `;
        document.body.appendChild(this.popup);
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'btn-qrtdogd-tooltip';
        this.tooltip.innerText = this.tooltipText;
        this.button.appendChild(this.tooltip);
    }

    attachEventListeners() {
        this.button.addEventListener('click', () => this.openPopup());
        this.button.addEventListener('touchend', e => {
            e.preventDefault();
            this.openPopup();
        });

        document
            .querySelector(`#${this.popupId} .btn-qrtdogd-close-button`)
            .addEventListener('click', () => this.closePopup());

        this.button.addEventListener('mouseover', () => {
            this.tooltip.classList.add('visible');
        });
        this.button.addEventListener('mouseout', () => {
            this.tooltip.classList.remove('visible');
        });

        this.button.addEventListener('mousedown', e => this.startDrag(e));
        this.button.addEventListener('touchstart', e => {
            e.preventDefault();
            this.startDrag(e);
        });
    }

    openPopup() {
        if (this.popup) {
            this.popup.style.display = 'block';
        }
    }

    closePopup() {
        if (this.popup) {
            this.popup.style.display = 'none';
        }
    }

    startDrag(e) {
        this.isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        this.offsetX = clientX - this.button.getBoundingClientRect().left;
        this.offsetY = clientY - this.button.getBoundingClientRect().top;
        document.addEventListener('mousemove', e => this.onMouseMove(e));
        document.addEventListener('mouseup', () => this.onMouseUp());
        document.addEventListener('touchmove', e => this.onTouchMove(e));
        document.addEventListener('touchend', () => this.onTouchEnd());
    }

    onMouseMove(e) {
        if (this.isDragging) {
            const newLeft = e.clientX - this.offsetX;
            const newTop = e.clientY - this.offsetY;
            this.button.style.left = `${newLeft}px`;
            this.button.style.top = `${newTop}px`;
        }
    }

    onMouseUp() {
        this.isDragging = false;
        document.removeEventListener('mousemove', e => this.onMouseMove(e));
        document.removeEventListener('mouseup', () => this.onMouseUp());
    }

    onTouchMove(e) {
        if (this.isDragging) {
            const touch = e.touches[0];
            const newLeft = touch.clientX - this.offsetX;
            const newTop = touch.clientY - this.offsetY;
            this.button.style.left = `${newLeft}px`;
            this.button.style.top = `${newTop}px`;
        }
    }

    onTouchEnd() {
        this.isDragging = false;
        document.removeEventListener('touchmove', e => this.onTouchMove(e));
        document.removeEventListener('touchend', () => this.onTouchEnd());
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new FloaterButton({
        tooltipText: 'Frost Byte',
        iframeSrc: './scripts/popout.js',
    });
});
