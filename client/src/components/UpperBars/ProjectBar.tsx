import { Button } from 'antd'
import { BellDot, HelpCircle, Plus } from 'lucide-react'

const ProjectBar = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Button ghost><HelpCircle size={16} className='text-slate-900'/></Button>
      <Button ghost><BellDot size={16} className='text-slate-900'/></Button>
      <Button className='text-slate-900 flex justify-center items-center gap-2'>
        <Plus size={16}>New Project</Plus>
        New Project
      </Button>
    </div>
  )
}

export default ProjectBar