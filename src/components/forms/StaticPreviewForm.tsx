import {Control, FieldArrayWithId, UseFieldArrayUpdate, useForm, useWatch} from "react-hook-form";
import {ExtendedFluidPlayerOptions} from "../../models/ConfiguratorOptions.ts";
import {FormField} from "../fields/FormField.tsx";
import {TextInput} from "../fields/TextInput.tsx";
import {NumberInput} from "../fields/NumberInput.tsx";

// interface StaticPreview {
//   startTime: number;
//   endTime: number;
//   image: string;
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }

interface StaticPreviewFormProps {
  update: UseFieldArrayUpdate<ExtendedFluidPlayerOptions, "layoutControls.timelinePreview.frames">;
  index: number;
  value: FieldArrayWithId<ExtendedFluidPlayerOptions, "layoutControls.timelinePreview.frames", "id">;
  control: Control<ExtendedFluidPlayerOptions>;
  isOpen: boolean;
  onClick: () => void;
}

export function StaticPreviewForm({ update, index, value, control, isOpen, onClick }: StaticPreviewFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: value
  });
  const data = useWatch({
    control,
    name: `layoutControls.timelinePreview.frames.${index}`
  });

  if (!isOpen) {
    return (
      <button className={`border-2 rounded border-slate-400 mb-4 p-2 bg-top relative w-full text-left`} type="button" onClick={onClick}>
        <p className="font-medium mb-1">Static Preview #{index+1} ({data?.startTime}s - {data?.endTime}s)</p>
      </button>
    );
  }

  return (
    <div className={`border-2 rounded border-slate-400 mb-4 p-2 bg-top relative`}>
      <p className="font-medium mb-1">Static Preview #{index+1}</p>

      {data?.image && <div className={`w-full aspect-video bg-cover bg-center mb-2`} style={{ backgroundImage: `url(${data.image})` }} />}

      <FormField
        label="Start Time"
        errorMessage={errors?.startTime?.message}
      >
        <NumberInput register={register} fieldName="startTime" placeholder="10" required />
      </FormField>

      <FormField
        label="End Time"
        errorMessage={errors?.endTime?.message}
      >
        <NumberInput register={register} fieldName="endTime" placeholder="10" required />
      </FormField>

      <FormField
        label="Image"
        errorMessage={errors?.image?.message}
      >
        <TextInput register={register} fieldName="image" placeholder="10" required />
      </FormField>

      <button
        type="button"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Save
      </button>
    </div>
  );
}
