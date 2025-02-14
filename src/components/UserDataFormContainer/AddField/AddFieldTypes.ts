import { ChangeEvent, KeyboardEvent } from 'react';

export type AddFieldType = {
  newFieldLabel: string;
  handleAdditionalFieldLabelCreator: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDownAddField: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleAddField: () => void;
};
