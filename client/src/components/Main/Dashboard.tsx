import Greetings from './Greetings'
import ProjectHighUrgency from './ProjectHighUrgency'
import ProjectStatistics from './ProjectStat/ProjectStatistics'
import TeamMember from './TeamMember'

const Dashboard = () => {
  return (
    <div className='text-bold text-slate-900'>
      <Greetings />
      <ProjectStatistics />
      <ProjectHighUrgency />
      <TeamMember />
    </div>
  )
}

export default Dashboard