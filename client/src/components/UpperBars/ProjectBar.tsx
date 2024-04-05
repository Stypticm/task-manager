import { Button, Input, Modal, Radio, message } from 'antd'
import { BellDot, HelpCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Project } from '../../utils/types';
import { useApolloClient } from '@apollo/client';
import { MUTATION_CREATE_PROJECT } from '../../graphql/mutation/mutation_create_project';
import Cookies from 'js-cookie'
import { AES, enc } from 'crypto-js';


const ProjectBar = () => {
  const apolloClient = useApolloClient()
  const encryptedData = Cookies.get('userData')
  const secretKeyCookie = import.meta.env.VITE_SECRET_KEY_COOKIE

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<string>('medium');
  const [currentUserData, setCurrentUserData] = useState<{ userId: string }>({ userId: '' })
  const [showText, setShowText] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setShowText(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (encryptedData && secretKeyCookie) {
      const decryptedBytes = AES.decrypt(encryptedData, secretKeyCookie);
      const userData = JSON.parse(decryptedBytes.toString(enc.Utf8))
      setCurrentUserData(userData)
    }
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const newProject: Project = {
      title: projectName,
      description: projectDescription,
      status: projectStatus,
      assignedTo: currentUserData.userId
    };


    try {
      const { data } = await apolloClient.mutate({
        mutation: MUTATION_CREATE_PROJECT,
        variables: {
          title: newProject.title,
          description: newProject.description,
          assignedTo: newProject.assignedTo,
          status: newProject.status
        }
      })

      if (data) {
        setIsModalOpen(false);
        setProjectName('');
        setProjectDescription('');
        setProjectStatus('medium');
        message.success('Project created successfully');
      }
    } catch (error) {
      message.error('Failed to create project');
    }

    setIsModalOpen(false);
    setProjectName('');
    setProjectDescription('');
    setProjectStatus('medium');
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setProjectName('');
    setProjectDescription('');
    setProjectStatus('medium');
  }

  return (
    <div className='m-5 w-1/5 gap-4 flex justify-center items-center bg-slate-500 max-[380px]:w-full'>
      <Button ghost><HelpCircle size={16} className='text-slate-900' /></Button>
      <Button ghost><BellDot size={16} className='text-slate-900' /></Button>
      <Button className='text-slate-900 flex justify-center items-center gap-2' onClick={showModal}>
        <Plus size={16}>New Project</Plus>
        {showText && <span>New Project</span>}
      </Button>
      <Modal
        title="Create New Project"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          className: 'bg-blue-900 text-slate-100',
          style: {
            borderRadius: '9999px',
            height: '40px',
            width: '120px',
          }
        }}
      >
        <div>
          <label>Project Name:</label>
          <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </div>
        <div>
          <label>Project Description:</label>
          <Input.TextArea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </div>
        <div>
          <label>Project Status:</label>
          <Radio.Group value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
            <Radio value="high">High</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="low">Low</Radio>
            <Radio value="hold">Hold</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectBar