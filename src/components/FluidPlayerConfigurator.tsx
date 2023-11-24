import {useState} from "react";
import {FormMenu} from "./FormMenu.tsx";
import {formMenuItems} from "../constants/formMenuItem.ts";
import {ExtendedFluidPlayerOptions} from "../models/ConfiguratorOptions.ts";
import transformFluidPlayerOptions from "../utils/transformFluidPlayerOptions.ts";

interface Configuration {
  options: Partial<ExtendedFluidPlayerOptions>,
  videoUrl?: string,
}

export function FluidPlayerConfigurator({configuration, onSave}: {
  configuration: Configuration,
  onSave: (newOptions: Partial<ExtendedFluidPlayerOptions>) => void
}) {
  const [openedMenu, setOpenedMenu] = useState(formMenuItems[0].key);
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Changes selected menu if there is no form errors
   */
  function handleChangeMenu({ key }: { key: string }) {
    if (!isDirty) {
      setOpenedMenu(key);
    }
  }

  /**
   * Handles saving and disabling the dirty form state
   */
  function handleSave(options: Partial<ExtendedFluidPlayerOptions>) {
    setIsDirty(false);
    onSave(transformFluidPlayerOptions(options));
  }

  const { FormComponent  } = formMenuItems.find(menuItem => menuItem.key === openedMenu) || {};

  return (
    <>
      <div className="grid grid-cols-[minmax(160px,_1fr)_3fr]">
        <FormMenu onMenuChange={handleChangeMenu} preventNavigation={isDirty} selectedItem={openedMenu} />
        {FormComponent && <FormComponent configuration={configuration} onSave={handleSave} onDirty={() => setIsDirty(true)} />}
      </div>
    </>
  );
}
