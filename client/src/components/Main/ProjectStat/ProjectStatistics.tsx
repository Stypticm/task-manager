import HoldProjects from './HoldProjects'
import RunningProjects from './RunningProjects'
import TotalProjects from './TotalProjects'
import IncomingProjects from './IncomingProjects'

const ProjectStatistics = () => {
  return (
    <>
      <ul className='flex flex-row flex-wrap m-2 justify-around'>
        <TotalProjects />
        <RunningProjects />
        <HoldProjects />
        <IncomingProjects />
      </ul>
    </>
  )
}

export default ProjectStatistics