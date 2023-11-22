import {FieldArrayWithId, FieldError, FieldErrorsImpl, Merge, useFieldArray, useForm} from "react-hook-form";
import {FormField} from "../fields/FormField.tsx";
import {cloneDeep, omit, uniqueId} from "lodash";
import {useEffect, useRef, useState} from "react";
import {SubmitButton} from "../SubmitButton.tsx";
import {Select} from "../fields/Select.tsx";
import {ConfiguratorOptions, ExtendedFluidPlayerOptions} from "../../models/ConfiguratorOptions.ts";
import {TextInput} from "../fields/TextInput.tsx";
import {CheckboxInput} from "../fields/CheckboxInput.tsx";
import {StaticPreviewForm} from "./StaticPreviewForm.tsx";

type VTTPreviewOptionsFieldError = Merge<FieldError, FieldErrorsImpl<NonNullable<VTTPreviewOptions>>>;

const staticTimelineItemDefaults = {
  _id: uniqueId(),
  startTime: 0,
  endTime: 5,
  image: 'https://placekitten.com/200/84',
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
  const { fields: staticPreviews, append: appendStaticPreview, update: updateStaticPreview, remove: removeStaticPreview } = useFieldArray({
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

  function validateTimings(staticPreviews: FieldArrayWithId<ExtendedFluidPlayerOptions, "layoutControls.timelinePreview.frames", "id">[]): boolean {
    return staticPreviews.every((staticPreview, index) => {
      return index === 0 ? true : staticPreview.startTime >= staticPreviews[index - 1].endTime;
    })
  }

  function addNewStaticPreview() {
    if (staticPreviews.length === 0) {
      return appendStaticPreview(cloneDeep(staticTimelineItemDefaults));
    }

    appendStaticPreview(cloneDeep({
      ...staticPreviews[staticPreviews.length - 1],
      _id: uniqueId(),
      startTime: Number(staticPreviews[staticPreviews.length - 1].endTime),
      endTime: Number(staticPreviews[staticPreviews.length - 1].endTime) + 5,
    }));
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
      <ul className="mb-4">
        {staticPreviews.map((staticPreview, index) =>
          <StaticPreviewForm
            key={staticPreview._id}
            control={control}
            update={(...args) => {
              updateStaticPreview(...args);
            }}
            index={index}
            value={staticPreview}
            isOpen={openPreviewIndex === index}
            onClickOpen={() => setOpenPreviewIndex(index)}
            onClickRemove={() => removeStaticPreview(index)}
          />
        )}

        <button type="button" className="block bg-blue-400 text-white rounded-full p-4 py-1 text-sm" onClick={addNewStaticPreview}>
          Add new static preview
        </button>
      </ul>
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

    {validateTimings(staticPreviews) ? 'Timings are valid' : 'Timings are not valid'}

    <br />

    <SubmitButton />
  </form>;
}
