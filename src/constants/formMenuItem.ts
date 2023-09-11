import {LayoutForm} from "../components/forms/LayoutForm.tsx";
import {MiniPlayerForm} from "../components/forms/MiniPlayerForm.tsx";
import {LogoForm} from "../components/forms/LogoForm.tsx";

type FormComponents = typeof LayoutForm | typeof MiniPlayerForm | typeof LogoForm;

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
    label: 'Logo',
    key: 'logo',
    FormComponent: LogoForm,
  },
  {
    label: 'Mini Player',
    key: 'miniPlayer',
    FormComponent: MiniPlayerForm
  }
];
