import {useForm} from "react-hook-form";
import {FormField} from "../fields/FormField.tsx";
import {cloneDeep} from "lodash";
import {useEffect} from "react";
import {SubmitButton} from "../SubmitButton.tsx";
import {TextInput} from "../fields/TextInput.tsx";
import {Select} from "../fields/Select.tsx";
import {NumberInput} from "../fields/NumberInput.tsx";
import {CheckboxInput} from "../fields/CheckboxInput.tsx";

interface Configuration {
  options: Partial<FluidPlayerOptions>,
  videoUrl?: string,
}

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/#logo
 */
export function LogoForm({ configuration, onSave, onDirty }: {
  configuration: Configuration,
  onSave: (newOptions: Partial<FluidPlayerOptions>) => void,
  onDirty: () => void,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FluidPlayerOptions>({
    defaultValues: { ...cloneDeep(configuration.options) }
  });

  useEffect(() => {
    const subscription = watch(onDirty);
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  return <form onSubmit={handleSubmit(onSave)}>
    <FormField
      label="Image URL"
      errorMessage={errors.layoutControls?.logo?.imageUrl?.message}
    >
      <TextInput
        register={register}
        fieldName="layoutControls.logo.imageUrl"
        placeholder="https://www.routetomylogo.com/logo.jpg" />
    </FormField>

    <FormField
      label="Position"
      errorMessage={errors.layoutControls?.logo?.position?.message}
    >
      <Select
        fieldName={'layoutControls.logo.position'}
        register={register}
        values={['top left', 'top right', 'bottom left', 'bottom right']}
      />
    </FormField>

    <FormField
      label="Click URL"
      errorMessage={errors.layoutControls?.logo?.clickUrl?.message}
    >
      <TextInput
        register={register}
        fieldName="layoutControls.logo.clickUrl"
        placeholder="https://www.landingpage.com/welcome" />
    </FormField>

    <FormField label="Opacity" errorMessage={errors.layoutControls?.logo?.opacity?.message}>
      <NumberInput
        fieldName={'layoutControls.logo.opacity'}
        register={register}
        min={0}
        max={1}
        step={0.1}
        placeholder="0.8"
      />
    </FormField>

    <FormField
      label="Image on hover URL"
      errorMessage={errors.layoutControls?.logo?.mouseOverImageUrl?.message}
    >
      <TextInput
        register={register}
        fieldName="layoutControls.logo.mouseOverImageUrl"
        placeholder="image/on/hover.jpg" />
    </FormField>

    <FormField
      label="Image marign (CSS)"
      errorMessage={errors.layoutControls?.logo?.imageMargin?.message}
    >
      <TextInput
        register={register}
        fieldName="layoutControls.logo.imageMargin"
        placeholder="30px 80% 0 30px" />
    </FormField>

    <FormField
      label="Hide with controls"
      forCheckbox
      errorMessage={errors.layoutControls?.logo?.hideWithControls?.message}
    >
      <CheckboxInput fieldName={'layoutControls.logo.hideWithControls'} register={register} />
    </FormField>

    <FormField
      label="Show over ads"
      forCheckbox
      errorMessage={errors.layoutControls?.logo?.showOverAds?.message}
    >
      <CheckboxInput fieldName={'layoutControls.logo.showOverAds'} register={register} />
    </FormField>

    <p>
      <a
        className="text-blue-700"
        href="https://docs.fluidplayer.com/docs/configuration/layout/#logo"
        target="_blank"
      >
        Open Logo documentation in a new tab&nbsp;↗️
      </a>
    </p>

    <SubmitButton />
  </form>;
}
