import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRegisterNewUserMutation } from '../api/apiSlice';
import { updateUserCredentials } from './userSlice';
import SubmitButton from '../../components/SubmitButton';
import classes from './form-container.module.scss';

export default function SignUp() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [form] = useForm();

  const [registerNewUser] = useRegisterNewUserMutation();

  const onFinish = async (values) => {
    try {
      const { user: newUser } = await registerNewUser(values).unwrap();

      dispatch(updateUserCredentials({ ...newUser }));
      localStorage.setItem('token', newUser.token);
      message.success('Success!');

      navigate('/articles');
    } catch (err) {
      const errorsArray = Object.entries(err.data.errors)
        .map((item) => item.join(' '))
        .map((arr) => arr.charAt(0).toUpperCase() + arr.slice(1));
      errorsArray.forEach((errorContent) => message.warning(errorContent));
    }
  };

  return (
    <div className={classes['form-container']}>
      <h2 className={classes['form-header']}>Create a new account</h2>
      <Form
        name="sign-up"
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
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              max: 20,
              message: 'Your username must be 20 characters or less!',
            },
            { min: 3, message: 'Your username must be at least 3 characters!' },
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
            {
              required: true,
              message: 'Please input your email!',
            },
            { type: 'email', message: 'Your email is not valid!' },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Repeat password"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please repeat your password!',
            },
            { min: 6, message: 'Your password must be at least 6 characters!' },
            {
              max: 40,
              message: 'Your password must be 40 characters or less!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords must match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <SubmitButton form={form}>Create</SubmitButton>
        </Form.Item>
        <p
          style={{
            fontSize: '0.75 rem',
            textAlign: 'center',
            color: 'rgba(116, 114, 114, 0.7)',
          }}
        >
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['form-link']}>
            Sign In.
          </Link>
        </p>
      </Form>
    </div>
  );
}
