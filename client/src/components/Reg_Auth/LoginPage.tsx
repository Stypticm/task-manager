import { useState } from 'react'
import { Button, Form } from 'antd'
import Title from 'antd/es/typography/Title'
import { FieldType } from '../../utils/types'
import { QUERY_VALIDATE_USER } from '../../graphql/queries/validation_user'
import { useApolloClient } from '@apollo/client'
import { MUTATION_CREATE_USER } from '../../graphql/mutation/mutation_create_user'
import AuthForm from './AuthForm'
import RegForm from './RegForm'

const LoginPage = () => {
    const apolloClient = useApolloClient()
    const [variant, setVariant] = useState<'login' | 'register'>('login')
    const [form] = Form.useForm();

    const toggleVariant = () => {
        setVariant(variant === 'login' ? 'register' : 'login')
    }

    const onFinish = async (values: FieldType) => {
        if (Object.keys(values).length < 3) {
            try {
                const { data, error } = await apolloClient.query({
                    query: QUERY_VALIDATE_USER,
                    variables: {
                        field: values.username,
                        password: values.password
                    }
                })

                if (error) {
                    console.error('Error during refetch:', error);
                }
                if (data) {
                    console.log('Data after refetch:', data);
                }
            } catch (error) {
                console.error('Error in onFinish:', error);
            }
        } else {
            try {
                const { data } = await apolloClient.mutate({
                    mutation: MUTATION_CREATE_USER,
                    variables: {
                        username: values.username,
                        email: values.email,
                        password: values.password
                    }
                })

                if (data) {
                    // setFormSubmitted(false)
                    console.log('Data after refetch:', data);
                }
            } catch (error) {
                console.error('Error in onFinish:', error);
            }
        }
        form.resetFields();
    };

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <Form
                form={form}
                name="login"
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onFinish}
                className='flex flex-col bg-slate-600 bg-opacity-70 px-10 py-10 rounded-2xl'
            >
                <header className='flex justify-center'><Title italic>Task Manager</Title></header>
                {
                    variant === 'login' ? <AuthForm /> : <RegForm />
                }
                {
                    variant === 'login' ?
                        <p className='flex justify-center mb-2'>Don't have an account? <button className='ml-2 text-blue-400 hover:text-blue-600 underline' onClick={toggleVariant}>Sign Up</button></p>
                        :
                        <p className='flex justify-center mb-2'>Already have an account? <button className='ml-2 text-blue-400 hover:text-blue-600 underline' onClick={toggleVariant}>Sign In</button></p>
                }

                <Form.Item className='flex justify-center'>
                    {
                        variant === 'login' ? <Button type="primary" htmlType="submit" className='bg-slate-400'>
                            Sign In
                        </Button> : <Button type="primary" htmlType="submit" className='bg-slate-400'>  Sign Up</Button>
                    }
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage