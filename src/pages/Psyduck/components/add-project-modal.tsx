import React, { FC, useMemo } from 'react';
import { Input, Modal, Form } from 'antd';
import { addProject } from 'apis/project';

interface Props {
  visible: boolean
  hideModal: () => void
}

const AddProjectModal: FC<Props> = ({visible, hideModal}) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      addProject(values).then(res => {
        hideModal()
      }).catch(err => {
  
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    
  }

  return useMemo(() => (
    <Modal
      title="添加项目"
      visible={visible}
      onOk={handleOk}
      onCancel={hideModal}
      forceRender
    >
      <Form form={form}>
        <Form.Item
          label="项目名称"
          name="project_name"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  ), [visible])
};

export default AddProjectModal