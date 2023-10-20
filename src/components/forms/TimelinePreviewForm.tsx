import {FieldError, FieldErrorsImpl, Merge, useFieldArray, useForm} from "react-hook-form";
import {FormField} from "../fields/FormField.tsx";
import {cloneDeep, omit} from "lodash";
import {useEffect, useState} from "react";
import {SubmitButton} from "../SubmitButton.tsx";
import {Select} from "../fields/Select.tsx";
import {ConfiguratorOptions, ExtendedFluidPlayerOptions} from "../../models/ConfiguratorOptions.ts";
import {TextInput} from "../fields/TextInput.tsx";
import {CheckboxInput} from "../fields/CheckboxInput.tsx";
import {StaticPreviewForm} from "./StaticPreviewForm.tsx";

type VTTPreviewOptionsFieldError = Merge<FieldError, FieldErrorsImpl<NonNullable<VTTPreviewOptions>>>;

const staticTimelineItemDefaults = {
  id: '1',
  startTime: 0,
  endTime: 0.5,
  image: '',
  x: 0,
  y: 0,
  w: 200,
  h: 84
};

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/#logo
 */
export function TimelinePreviewForm({ configuration, onSave, onDirty }: {
  configuration: ConfiguratorOptions,
  onSave: (newOptions: Partial<ExtendedFluidPlayerOptions>) => void,
  onDirty: () => void,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: { ...cloneDeep(configuration.options) }
  });
  const { fields: staticPreviews, append: appendStaticPreview, update: updateStaticPreview } = useFieldArray({
    name: 'layoutControls.timelinePreview.frames',
    control
  })
  const [timelinePreviewType, setTimelinePreviewType] = useState(configuration.options.layoutControls?.timelinePreview?.type);
  const [openPreviewIndex, setOpenPreviewIndex] = useState<null | number>(null);

  useEffect(() => {
    const subscription = watch((formValue, { type, name }) => {
      const nextType = formValue.layoutControls?.timelinePreview?.type;
      if (nextType && type === 'change' && name === 'layoutControls.timelinePreview.type') {
        setTimelinePreviewType(nextType);
      }

      onDirty();
    });
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  function addNewStaticPreview() {
    const newStaticPreview = staticPreviews.length > 0 ?
      omit(staticPreviews[staticPreviews.length - 1], 'id') :
      staticTimelineItemDefaults

    appendStaticPreview(cloneDeep(newStaticPreview))
  }

  return <form onSubmit={handleSubmit(onSave)}>
    <FormField
      label="Type"
    >
      <Select
        fieldName={'layoutControls.timelinePreview.type'}
        register={register}
        values={['VTT', 'static']}
      />
    </FormField>

    {timelinePreviewType === 'VTT' &&
      <>
        <FormField
          label="Enable sprite relative path"
          forCheckbox
          errorMessage={
            (errors.layoutControls?.timelinePreview as VTTPreviewOptionsFieldError)?.spriteRelativePath?.message
          }
        >
          <CheckboxInput fieldName={'layoutControls.timelinePreview.spriteRelativePath'} register={register} />
        </FormField>

        <FormField
          label="File"
          errorMessage={(errors.layoutControls?.timelinePreview as VTTPreviewOptionsFieldError)?.file?.message}
        >
          <TextInput register={register} fieldName="layoutControls.timelinePreview.file" placeholder="thumbnails.vtt" />
        </FormField>

        <FormField
          label="Sprite"
          errorMessage={(errors.layoutControls?.timelinePreview as VTTPreviewOptionsFieldError)?.sprite?.message}
        >
          <TextInput register={register} fieldName="layoutControls.timelinePreview.sprite" placeholder="thumbnails.jpg" />
        </FormField>
      </>
    }

    {timelinePreviewType === 'static' &&
      <div className="mb-4">
        {staticPreviews.map((staticPreview, index) =>
          <StaticPreviewForm
            key={staticPreview.id}
            control={control}
            update={(...args) => {
              setOpenPreviewIndex(null);
              updateStaticPreview(...args);
            }}
            index={index}
            value={staticPreview}
            isOpen={openPreviewIndex === index}
            onClick={() => setOpenPreviewIndex(index)}
          />
        )}

        <button type="button" className="block bg-blue-400 text-white rounded-full p-4 py-1 text-sm" onClick={addNewStaticPreview}>
          Add new static preview
        </button>
      </div>
    }

    <p>
      <a
        className="text-blue-700"
        href="https://docs.fluidplayer.com/docs/configuration/preview/"
        target="_blank"
      >
        Open Timeline Preview documentation in a new tab&nbsp;↗️
      </a>
    </p>

    <SubmitButton />
  </form>;
}
