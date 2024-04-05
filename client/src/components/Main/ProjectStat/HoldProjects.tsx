import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { LampFloor } from 'lucide-react'
import { useEffect, useState } from 'react'


const HoldProjects = () => {
    const [selectHoldProjects, setSelectHoldProjects] = useState<string>('month')
    const [mobileSize, setMobileSize] = useState(window.innerWidth > 640);

    const handleClickHoldProjects = ({ key }: { key: string }) => {
        setSelectHoldProjects(key)
    }

    useEffect(() => {
        const handleResize = () => {
            setMobileSize(window.innerWidth > 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { key: 'year', label: 'This Year' },
        { key: 'month', label: 'This Month' },
        { key: 'week', label: 'This Week' }
    ]

    return (
        <li className='group shadow-md rounded-lg bg-teal-700 hover:bg-teal-800 cursor-pointer hover:shadow-2xl max-[380px]:flex min-[381px]:w-48'>
            <div className='flex rounded-lg justify-between items-center bg-teal-700 group-hover:bg-teal-800'>
                <LampFloor className='text-yellow-600 m-2' />
                <Menu
                    selectedKeys={[selectHoldProjects]}
                    onClick={handleClickHoldProjects}
                    className='flex justify-end items-center rounded-lg bg-teal-700 group-hover:bg-teal-800'
                >
                    <SubMenu style={{ width: '120px' }} key="submenu" title={selectHoldProjects === 'year' ? 'This Year' : selectHoldProjects === 'week' ? 'This Week' : 'This Month'}>
                        {menuItems.map(item => (
                            <Menu.Item className='' key={item.key}>{item.label}</Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </div>
            <div className='m-2'>
                <h2 className='text-2xl font-bold max-[380px]:text-center'>10</h2>
                {mobileSize && <span>Hold projects</span>}
            </div>
        </li>
    )
}

export default HoldProjects