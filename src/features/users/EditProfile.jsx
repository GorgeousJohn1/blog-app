import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEditUserMutation } from '../api/apiSlice';
import { updateUserCredentials, selectUser } from './userSlice';
import SubmitButton from './SubmitButton';
import classes from './form-container.module.scss';

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form] = useForm();
  const [editUser] = useEditUserMutation();

  const onFinish = async (values) => {
    try {
      const { user: editedUser } = await editUser(values).unwrap();
      localStorage.setItem('token', editedUser.token);
      dispatch(updateUserCredentials(editedUser));
      message.success('Success!');
      navigate('/articles');
    } catch (err) {
      message.warning('Something went wrong!');
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...user });
  }, [form, user]);

  return (
    <div className={classes['form-container']}>
      <h2 className={classes['form-header']}>Edit Profile</h2>
      <Form
        name="edit-profile"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="on"
        layout="vertical"
      >
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Username cannot be empty!' },
            {
              max: 20,
              message: 'Your username must be 20 characters or less!',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Email cannot be empty' },
            { type: 'email', message: 'Your email is not valid!' },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item style={{ marginBottom: '0.75rem' }} label="Bio" name="bio">
          <Input placeholder="Information about yourself" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Profile Image"
          name="image"
          rules={[{ type: 'url' }]}
        >
          <Input placeholder="URL of image" />
        </Form.Item>

        <Form.Item>
          <SubmitButton form={form}>Save</SubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
}
