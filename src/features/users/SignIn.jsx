import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useLogInUserMutation } from '../api/apiSlice';
import { updateUserCredentials } from './userSlice';
import SubmitButton from '../../components/SubmitButton';
import classes from './form-container.module.scss';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [logInUser] = useLogInUserMutation();
  const from = location.state?.from?.pathname || '/articles';

  const onFinish = async (values) => {
    try {
      const { user: newUser } = await logInUser(values).unwrap();
      localStorage.setItem('token', newUser.token);
      dispatch(updateUserCredentials(newUser));
      message.success('Success!');
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 422) message.warning('Email or password is invalid!');
    }
  };

  return (
    <div className={classes['form-container']}>
      <h2 className={classes['form-header']}>Create a new account</h2>
      <Form
        name="sign-in"
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

        <Form.Item style={{ marginBottom: '0.5rem' }}>
          <SubmitButton form={form}>Login</SubmitButton>
        </Form.Item>
        <p
          style={{
            fontSize: '0.75 rem',
            textAlign: 'center',
            color: 'rgba(116, 114, 114, 0.7)',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={classes['form-link']}>
            Sign Up.
          </Link>
        </p>
      </Form>
    </div>
  );
}
