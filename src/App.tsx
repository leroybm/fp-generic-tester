import { cloneDeep } from "lodash";
import { useState } from "react";
import { FluidPlayerConfigurator } from "./components/FluidPlayerConfigurator.tsx";
import { FluidPlayer } from "./components/fluid-player/FluidPlayer.tsx";
import { defaultValues } from "./constants/fluidPlayerConfigs.ts";
import { ExtendedFluidPlayerOptions } from "./models/ConfiguratorOptions.ts";

export default function App() {
  const [playerOptions, setPlayerOptions] = useState<Partial<ExtendedFluidPlayerOptions>>(defaultValues);

  return (
    <div className="px-8 pt-4">
      <p className="text-3xl font-bold">FP Generic Configurator</p>
      <div className="grid grid-cols-2 gap-12 pt-4">
        <section>
          <FluidPlayer playerOptions={playerOptions} />
        </section>
        <section>
          <FluidPlayerConfigurator
            configuration={{ options: playerOptions }}
            onSave={(newOptions) => {
              console.log("newOptions", newOptions);

              setPlayerOptions(cloneDeep(newOptions));
            }}
          />
        </section>
      </div>
    </div>
  );
}
