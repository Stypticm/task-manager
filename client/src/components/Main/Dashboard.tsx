import Greetings from './Greetings'
import ProjectHighUrgency from './ProjectHighUrgency'
import ProjectStatistics from './ProjectStat/ProjectStatistics'
import TeamMember from './TeamMember'

const Dashboard = () => {
  return (
    <div className='text-bold text-slate-900 bg-slate-500'>
      <Greetings />
      <ProjectStatistics />
      <div className='m-10 sm:flex'>
        <ProjectHighUrgency />
        <TeamMember />
      </div>
    </div>
  )
}

export default Dashboard