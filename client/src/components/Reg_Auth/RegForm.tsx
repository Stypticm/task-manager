import { Form, Input } from 'antd'
import { FieldType } from '../../utils/types'

const RegForm = () => {
    return (
        <>
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input autoComplete='off' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input autoComplete='off' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                dependencies={['confirm']}
            >
                <Input.Password autoComplete='off' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirm"
                rules={[{ required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    }
                })
                ]}
            >
                <Input.Password autoComplete='off' />
            </Form.Item>
        </>
    )
}

export default RegForm