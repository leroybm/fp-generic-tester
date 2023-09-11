import {FormMenuItem, formMenuItems} from "../constants/formMenuItem.ts";
import {useState} from "react";

interface FormMenuProps {
  onMenuChange: (menuItem: FormMenuItem) => void;
  preventNavigation: boolean;
  selectedItem: string;
}

export function FormMenu({ onMenuChange, preventNavigation, selectedItem }: FormMenuProps) {
  return <div>
    <ul>
      {formMenuItems.map((menuItem) =>
        <li
          key={menuItem.key}
          onClick={() => onMenuChange(menuItem)}
          className={`cursor-pointer ${selectedItem === menuItem.key && 'font-bold text-lg'} ${preventNavigation ? 'cursor-not-allowed' : 'hover:underline'}`}
        >
          {menuItem.label}
        </li>
      )}
    </ul>
    {preventNavigation && <p className="text-red-500 mt-2">You have unsaved changes.</p>}
  </div>
}
