import React, { useMemo } from 'react'
// import { Button } from 'material-ui'

import { OfficeProjectPageViewProps } from './interfaces'
import { OfficeProjectPageViewStyled } from './styles'

// import Tasks from './Tasks'
import ProjectCalendar from './Calendar'
import ProjectTasks from './Tasks'
import { CalendarProps } from 'src/pages/Office/View/Calendar/interfaces'

const OfficeProjectPageView: React.FC<OfficeProjectPageViewProps> = ({
  project,
  view,
}) => {
  // const [createTaskOpened, setCreateTaskOpened] = useState(false);

  // const opendCreateTaskForm = useCallback(() => {

  //   setCreateTaskOpened(true);
  // }, []);

  const tasks = useMemo(() => {
    const tasks: CalendarProps['tasks'] = []

    project.ProjectTasks?.forEach((n) => {
      n.Task && tasks.push(n.Task)
    }) || []

    return tasks
  }, [project.ProjectTasks])

  const viewContent = useMemo(() => {
    if (view === 'taskslist') {
      return <ProjectTasks project={project} />
    } else if (view.type === 'calendar') {
      return (
        <ProjectCalendar tasks={tasks} project={project} range={view.range} />
      )
    } else {
      return null
    }
  }, [project, tasks, view])

  return useMemo(() => {
    return (
      <>
        <OfficeProjectPageViewStyled>
          {/* <Tasks project={project} /> */}

          {viewContent}
        </OfficeProjectPageViewStyled>
      </>
    )
  }, [viewContent])
}

export default OfficeProjectPageView
