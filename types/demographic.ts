export type Question =
  | TextQuestion
  | NumberQuestion
  | SelectQuestion
  | TextareaQuestion
  | BooleanQuestion;

interface BaseQuestion {
  id: string;
  type: string;
  question: string;
  placeholder?: string;
  helperText?: string;
}

interface TextQuestion extends BaseQuestion {
  type: "text";
}

interface NumberQuestion extends BaseQuestion {
  type: "number";
}

interface SelectQuestion extends BaseQuestion {
  type: "select";
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  label: string;
  description: string;
}

interface TextareaQuestion extends BaseQuestion {
  type: "textarea";
}

interface BooleanQuestion extends BaseQuestion {
  type: "boolean";
  additionalInfo?: {
    question: string;
    placeholder: string;
  };
}
