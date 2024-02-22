import { Form, Input } from 'antd'
import { FieldType } from '../../utils/types'

const AuthForm = () => {
    return (
        <>
            <Form.Item<FieldType>
                label="Username or Email"
                name="username"
                rules={[{ required: true, message: 'Please input your username or email!' }]}
            >
                <Input autoComplete='off' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password autoComplete='off' />
            </Form.Item>

            {/* <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    className='flex justify-end'
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item> */}
        </>
    )
}

export default AuthForm