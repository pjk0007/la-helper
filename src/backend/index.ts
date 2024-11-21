import { BrowserWindow, screen } from 'electron';

let tooltipWindow: BrowserWindow;
let interval: NodeJS.Timeout;
let cursorPos: Electron.Point;

function createTooltipWindow() {
  tooltipWindow = new BrowserWindow({
    width: 150,
    height: 50,
    frame: false, // 창 프레임 숨기기
    transparent: true, // 창 투명화
    alwaysOnTop: true, // 항상 위에 표시
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // HTML 로드 또는 직접 HTML 삽입
  tooltipWindow.loadURL(`data:text/html;charset=utf-8,
              <style>
                  body {
                      margin: 0;
                      padding: 5px;
                      background: rgba(0, 0, 0, 0.8);
                      color: white;
                      font-size: 14px;
                      border-radius: 5px;
                  }
              </style>
              <body>
                  Tooltip Content
              </body>
          `);

  tooltipWindow.setIgnoreMouseEvents(true); // 툴팁 창이 마우스 이벤트를 무시하도록 설정
}

function closeTooltipWindow() {
  if (tooltipWindow) {
    tooltipWindow.close();
  }
}

export function start() {
  if (!interval) {
    interval = setInterval(() => {
      cursorPos = screen.getCursorScreenPoint();

      tooltipWindow.setBounds({
        x: cursorPos.x + 10, // 마우스 우측 하단으로 약간 이동
        y: cursorPos.y + 10,
        width: 150,
        height: 50,
      });
    }, 1000);
  }
}

export function finish() {
  if (interval) {
    clearInterval(interval);
  }
}
