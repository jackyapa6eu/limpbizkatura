'use client';

import { useModal } from '@/hooks/useModal';
import { updateData } from '@/lib/firebase/pushData';
import { CustomButton } from '@/ui';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import React, { FC, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { notification } from 'antd';
import classNames from 'classnames';
import styles from './create-question-form.module.scss';

export type QuestionData = {
  content: string;
  published: boolean;
  created_at: number;
  id: string;
};

const CreateQuestionForm: FC = observer(() => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState('');

  const { closeModal } = useModal();

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: () => {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              const url = window.prompt('Введите ссылку на изображение');
              if (url && range) {
                quill.insertEmbed(range.index, 'image', url);
              }
            }
          },
        },
      },
    };
  }, []);

  const handleSubmit = async () => {
    const questionData: QuestionData = {
      content: value,
      published: false,
      created_at: Date.now(),
      id: uuidv4(),
    };

    try {
      const path = `/posts/${questionData.id}`;
      await updateData(path, questionData);
      notification.success({ message: 'Пост успешно создан', duration: 3 });
      setValue('');
      closeModal();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  if (window === undefined) return null;
  return (
    <div className={styles.createQuestionForm}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      <div className={classNames('form__buttons-container')}>
        <CustomButton type="primary" htmlType="button" onClick={handleSubmit}>
          Создать
        </CustomButton>
      </div>
    </div>
  );
});

export default CreateQuestionForm;
