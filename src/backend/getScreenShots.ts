import { desktopCapturer } from 'electron';

export async function getScreenShots() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window'],
    thumbnailSize: {
      width: 1440,
      height: 810,
    },
  });

  return inputSources.map((source) => ({
    display_id: source.display_id,
    id: source.id,
    name: source.name,
    dataURL: source.thumbnail.toDataURL(),
  }));
}
