'use client';

import { useCallback, useState } from 'react';
import { FormInstance } from 'antd';

export const useFormValidation = (form: FormInstance) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleValuesChange = useCallback(() => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    const isTouched = form.isFieldsTouched(true);
    setIsFormValid(!hasErrors && isTouched);
  }, [form]);

  return { isFormValid, handleValuesChange };
};
