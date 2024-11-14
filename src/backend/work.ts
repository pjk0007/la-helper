import { IWorkData } from '../interface';
import changeScreen from '../backend/changeScreen';
import { BrowserWindow, screen } from 'electron';
import {
  GlobalKeyboardListener,
  IGlobalKeyListener,
} from 'node-global-key-listener';
import sendWorkData from '../backend/apis/sendWorkData';
import { getScreenShots } from '../backend/getScreenShots';
import sendScreenshots from '../backend/apis/sendScreenshots';

const v = new GlobalKeyboardListener();
let keyboard = false;

const keyEvent: IGlobalKeyListener = (e, down) => {
  keyboard = true;
};

let dataCollectInterval: NodeJS.Timeout | null = null;
let dataSendInterval: NodeJS.Timeout | null = null;
let screnshotSendInterval: NodeJS.Timeout | null = null;
let startDateTime: Date | null = null;

let mousePosition = { x: 0, y: 0 };
let mouseCount = 0;
let keyboardCount = 0;
let total = 0;

function init() {
  v.addListener(keyEvent);
  mousePosition = { x: 0, y: 0 };
  mouseCount = 0;
  keyboardCount = 0;
  total = 0;
}

export function startWork() {
  changeScreen('work');
  init();

  startDateTime = new Date();

  if (dataCollectInterval) {
    clearInterval(dataCollectInterval);
  }
  dataCollectInterval = setInterval(() => {
    total++;
    const { x, y } = screen.getCursorScreenPoint();
    if (mousePosition.x !== x || mousePosition.y !== y) {
      mousePosition = { x, y };
      mouseCount++;
    }
    if (keyboard) {
      keyboardCount++;
      keyboard = false;
    }
    console.log(mouseCount, keyboardCount);
  }, 1000);

  if (dataSendInterval) {
    clearInterval(dataSendInterval);
  }
  dataSendInterval = setInterval(async () => {
    const images = await getScreenShots();
    sendWorkData({
      endDateTime: new Date(),
      keyboard: keyboardCount,
      mouse: mouseCount,
      startDateTime: startDateTime!,
      total,
    }).then(() => {
      mouseCount = 0;
      keyboardCount = 0;
      total = 0;
      startDateTime = new Date();
    });
  }, 10000);

  if (screnshotSendInterval) {
    clearInterval(screnshotSendInterval);
  }
  getScreenShots().then((images) => {
    sendScreenshots(images.map((image) => image.dataURL));
  });
  // 5분마다 스크린샷 전송
  screnshotSendInterval = setInterval(async () => {
    const images = await getScreenShots();
    sendScreenshots(images.map((image) => image.dataURL));
  }, 300000);

  return true;
}

export function finishWork() {
  changeScreen('home');
  getScreenShots().then((images) => {
    sendWorkData({
      endDateTime: new Date(),
      keyboard: keyboardCount,
      mouse: mouseCount,
      startDateTime: startDateTime!,
      total,
    });
  });

  if (dataCollectInterval) {
    clearInterval(dataCollectInterval);
  }
  if (dataSendInterval) {
    clearInterval(dataSendInterval);
  }
  if (screnshotSendInterval) {
    clearInterval(screnshotSendInterval);
  }
  v.removeListener(keyEvent);

  return true;
}
