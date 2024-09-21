/* eslint-disable react/prop-types */
import { Button, Form } from 'antd';
import { useState, useEffect } from 'react';

export default function SubmitButton({ form, children }) {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button
      style={{ width: '100%' }}
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      {children}
    </Button>
  );
}
