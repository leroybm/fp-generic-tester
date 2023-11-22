interface MissingFluidPlayerOptions {
  layoutControls: Partial<{
    controlBar: Partial<{
      playbackRates: string[]
    }>,
    timelinePreview: VTTPreviewOptions | { 
      type: 'static',
      frames: Array<{
        _id: string;
        startTime: number;
        endTime: number;
        image: string;
        x: number;
        y: number;
        w: number;
        h: number;
      }>
    };
  }>
}

export type ExtendedFluidPlayerOptions = FluidPlayerOptions & MissingFluidPlayerOptions;

export interface ConfiguratorOptions {
  options: Partial<ExtendedFluidPlayerOptions>,
  videoUrl?: string,
}
