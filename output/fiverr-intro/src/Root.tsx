import { Composition } from "remotion";
import { FiverrVideo } from "./index";

export const Root = () => {
  return (
    <Composition
      id="FiverrVideo"
      component={FiverrVideo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};