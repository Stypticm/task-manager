import { Input } from 'antd'
import { Search } from 'lucide-react'


const SearchBar = () => {
  return (
    <div className='text-slate-900 w-full'>
      <Input prefix={<Search size={16} className='text-slate-900'/>} placeholder="Search..."/>
    </div>
  )
}

export default SearchBar