import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Col, Row, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteProject, getProjectList } from 'apis/project';
import { CardAdd, CardItem } from 'components/CustomCard';
import AddProjectModal from './components/add-project-modal';

const Psyduck: FC = () => {
  const [projectList, setProjectList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const fetchData = () => {
    getProjectList().then(res => {
      setProjectList(res?.project_list || [])
    }).catch(err => {

    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleDelete = (id: string) => {
    deleteProject({project_id: id}).then(res => {
      fetchData()
    }).catch(err => {

    })
  }

  return useMemo(() => (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <CardAdd onAdd={() => {setModalVisible(true)}} title="添加项目" />
        </Col>
        {projectList.map(
          (item: any) => (
            <Col span={6} key={item.project_id}>
              <CardItem
                title={item.project_name}
                footer={
                  <Fragment>
                    <div></div>
                    <Popconfirm
                      title="确定删除？"
                      placement="bottom"
                      onConfirm={() => handleDelete(item.project_id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <DeleteOutlined className="warn-link" />
                    </Popconfirm>
                  </Fragment>
                }
              >
              </CardItem>
            </Col>
          )
        )}
      </Row>
      <AddProjectModal visible={modalVisible} hideModal={() => {setModalVisible(false); fetchData()}} />
    </div>
  ), [projectList, modalVisible])
};

export default Psyduck