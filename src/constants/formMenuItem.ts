import { AdvertismentListForm } from "../components/forms/AdvertismentListForm.tsx";
import { ControlBarForm } from "../components/forms/ControlBarForm.tsx";
import { LayoutForm } from "../components/forms/LayoutForm.tsx";
import { LogoForm } from "../components/forms/LogoForm.tsx";
import { MiniPlayerForm } from "../components/forms/MiniPlayerForm.tsx";
import { TimelinePreviewForm } from "../components/forms/TimelinePreviewForm.tsx";

type FormComponents = typeof LayoutForm | typeof MiniPlayerForm | typeof LogoForm | typeof ControlBarForm |
  typeof TimelinePreviewForm;

export interface FormMenuItem {
  label: string;
  key: string;
  FormComponent: FormComponents;
}

export const formMenuItems: FormMenuItem[] = [
  {
    label: 'Layout',
    key: 'layout',
    FormComponent: LayoutForm,
  },
  {
    label: 'Layout - Logo',
    key: 'logo',
    FormComponent: LogoForm,
  },
  {
    label: 'Layout - Control Bar',
    key: 'controlBar',
    FormComponent: ControlBarForm,
  },
  {
    label: 'Timeline Preview',
    key: 'timelinePreview',
    FormComponent: TimelinePreviewForm,
  },
  {
    label: 'Mini Player',
    key: 'miniPlayer',
    FormComponent: MiniPlayerForm
  },
  {
    label: 'Advertisments',
    key: 'advertisments',
    FormComponent: AdvertismentListForm
  }
];
