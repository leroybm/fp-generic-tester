// import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {cloneDeep} from "lodash";
import FormField from "../FormField/FormField.tsx";
import FunctionInput from "../FunctionInput/FunctionInput.tsx";
import NumberInput from "../NumberInput/NumberInput.tsx";

interface Configuration {
  options: Partial<FluidPlayerOptions>,
  videoUrl?: string,
}

export default function FluidPlayerConfigForm({configuration, onSave}: {
  configuration: Configuration,
  onSave: (newOptions: Partial<FluidPlayerOptions>) => void
}) {
  // const [showCode, setShowCode] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: {errors},
  } = useForm<FluidPlayerOptions>({
    defaultValues: {
      ...cloneDeep(configuration.options)
    }
  });
  const onSubmit: SubmitHandler<FluidPlayerOptions> = (data) => onSave(data);

  console.log('Errors', errors);

  return (
    <>
      <p className="text-xl pb-2">Configuration Form</p>

      {/*{showCode && <code>{JSON.stringify(configuration, null, 2)}</code>}*/}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          Enable MiniPlayer
          <input type="checkbox" {...register('layoutControls.miniPlayer.enabled')} />
        </label>

        <FormField label="Width (px)" errorMessage={errors.layoutControls?.miniPlayer?.width?.message}>
          <NumberInput fieldName="layoutControls.miniPlayer.width" register={register} min={400} required />
        </FormField>

        <FormField label="Height (px)" errorMessage={errors.layoutControls?.miniPlayer?.height?.message}>
          <NumberInput fieldName="layoutControls.miniPlayer.height" register={register} min={225} required />
        </FormField>

        <FormField label="onBeforeXMLHttpRequestOpen" errorMessage={errors.onBeforeXMLHttpRequestOpen?.message}>
          <FunctionInput fieldName="onBeforeXMLHttpRequestOpen" register={register} />
        </FormField>

        {/*<button type="button" onClick={() => setShowCode(!showCode)}>{showCode ? 'Hide' : 'Show'} Code</button>*/}
        <button className="mt-4 bg-blue-400 rounded-2xl shadow text-white px-4 py-1 text-xl" type="submit">Save
          Configuration
        </button>
      </form>

    </>
  );
}
