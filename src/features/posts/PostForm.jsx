import { useEffect } from 'react';
import { Form, Input, Button, Flex, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import {
  useGetSinglePostQuery,
  useCreatePostMutation,
  useEditPostMutation,
} from '../api/apiSlice';
import { selectUser } from '../users/userSlice';
import SubmitButton from '../../components/SubmitButton';
import classes from './PostForm.module.scss';

export default function PostForm() {
  const [form] = useForm();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { username } = useSelector(selectUser);

  const isEdit = !!slug;

  const { data: post } = useGetSinglePostQuery(slug);
  const author = post?.article?.author?.username;

  useEffect(() => {
    if (isEdit) {
      if (author !== username) navigate('/articles', { replace: true });
      form.setFieldsValue({ ...post?.article });
    }
  }, [form, isEdit, post?.article, author, username, navigate]);

  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();

  const onCreateArticle = async (values) => {
    try {
      const result = await createPost(values);
      message.success(
        `Your new post '${result.data.article.title}' was successfully created!`
      );
      navigate('/articles');
    } catch {
      message.warning('Something went wrong');
    }
  };
  const onEditArticle = async (values) => {
    try {
      const args = { slug, editedPost: { ...values } };
      const result = await editPost(args);
      message.success(
        `Your post '${result.data.article.title}' edited successfully!`
      );
      navigate('/articles');
    } catch {
      message.warning('Something went wrong');
    }
  };
  return (
    <div className={classes['form-container']}>
      <h2 className={classes['form-header']}>
        {isEdit ? 'Edit article' : 'Create article'}
      </h2>
      <Form
        name="Article"
        form={form}
        size="large"
        initialValues={{}}
        onFinish={isEdit ? onEditArticle : onCreateArticle}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Title is required!',
            },
            { whitespace: true, message: 'Whitespaces are not allowed' },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Short description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Description is required!',
            },
            { whitespace: true, message: 'Whitespaces are not allowed' },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="Short Description" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0.75rem' }}
          label="Text"
          name="body"
          rules={[
            {
              required: true,
              message: 'Please fill this field!',
            },
            { whitespace: true, message: 'Whitespaces are not allowed' },
          ]}
          validateTrigger="onBlur"
        >
          <TextArea rows={10} placeholder="Text" />
        </Form.Item>
        <Form.List name="tagList">
          {(fields, { add, remove }) => (
            <Flex gap="middle">
              <Flex gap="small" vertical>
                {fields.map(({ key, name }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={name}
                      rules={[
                        {
                          required: true,
                          message: 'Tag cannot be empty. Fill it or delete it!',
                        },
                        () => ({
                          validator(_, value) {
                            if (!/\s/g.test(value)) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('No whitespaces allowed')
                            );
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="Tag" />
                    </Form.Item>
                    <Button
                      color="red"
                      danger
                      title="Remove"
                      onClick={() => remove(name)}
                    >
                      Delete
                    </Button>
                  </Space>
                ))}
              </Flex>
              <Form.Item style={{ alignSelf: 'flex-end' }}>
                <Button ghost type="primary" onClick={() => add()}>
                  Add Tag
                </Button>
              </Form.Item>
            </Flex>
          )}
        </Form.List>

        <Form.Item>
          <SubmitButton form={form}>{isEdit ? 'Save' : 'Create'}</SubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
}
