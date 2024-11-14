import { finishWork } from '../backend/work';
import { BrowserWindow, InputEvent, screen } from 'electron';

export type TScreen = 'login' | 'home' | 'work';

export default function changeScreen(screenName: TScreen) {
  const window = BrowserWindow.getAllWindows()[0];
  function setOpacity1() {
    window.setOpacity(1);
  }
  function setOpacity05() {
    window.setOpacity(0.5);
  }
  function setMouseEvent(e: any, input: InputEvent) {
    if (window.isFocused() === false && input.type === 'mouseMove') {
      window.setOpacity(1);
    } else if (window.isFocused() === false && input.type === 'mouseLeave') {
      window.setOpacity(0.5);
    }
  }
  window.removeAllListeners();
  window.webContents.removeAllListeners('input-event');

  switch (screenName) {
    case 'login':
      window.setSize(400, 320);
      window.setResizable(false);
      window.center();
      break;
    case 'home':
      window.setAlwaysOnTop(false);
      window.setOpacity(1);
      window.setSize(1280, 720);
      window.setResizable(true);
      window.center();
      break;
    case 'work':
      const { workArea } = screen.getDisplayNearestPoint(
        screen.getCursorScreenPoint()
      );

      window.setResizable(false);
      window.setSize(200, 100);
      window.setAlwaysOnTop(true);

      window.setPosition(workArea.x + workArea.width - 200, workArea.y);

      window.on('focus', setOpacity1);
      window.on('blur', setOpacity05);

      window.webContents.on('input-event', setMouseEvent);

      window.on('close', () => {
        finishWork();
      });
      break;
  }
}
