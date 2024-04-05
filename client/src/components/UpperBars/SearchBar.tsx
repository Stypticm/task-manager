import { Input } from 'antd'
import { Search } from 'lucide-react'


const SearchBar = () => {
  return (
    <div className='m-5 w-3/4 max-[380px]:w-full'>
      <Input prefix={<Search size={16} className='text-slate-900'/>} placeholder="Search..."/>
    </div>
  )
}

export default SearchBar