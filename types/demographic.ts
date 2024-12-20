export type Question =
  | TextQuestion
  | NumberQuestion
  | SelectQuestion
  | TextareaQuestion
  | RadioQuestion
  | ToggleQuestion
  | CheckboxQuestion
  | MultipartQuestion;

interface BaseQuestion {
  id: string;
  type: string;
  question: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

interface TextQuestion extends BaseQuestion {
  type: "text";
}

interface NumberQuestion extends BaseQuestion {
  type: "number";
  min?: number;
}

interface SelectQuestion extends BaseQuestion {
  type: "select";
  options: SelectOption[];
}

interface RadioQuestion extends BaseQuestion {
  type: "radio";
  options: SelectOption[];
}

interface ToggleQuestion extends BaseQuestion {
  type: "toggle";
  options: SelectOption[];
}

interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox";
  options: SelectOption[];
  dependsOn?: string;
  showWhen?: string;
}

interface TextareaQuestion extends BaseQuestion {
  type: "textarea";
  minLength?: number;
}

interface MultipartQuestion extends BaseQuestion {
  type: "multipart";
  parts: (RadioQuestion | CheckboxQuestion | TextQuestion)[];
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface MultipartQuestionResponse {
  hasBudget: "yes" | "no";
  budgetTypes?: string[];
  budgetSize?: string;
}
