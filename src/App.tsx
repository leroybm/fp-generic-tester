import {useState} from "react";
import FluidPlayer from "./components/FluidPlayer/FluidPlayer.tsx";
import FluidPlayerConfigForm from "./components/FluidPlayerConfigForm/FluidPlayerConfigForm.tsx";
import {cloneDeep} from "lodash";

export default function App() {
  const [playerOptions, setPlayerOptions] = useState<Partial<FluidPlayerOptions>>({
    layoutControls: {
      miniPlayer: {
        enabled: true,
        width: 200
      },
    },
    onBeforeXMLHttpRequestOpen: (request) => console.log(request),
    vastOptions: {
      adList: [{
        roll: "preRoll",
        vastTag: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
      }]
    }
  });

  return (
    <div className="px-8 pt-4">
      <p className="text-3xl font-bold">FP Generic Configurator</p>
      <div className="grid grid-cols-2 gap-12 pt-4">
        <section>
          <FluidPlayer playerOptions={playerOptions}/>
        </section>
        <section>
          <FluidPlayerConfigForm
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
