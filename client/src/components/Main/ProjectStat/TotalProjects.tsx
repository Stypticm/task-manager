import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { Folder } from 'lucide-react'
import { useEffect, useState } from 'react'

const TotalProjects = () => {
    const [selectTotalProjects, setSelectTotalProjects] = useState<string>('month')
    const [mobileSize, setMobileSize] = useState(window.innerWidth > 640);


    const handleClickTotalProjects = ({ key }: { key: string }) => {
        setSelectTotalProjects(key)
        console.log(key)
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
        { key: 'week', label: 'This Week' },
        { key: 'month', label: 'This Month' },
    ]


    return (
        <li className='group shadow-md rounded-lg bg-teal-700 hover:bg-teal-800 cursor-pointer hover:shadow-2xl max-[380px]:flex min-[381px]:w-48'>
            <div className='flex rounded-lg justify-between items-center bg-teal-700 group-hover:bg-teal-800'>
                <Folder className='text-yellow-600 m-2' />
                <Menu
                    selectedKeys={[selectTotalProjects]}
                    onClick={handleClickTotalProjects}
                    className='flex justify-end items-center rounded-lg bg-teal-700 group-hover:bg-teal-800'
                >
                    <SubMenu style={{
                        width: '120px'
                    }} key="submenu" title={selectTotalProjects === 'year' ? 'This Year' : selectTotalProjects === 'week' ? 'This Week' : 'This Month'}>
                        {menuItems.map(item => (
                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </div>
            <div className='m-2'>
                <h2 className='text-2xl font-bold max-[380px]:text-center'>10</h2>
                {mobileSize && <span>Total projects</span>}
            </div>
        </li>
    )
}

export default TotalProjects