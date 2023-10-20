interface MissingFluidPlayerOptions {
  layoutControls: Partial<{
    controlBar: Partial<{
      playbackRates: string[]
    }>,
  }>
}

export type ExtendedFluidPlayerOptions = FluidPlayerOptions & MissingFluidPlayerOptions;

export interface ConfiguratorOptions {
  options: Partial<ExtendedFluidPlayerOptions>,
  videoUrl?: string,
}
