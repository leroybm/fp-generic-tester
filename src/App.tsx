import {useState} from "react";
import {cloneDeep} from "lodash";
import {FluidPlayer} from "./components/fluid-player/FluidPlayer.tsx";
import {FluidPlayerConfigurator} from "./components/FluidPlayerConfigurator.tsx";
import {defaultValues} from "./constants/fluidPlayerConfigs.ts";

export default function App() {
  const [playerOptions, setPlayerOptions] = useState<Partial<FluidPlayerOptions>>(defaultValues);

  return (
    <div className="px-8 pt-4">
      <p className="text-3xl font-bold">FP Generic Configurator</p>
      <div className="grid grid-cols-2 gap-12 pt-4">
        <section>
          <FluidPlayer playerOptions={playerOptions}/>
        </section>
        <section>
          <FluidPlayerConfigurator
            configuration={{options: playerOptions}}
            onSave={(newOptions) => {
              if (typeof newOptions.onBeforeXMLHttpRequestOpen === 'string') {
                newOptions.onBeforeXMLHttpRequestOpen = new Function('return ' + newOptions.onBeforeXMLHttpRequestOpen)() as ((request: XMLHttpRequest) => void);
                console.log('function is ', newOptions.onBeforeXMLHttpRequestOpen.toString());
              }
              console.log('newOptions', newOptions);

              setPlayerOptions(cloneDeep(newOptions));
            }}
          />
        </section>
      </div>
    </div>
  );
}
