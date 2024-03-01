import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { LampFloor } from 'lucide-react'
import { useState } from 'react'

const HoldProjects = () => {
    const [selectHoldProjects, setSelectHoldProjects] = useState<string>('month')
    const handleClickHoldProjects = ({ key }: { key: string }) => {
        setSelectHoldProjects(key)
        console.log(key)
    }

    return (
        <li className='border-solid border-2 border-slate-300 rounded-md'>
            <section className='flex gap-2 justify-between items-start'>
                <LampFloor className='text-yellow-600 m-2' />
                <Menu
                    selectedKeys={[selectHoldProjects]}
                    onClick={handleClickHoldProjects}
                    className='h-full w-full flex justify-end items-center gap-2'
                >
                    <SubMenu key="submenu" title={selectHoldProjects === 'year' ? 'This Year' : selectHoldProjects === 'week' ? 'This Week' : 'This Month'}>
                        <Menu.Item key="year">This Year</Menu.Item>
                        <Menu.Item key="week">This Week</Menu.Item>
                        <Menu.Item key="month">This Month</Menu.Item>
                    </SubMenu>
                </Menu>
            </section>
            <section className='m-2'>
                <h2 className='text-2xl font-bold'>10</h2>
                Hold projects
            </section>
        </li>
    )
}

export default HoldProjects