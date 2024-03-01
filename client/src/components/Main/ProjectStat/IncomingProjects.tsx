import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { Handshake } from 'lucide-react'
import { useState } from 'react'

const IncomingProjects = () => {
    const [selectIncomingProjects, setSelectIncomingProjects] = useState<string>('month')
    const handleClickIncomingProjects = ({ key }: { key: string }) => {
        setSelectIncomingProjects(key)
        console.log(key)
    }

    return (
        <li className='border-solid border-2 border-slate-300 rounded-md'>
            <section className='flex gap-2 justify-between items-start'>
                <Handshake className='text-yellow-600 m-2' />
                <Menu
                    selectedKeys={[selectIncomingProjects]}
                    onClick={handleClickIncomingProjects}
                    className='h-full w-full flex justify-end items-center gap-2'
                >
                    <SubMenu key="submenu" title={selectIncomingProjects === 'year' ? 'This Year' : selectIncomingProjects === 'week' ? 'This Week' : 'This Month'}>
                        <Menu.Item key="year">This Year</Menu.Item>
                        <Menu.Item key="week">This Week</Menu.Item>
                        <Menu.Item key="month">This Month</Menu.Item>
                    </SubMenu>
                </Menu>
            </section>
            <section className='m-2'>
                <h2 className='text-2xl font-bold'>10</h2>
                Incoming projects
            </section>
        </li>
    )
}

export default IncomingProjects